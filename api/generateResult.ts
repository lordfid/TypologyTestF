import type { VercelRequest, VercelResponse } from '@vercel/node';

function safePayload(value: unknown) {
  return JSON.stringify(value, (_key, current) => {
    if (typeof current === 'string' && current.length > 3000) return current.slice(0, 3000);
    if (Array.isArray(current) && current.length > 30) return current.slice(0, 30);
    return current;
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, message: 'Metode tidak tersedia.' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(503).json({ ok: false, message: 'Kunci API belum tersedia.' });
    return;
  }

  const finalResult = req.body?.result;
  if (!finalResult || typeof finalResult !== 'object') {
    res.status(400).json({ ok: false, message: 'Data hasil tidak lengkap.' });
    return;
  }

  const compactResult = {
    topMbti: finalResult.topMbti,
    functionRanking: finalResult.functionRanking,
    stackRoles: finalResult.stackRoles,
    shadowRoles: finalResult.shadowRoles,
    enneagram: finalResult.enneagram,
    wing: finalResult.wing,
    instinctStacking: finalResult.instinctStacking,
    tritype: finalResult.tritype,
    bigFive: finalResult.bigFive,
    hexaco: finalResult.hexaco,
    socionics: finalResult.socionics,
    quadra: finalResult.quadra,
    temperament: finalResult.temperament,
    attitudinalPsyche: finalResult.attitudinalPsyche,
    disc: finalResult.disc,
    riasec: finalResult.riasec,
    moralStyle: finalResult.moralStyle,
    decisionStyle: finalResult.decisionStyle,
    conflictStyle: finalResult.conflictStyle,
    communicationStyle: finalResult.communicationStyle,
    relationshipTendency: finalResult.relationshipTendency,
    stressResponse: finalResult.stressResponse,
    coreFear: finalResult.coreFear,
    coreDesire: finalResult.coreDesire,
    valuesRanking: finalResult.valuesRanking,
    workStyle: finalResult.workStyle,
    learningStyle: finalResult.learningStyle,
    defensePattern: finalResult.defensePattern,
    evidence: finalResult.evidence,
    confidence: finalResult.confidence,
    confidenceLabel: finalResult.confidenceLabel,
    notes: finalResult.notes,
    closeResults: finalResult.closeResults
  };

  const prompt = `Tulis narasi hasil tes dalam bahasa Indonesia yang natural, tajam, manusiawi, tidak klinis, tidak menyebut diagnosis, tidak menyebut AI, tidak menyebut nama penyedia model, tidak membuat klaim mutlak. Gunakan data skor berikut sebagai satu-satunya sumber. Jangan mengubah tipe utama. Jangan mengarang data yang tidak ada. Jelaskan hasil sebagai kemungkinan/kecenderungan. Buat struktur dengan judul pendek, paragraf nyaman dibaca, dan catatan confidence. Data: ${safePayload(compactResult)}`;

  try {
    const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.65,
          topP: 0.9,
          maxOutputTokens: 2200
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      res.status(502).json({ ok: false, message: 'Narasi belum bisa dibuat.', detail: errorText.slice(0, 600) });
      return;
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text ?? '').join('\n').trim();
    if (!text) {
      res.status(502).json({ ok: false, message: 'Narasi belum tersedia.' });
      return;
    }

    res.status(200).json({ ok: true, narrative: text });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Versi bacaan panjang belum bisa dibuat.', detail: error instanceof Error ? error.message : 'unknown' });
  }
}

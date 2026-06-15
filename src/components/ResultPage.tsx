import { useMemo, useState } from 'react';
import type { FinalResult, RankedScore } from '../types';
import { RESULT_READING_ADVICE } from '../data/resultDescriptions';
import { requestLongNarrative } from '../services/resultNarration';
import { LoadingState } from './LoadingState';
import { ResultSection } from './ResultSection';

function ScoreList({ items, limit = 8 }: { items: RankedScore[]; limit?: number }) {
  if (!items.length) return <p className="muted">Data pada bagian ini belum cukup tajam.</p>;
  return (
    <div className="scoreList">
      {items.slice(0, limit).map((item) => (
        <div className="scoreRow" key={item.key}>
          <span>{item.label ?? item.key}</span>
          <strong>{Math.round(item.score)}</strong>
        </div>
      ))}
    </div>
  );
}

function toPlainText(result: FinalResult, longNarrative: string | null) {
  return [
    'Tes Kepribadian Mendalam',
    `Confidence: ${result.confidence} (${result.confidenceLabel})`,
    `Top MBTI: ${result.topMbti.map((x) => `${x.type} ${x.score}`).join(', ')}`,
    `Fungsi: ${result.functionRanking.map((x) => `${x.key} ${x.score}`).join(', ')}`,
    `Enneagram: ${result.enneagram.slice(0, 3).map((x) => `${x.key} ${x.score}`).join(', ')} | Wing: ${result.wing} | Instinct: ${result.instinctStacking} | Tritype: ${result.tritype}`,
    `AP: ${result.attitudinalPsyche} | DISC: ${result.disc.map((x) => `${x.key} ${x.score}`).join(', ')} | RIASEC: ${result.riasec.map((x) => `${x.key} ${x.score}`).join(', ')}`,
    '',
    result.localNarrative,
    longNarrative ? `\nBacaan panjang:\n${longNarrative}` : ''
  ].join('\n');
}

export function ResultPage({ result, onRestart }: { result: FinalResult; onRestart: () => void }) {
  const [longNarrative, setLongNarrative] = useState<string | null>(null);
  const [loadingNarrative, setLoadingNarrative] = useState(false);
  const [narrativeError, setNarrativeError] = useState<string | null>(null);
  const plainText = useMemo(() => toPlainText(result, longNarrative), [result, longNarrative]);

  async function copyResult() {
    await navigator.clipboard.writeText(plainText);
  }

  async function generateNarrative() {
    setLoadingNarrative(true);
    setNarrativeError(null);
    try {
      const text = await requestLongNarrative(result);
      setLongNarrative(text);
    } catch (error) {
      setNarrativeError(error instanceof Error ? error.message : 'Versi bacaan panjang belum bisa dibuat. Hasil utama tetap tersedia.');
    } finally {
      setLoadingNarrative(false);
    }
  }

  return (
    <main className="resultPage">
      <section className="resultHero">
        <p className="eyebrow">Tes Kepribadian Mendalam</p>
        <h1>Hasil bacaanmu</h1>
        <p>{result.localNarrative}</p>
        <div className="resultActions">
          <button className="primaryButton" type="button" onClick={copyResult}>Salin hasil</button>
          <button className="secondaryButton" type="button" onClick={generateNarrative} disabled={loadingNarrative}>Buat bacaan panjang</button>
          <button className="ghostButton" type="button" onClick={onRestart}>Ulangi tes</button>
        </div>
        {loadingNarrative && <LoadingState text="Menyusun bacaan panjang..." />}
        {narrativeError && <div className="softError">{narrativeError}</div>}
        {longNarrative && <div className="longNarrative"><h3>Bacaan panjang</h3><p>{longNarrative}</p></div>}
      </section>

      <div className="resultGrid">
        <ResultSection title="Ringkasan utama">
          <div className="summaryCards">
            <div><span>Confidence</span><strong>{result.confidence}</strong><small>{result.confidenceLabel}</small></div>
            <div><span>MBTI teratas</span><strong>{result.topMbti[0]?.type}</strong><small>{result.topMbti[0]?.score}</small></div>
            <div><span>Enneagram</span><strong>{result.enneagram[0]?.key}</strong><small>{result.wing}</small></div>
            <div><span>Instinct</span><strong>{result.instinctStacking}</strong><small>{result.tritype}</small></div>
          </div>
        </ResultSection>

        <ResultSection title="Top 3 MBTI">
          <div className="mbtiCards">
            {result.topMbti.map((item) => (
              <div className="mbtiCard" key={item.type}>
                <strong>{item.type}</strong>
                <span>{item.stack.join(' · ')}</span>
                <p>Skor {item.score} · confidence lokal {Math.round(item.confidence)}</p>
                <small>{item.note}</small>
              </div>
            ))}
          </div>
        </ResultSection>

        <ResultSection title="Ranking fungsi kognitif"><ScoreList items={result.functionRanking} /></ResultSection>
        <ResultSection title="Stack dan shadow role">
          <div className="roleGrid">
            {Object.entries(result.stackRoles).map(([role, value]) => <div key={role}><span>{role}</span><strong>{value}</strong></div>)}
          </div>
        </ResultSection>
        <ResultSection title="Sumbu MBTI"><ScoreList items={result.mbtiAxis} limit={8} /></ResultSection>
        <ResultSection title="Enneagram, wing, instinct, tritype"><ScoreList items={result.enneagram} limit={9} /><p className="inlineNote">Wing: {result.wing} · Instinct: {result.instinctStacking} · Tritype: {result.tritype}</p></ResultSection>
        <ResultSection title="Big Five"><ScoreList items={result.bigFive} limit={5} /></ResultSection>
        <ResultSection title="HEXACO"><ScoreList items={result.hexaco} limit={6} /></ResultSection>
        <ResultSection title="Socionics dan temperament"><p>{result.socionics} · Quadra: {result.quadra}</p><p>Temperament: {result.temperament} · Classical: {result.classicalTemperament}</p></ResultSection>
        <ResultSection title="Attitudinal Psyche"><p className="bigType">{result.attitudinalPsyche}</p></ResultSection>
        <ResultSection title="DISC"><ScoreList items={result.disc} limit={4} /></ResultSection>
        <ResultSection title="RIASEC"><ScoreList items={result.riasec} limit={6} /></ResultSection>
        <ResultSection title="Moral style"><ScoreList items={result.moralStyle} limit={6} /></ResultSection>
        <ResultSection title="Decision-making style"><ScoreList items={result.decisionStyle} limit={6} /></ResultSection>
        <ResultSection title="Conflict style"><ScoreList items={result.conflictStyle} limit={6} /></ResultSection>
        <ResultSection title="Communication style"><ScoreList items={result.communicationStyle} limit={6} /></ResultSection>
        <ResultSection title="Relationship tendency"><ScoreList items={result.relationshipTendency} limit={8} /></ResultSection>
        <ResultSection title="Stress response"><ScoreList items={result.stressResponse} limit={8} /></ResultSection>
        <ResultSection title="Core fear / core desire"><h4>Core fear</h4><ScoreList items={result.coreFear} limit={6} /><h4>Core desire</h4><ScoreList items={result.coreDesire} limit={6} /></ResultSection>
        <ResultSection title="Values ranking"><ScoreList items={result.valuesRanking} limit={8} /></ResultSection>
        <ResultSection title="Work style"><ScoreList items={result.workStyle} limit={8} /></ResultSection>
        <ResultSection title="Learning style"><ScoreList items={result.learningStyle} limit={8} /></ResultSection>
        <ResultSection title="Shadow / defense pattern"><ScoreList items={result.defensePattern} limit={8} /></ResultSection>
        <ResultSection title="Evidence dasar"><ScoreList items={result.evidence} limit={12} /></ResultSection>
        <ResultSection title="Catatan hasil dekat dan confidence">
          {result.notes.length === 0 && <p className="muted">Tidak ada catatan besar. Hasil tetap dibaca sebagai interpretasi tipologi.</p>}
          {result.notes.map((note) => <p key={note}>{note}</p>)}
          {result.closeResults.map((note) => <p key={note}>{note}</p>)}
        </ResultSection>
        <ResultSection title="Saran membaca hasil">
          <ul>{RESULT_READING_ADVICE.map((item) => <li key={item}>{item}</li>)}</ul>
        </ResultSection>
      </div>
    </main>
  );
}

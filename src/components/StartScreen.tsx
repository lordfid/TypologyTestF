type StartScreenProps = {
  hasSavedProgress: boolean;
  totalQuestions: number;
  onStart: () => void;
  onResume: () => void;
  onReset: () => void;
};

export function StartScreen({ hasSavedProgress, totalQuestions, onStart, onResume, onReset }: StartScreenProps) {
  return (
    <main className="startScreen">
      <section className="heroCard">
        <p className="eyebrow">Tes Kepribadian Mendalam</p>
        <h1>Tes Kepribadian Mendalam</h1>
        <p className="heroLead">
          Kau tidak akan memilih definisi. Kau akan memilih adegan, benda, tempat, kalimat, lagu, dan reaksi kecil.
          Dari sana, aplikasi membaca kecenderungan tipologi secara deterministik.
        </p>
        <div className="noticeBox">
          Hasil ini bukan diagnosis klinis. Bacalah sebagai kemungkinan, kecenderungan, dan interpretasi tipologi.
        </div>
        <div className="heroStats">
          <span>{totalQuestions}+ item utama</span>
          <span>Progress tersimpan otomatis</span>
          <span>Bisa berjalan tanpa koneksi API</span>
        </div>
        <div className="actionRow">
          <button className="primaryButton" type="button" onClick={onStart}>Mulai tes</button>
          {hasSavedProgress && <button className="secondaryButton" type="button" onClick={onResume}>Lanjutkan progress</button>}
          {hasSavedProgress && <button className="ghostButton" type="button" onClick={onReset}>Hapus progress</button>}
        </div>
      </section>
    </main>
  );
}

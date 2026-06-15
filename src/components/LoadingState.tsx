export function LoadingState({ text = 'Membaca hasil...' }: { text?: string }) {
  return (
    <div className="loadingBox">
      <div className="spinner" />
      <p>{text}</p>
    </div>
  );
}

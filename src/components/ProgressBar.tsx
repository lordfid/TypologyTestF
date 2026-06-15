type ProgressBarProps = {
  current: number;
  total: number;
};

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 0;
  return (
    <div className="progressWrap" aria-label="progress">
      <div className="progressText">
        <span>{current} / {total}</span>
        <span>{percentage}%</span>
      </div>
      <div className="progressTrack">
        <div className="progressFill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

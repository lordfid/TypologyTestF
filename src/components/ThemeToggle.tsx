type ThemeToggleProps = {
  theme: 'light' | 'dark';
  onToggle: () => void;
};

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button className="ghostButton" type="button" onClick={onToggle} aria-label="ganti mode tampilan">
      {theme === 'dark' ? 'Mode terang' : 'Mode gelap'}
    </button>
  );
}

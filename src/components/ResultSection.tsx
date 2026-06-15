import type { ReactNode } from 'react';

export function ResultSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="resultSection">
      <h3>{title}</h3>
      {children}
    </section>
  );
}

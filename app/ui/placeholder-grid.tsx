type PlaceholderGridProps = {
  labels: string[];
};

export function PlaceholderGrid({ labels }: PlaceholderGridProps) {
  return (
    <div className="placeholder-grid">
      {labels.map((label) => (
        <article className="placeholder-card" key={label}>
          <h2>{label}</h2>
          <div className="placeholder-line" />
          <div className="placeholder-line" />
        </article>
      ))}
    </div>
  );
}

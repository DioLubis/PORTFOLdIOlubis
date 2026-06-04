import { PlaceholderGrid } from "../ui/placeholder-grid";

export default function SkillsPage() {
  return (
    <section className="page-section">
      <div className="page-hero">
        <p className="eyebrow">Skills</p>
        <h1>Skills Page</h1>
        <p className="lead">Skeleton section for technologies and capabilities.</p>
      </div>
      <PlaceholderGrid labels={["Frontend", "Backend", "Tools"]} />
    </section>
  );
}

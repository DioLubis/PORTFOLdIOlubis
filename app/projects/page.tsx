import { PlaceholderGrid } from "../ui/placeholder-grid";

export default function ProjectsPage() {
  return (
    <section className="page-section">
      <div className="page-hero">
        <p className="eyebrow">Projects</p>
        <h1>Projects Page</h1>
        <p className="lead">Skeleton section for future project cards.</p>
      </div>
      <PlaceholderGrid labels={["Project One", "Project Two", "Project Three"]} />
    </section>
  );
}

import { PlaceholderGrid } from "../ui/placeholder-grid";

export default function AboutPage() {
  return (
    <section className="page-section">
      <div className="page-hero">
        <p className="eyebrow">About</p>
        <h1>About Page</h1>
        <p className="lead">Skeleton section for profile summary and background.</p>
      </div>
      <PlaceholderGrid labels={["Profile", "Experience", "Education"]} />
    </section>
  );
}

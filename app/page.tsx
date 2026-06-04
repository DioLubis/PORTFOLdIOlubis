import { PlaceholderGrid } from "./ui/placeholder-grid";

export default function HomePage() {
  return (
    <section className="page-section">
      <div className="page-hero">
        <p className="eyebrow">Full-Stack Developer</p>
        <h1>Dio Febriansyah Lubis</h1>
        <p className="lead">Skeleton home page for the personal portfolio.</p>
      </div>
      <PlaceholderGrid labels={["Intro", "Featured Project", "Contact CTA"]} />
    </section>
  );
}

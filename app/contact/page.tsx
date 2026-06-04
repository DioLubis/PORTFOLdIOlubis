import { PlaceholderGrid } from "../ui/placeholder-grid";

export default function ContactPage() {
  return (
    <section className="page-section">
      <div className="page-hero">
        <p className="eyebrow">Contact</p>
        <h1>Contact Page</h1>
        <p className="lead">Skeleton section for contact information and form.</p>
      </div>
      <PlaceholderGrid labels={["Email", "Social Links", "Contact Form"]} />
    </section>
  );
}

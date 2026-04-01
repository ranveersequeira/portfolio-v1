import { ArrowUpRight } from "lucide-react";
import CascadeText from "@/components/CascadeText";
import PretextLines from "@/components/PretextLines";
import { contactLinks } from "@/content/portfolio";

export default function Contact() {
  return (
    <div className="page-stack">
      <section className="contact-hero">
        <div className="section-kicker">Contact</div>
        <CascadeText
          as="h1"
          className="page-title max-w-4xl"
          text="Open to the right kind of work."
          repel="soft"
        />
        <PretextLines
          as="p"
          bodyClassName="section-copy"
          className="max-w-3xl"
          text="I am especially interested in frontend platform work, design-engineering systems, internal copilots, and DX problems where a better interface meaningfully changes how a team ships."
        />
      </section>

      <section className="contact-list">
        {contactLinks.map((item) => (
          <a className="contact-row" href={item.href} key={item.label} rel="noreferrer" target="_blank">
            <p className="contact-row__label">{item.label}</p>
            <CascadeText as="h2" className="contact-row__value" text={item.value} />
            <ArrowUpRight className="contact-row__icon" size={18} />
          </a>
        ))}
      </section>
    </div>
  );
}

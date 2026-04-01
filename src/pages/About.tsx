import CascadeText from "@/components/CascadeText";
import PretextLines from "@/components/PretextLines";
import {
  experienceTimeline,
  operatingPrinciples,
  stackGroups,
} from "@/content/portfolio";

export default function About() {
  return (
    <div className="page-stack">
      <section className="section-stack">
        <div className="section-header section-header--split">
          <div>
            <div className="section-kicker">About</div>
            <CascadeText
              as="h1"
              className="page-title max-w-4xl"
              text="How I work."
              repel="soft"
            />
          </div>
          <PretextLines
            as="p"
            bodyClassName="section-copy"
            className="max-w-xl"
            text="Based in Gurugram, India. Most of my work sits at the intersection of React architecture, AI-assisted workflows, and internal tools that make teams faster without making them sloppy."
          />
        </div>
      </section>

      <section className="section-stack">
        <div className="section-header">
          <div className="section-kicker">Operating model</div>
          <CascadeText as="h2" className="section-title max-w-4xl" text="Principles." repel="soft" />
        </div>

        <div className="principle-list">
          {operatingPrinciples.map((principle, index) => (
            <article className="principle-row" key={principle.title}>
              <span className="principle-row__index">{String(index + 1).padStart(2, "0")}</span>
              <div className="principle-row__body">
                <CascadeText as="h3" className="principle-row__title" text={principle.title} repel="soft" />
                <PretextLines
                  as="p"
                  bodyClassName="principle-row__copy"
                  className="principle-row__copy"
                  text={principle.body}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-stack">
        <div className="section-header section-header--split">
          <div>
            <div className="section-kicker">Stack map</div>
            <CascadeText as="h2" className="section-title max-w-3xl" text="Stack." repel="soft" />
          </div>
          <PretextLines
            as="p"
            bodyClassName="section-copy"
            className="max-w-xl"
            text="I am strongest in the JavaScript ecosystem, but the point is not stack collecting. The point is building systems with a sane feedback loop and enough leverage to keep shipping."
          />
        </div>

        <div className="stack-list">
          {stackGroups.map((group) => (
            <article className="stack-row" key={group.title}>
              <p className="stack-row__title">{group.title}</p>
              <div className="tag-row">
                {group.items.map((item) => (
                  <span className="tag-pill" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-stack">
        <div className="section-header">
          <div className="section-kicker">Timeline</div>
          <CascadeText as="h2" className="section-title max-w-3xl" text="Timeline." repel="soft" />
        </div>

        <div className="timeline-list">
          {experienceTimeline.map((item) => (
            <article className="timeline-row" key={`${item.company}-${item.role}`}>
              <div className="timeline-row__dot" />
              <div className="timeline-row__body">
                <CascadeText as="h3" className="timeline-row__title" text={item.role} repel="soft" />
                <p className="timeline-row__company">{item.company}</p>
              </div>
              <p className="timeline-row__date">{item.date}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

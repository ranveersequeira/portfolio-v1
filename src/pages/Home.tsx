import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import CascadeText from "@/components/CascadeText";
import LiveLayoutLab from "@/components/LiveLayoutLab";
import PretextLines from "@/components/PretextLines";
import {
  experienceTimeline,
  featuredWork,
  heroCopy,
  signalCards,
  toolPatterns,
} from "@/content/portfolio";

export default function Home() {
  return (
    <div className="page-stack">
      <section className="hero-shell">
        <div className="hero-shell__main">
          <div className="hero-frame">
            <div className="hero-frame__meta">
              <span>AI-native UI, internal tooling, frontend systems</span>
              <span>Gurugram, India</span>
            </div>

            <div className="section-kicker section-kicker--hero">{heroCopy.eyebrow}</div>

            <div className="hero-editorial">
              <div className="hero-editorial__lead">
                <div className="hero-title-stack">
                  {heroCopy.headlineLines.map((line) => (
                    <CascadeText
                      key={line.text}
                      as="h1"
                      className={`hero-headline-line ${line.accent ? "hero-headline-line--accent" : ""}`}
                      text={line.text}
                      wordClassName="hero-word"
                      repel="strong"
                    />
                  ))}
                </div>

                <div className="hero-frame__body">
                  <div className="hero-copy-block">
                    <p className="hero-copy max-w-2xl">{heroCopy.intro}</p>
                    <p className="hero-copy hero-copy--muted max-w-2xl">{heroCopy.supporting}</p>
                  </div>

                  <div className="hero-actions">
                    <Link className="primary-action" to="/projects">
                      Explore selected work
                      <ArrowRight size={17} />
                    </Link>
                    <Link className="secondary-action" to="/about">
                      How I work
                    </Link>
                  </div>
                </div>
              </div>

              <aside className="hero-side-note">
                <span className="hero-side-note__label">{heroCopy.sideNoteTitle}</span>
                <p className="hero-side-note__copy">{heroCopy.sideNote}</p>
              </aside>
            </div>

            <div className="hero-tag-cloud" aria-label="Focus areas">
              {heroCopy.tags.map((tag) => (
                <span className="hero-tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <aside className="hero-proof">
          <div className="hero-proof__intro">
            <span className="section-kicker">Profile</span>
            <p className="hero-proof__lede">
              Frontend engineer focused on AI product interfaces, internal developer tooling, and
              calmer release workflows.
            </p>
          </div>

          <div className="hero-proof__list">
            {signalCards.map((card, index) => (
              <article className="hero-proof__item" key={card.title}>
                <span className="signal-card__index">0{index + 1}</span>
                <CascadeText as="h2" className="signal-card__title signal-card__title--compact" text={card.title} />
                <p className="signal-card__body signal-card__copy">{card.body}</p>
              </article>
            ))}
          </div>
        </aside>
      </section>

      <section className="section-stack">
        <div className="section-header section-header--split">
          <div>
            <div className="section-kicker">Selected work</div>
            <CascadeText as="h2" className="section-title" text="Selected work." repel="soft" />
          </div>
          <PretextLines
            as="p"
            bodyClassName="section-copy"
            className="max-w-xl"
            text="A mix of open-source tooling and product-facing frontend work focused on clarity, onboarding speed, and stronger developer flow."
          />
        </div>

        <div className="home-work-list">
          {featuredWork.map((project, index) => (
            <article
              className={`home-work-row ${index === 0 ? "home-work-row--lead" : ""}`}
              key={project.title}
            >
              <div className="home-work-row__meta">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{project.kind}</span>
              </div>

              <div className="home-work-row__content">
                <div className="home-work-row__copy">
                  <CascadeText as="h3" className="home-work-row__title" text={project.title} repel="soft" />

                  <PretextLines as="p" bodyClassName="body-copy" className="home-work-row__summary" text={project.summary} />
                  <PretextLines
                    as="p"
                    bodyClassName="body-copy body-copy--muted"
                    className="home-work-row__impact"
                    text={project.impact}
                  />
                </div>

                <div className="home-work-row__aside">
                  <a className="home-work-row__link" href={project.href} rel="noreferrer" target="_blank">
                    {project.hrefLabel}
                    <ArrowUpRight size={15} />
                  </a>

                  <div className="tag-row">
                    {project.tags.map((tag) => (
                      <span className="tag-pill" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-stack">
        <div className="section-header section-header--split">
          <div>
            <div className="section-kicker">Repeatable patterns</div>
            <CascadeText
              as="h2"
              className="section-title max-w-3xl"
              text="What I optimize for."
              repel="soft"
            />
          </div>
          <PretextLines
            as="p"
            bodyClassName="section-copy"
            className="max-w-xl"
            text="Understanding a system, setting a project up well, and keeping AI assistance disciplined are usually more valuable than another shiny layer of abstraction."
          />
        </div>

        <div className="pattern-list">
          {toolPatterns.map((pattern, index) => (
            <article className="pattern-row" key={pattern.title}>
              <span className="pattern-row__index">{String(index + 1).padStart(2, "0")}</span>
              <div className="pattern-row__body">
                <CascadeText as="h3" className="pattern-row__title" text={pattern.title} repel="soft" />
                <PretextLines as="p" bodyClassName="pattern-row__copy" className="pattern-row__copy" text={pattern.body} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <LiveLayoutLab />

      <section className="section-stack">
        <div className="section-header section-header--split">
          <div>
            <div className="section-kicker">Experience</div>
            <CascadeText as="h2" className="section-title max-w-3xl" text="Experience." repel="soft" />
          </div>
          <Link className="secondary-action" to="/contact">
            Work together
          </Link>
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

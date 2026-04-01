import { ArrowUpRight } from "lucide-react";
import CascadeText from "@/components/CascadeText";
import PretextLines from "@/components/PretextLines";
import { featuredWork, projectArchive } from "@/content/portfolio";

export default function Projects() {
  return (
    <div className="page-stack">
      <section className="section-stack">
        <div className="section-header section-header--split">
          <div>
            <div className="section-kicker">Projects</div>
            <CascadeText
              as="h1"
              className="page-title max-w-5xl"
              text="Projects and tools."
              repel="soft"
            />
          </div>
          <PretextLines
            as="p"
            bodyClassName="section-copy"
            className="max-w-xl"
            text="I care most about work that shortens the path from understanding to action. That usually produces analyzers, workflows, scaffolds, and product UI built for teams under real delivery pressure."
          />
        </div>
      </section>

      <section className="section-stack">
        <div className="editorial-list">
          {featuredWork.map((project, index) => (
            <article className="editorial-item" key={project.title}>
              <span className="editorial-item__index">{String(index + 1).padStart(2, "0")}</span>
              <div className="editorial-item__content">
                <p className="editorial-item__kind">{project.kind}</p>
                <CascadeText as="h2" className="editorial-item__title" text={project.title} repel="soft" />
                <PretextLines
                  as="p"
                  bodyClassName="body-copy"
                  className="editorial-item__summary"
                  text={project.summary}
                />
                <PretextLines
                  as="p"
                  bodyClassName="body-copy body-copy--muted"
                  className="editorial-item__summary"
                  text={project.impact}
                />
                <div className="tag-row">
                  {project.tags.map((tag) => (
                    <span className="tag-pill" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <a className="editorial-item__link" href={project.href} rel="noreferrer" target="_blank">
                {project.hrefLabel}
                <ArrowUpRight size={16} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section-stack">
        <div className="section-header section-header--split">
          <div>
            <div className="section-kicker">Archive</div>
            <CascadeText as="h2" className="section-title max-w-3xl" text="Archive." repel="soft" />
          </div>
          <PretextLines
            as="p"
            bodyClassName="section-copy"
            className="max-w-xl"
            text="These projects cover product instincts, interface flows, and implementation range. They matter because toolmaking only works if you understand the surfaces the tools are trying to serve."
          />
        </div>

        <div className="archive-list">
          {projectArchive.map((project) => (
            <a className="archive-row" href={project.href} key={project.title} rel="noreferrer" target="_blank">
              <CascadeText as="h3" className="archive-row__title" text={project.title} repel="soft" />
              <PretextLines as="p" bodyClassName="archive-row__copy" className="archive-row__copy" text={project.summary} />
              <ArrowUpRight className="archive-row__icon" size={16} />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

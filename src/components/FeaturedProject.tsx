import { Link } from "react-router-dom";
import { BookOpen, ExternalLink, Github, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { homeFeaturedProject } from "@/data/projects";

const FeaturedProject = () => {
    if (!homeFeaturedProject) {
        return null;
    }

    return (
        <section className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                    <span className="text-muted-foreground">~/</span>featured_project
                </h2>
                <Button asChild variant="ghost" size="sm" className="w-fit text-primary hover:bg-primary/10">
                    <Link to="/projects" className="flex items-center gap-2">
                        view_all
                        <ExternalLink className="h-4 w-4" />
                    </Link>
                </Button>
            </div>

            <article className="rounded-lg border border-primary/50 bg-card p-5 transition-colors hover:border-primary">
                <div className="space-y-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs font-mono text-accent">
                                <Star className="h-4 w-4 fill-accent" />
                                ixigo/open-source
                            </div>
                            <h3 className="text-2xl font-bold text-primary">{homeFeaturedProject.title}</h3>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {homeFeaturedProject.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="font-mono text-xs">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <p className="text-sm sm:text-base leading-relaxed text-foreground/80">
                        {homeFeaturedProject.description}
                    </p>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        {(homeFeaturedProject.links ?? []).map((link, index) => (
                            <Button
                                key={link.href}
                                asChild
                                variant={index === 0 ? "default" : "outline"}
                                size="sm"
                                className={
                                    index === 0
                                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                        : "border-primary/50 text-primary hover:bg-primary/10"
                                }
                            >
                                <a href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                    {link.label === "GitHub" ? (
                                        <Github className="h-4 w-4" />
                                    ) : (
                                        <BookOpen className="h-4 w-4" />
                                    )}
                                    {link.label}
                                </a>
                            </Button>
                        ))}
                    </div>
                </div>
            </article>
        </section>
    );
};

export default FeaturedProject;

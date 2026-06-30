import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, ExternalLink, Github, Star } from "lucide-react";
import { projects } from "@/data/projects";

const Projects = () => {
    return (
        <section className="space-y-6">
            <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                <span className="text-muted-foreground">~/</span>projects
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
                {projects.map((project) => (
                    <Card 
                        key={project.title} 
                        className={`bg-card border-border flex flex-col transition-colors ${
                            project.featured 
                                ? "border-primary/50 md:col-span-2 hover:border-primary" 
                                : "hover:border-primary/50"
                        }`}
                    >
                        <CardHeader>
                            <div className="flex items-start justify-between gap-2">
                                <CardTitle className="text-xl font-bold text-primary flex items-center gap-2">
                                    {project.featured && <Star className="h-4 w-4 text-accent fill-accent" />}
                                    {project.title}
                                </CardTitle>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {project.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-xs font-mono">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col gap-4">
                            <CardDescription className="text-foreground/80">
                                {project.description}
                            </CardDescription>
                            <div className="mt-auto flex flex-col gap-2 pt-4 sm:flex-row">
                                {(project.links ?? [{ label: "View Project", href: project.link }]).map((link) => (
                                    <Button
                                        key={link.href}
                                        asChild
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 border-primary/50 hover:bg-primary/10 text-primary"
                                    >
                                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                            {link.label === "GitHub" ? (
                                                <Github className="h-4 w-4" />
                                            ) : link.label === "Docs" ? (
                                                <BookOpen className="h-4 w-4" />
                                            ) : (
                                                <ExternalLink className="h-4 w-4" />
                                            )}
                                            {link.label}
                                        </a>
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default Projects;

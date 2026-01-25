import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star } from "lucide-react";

const Projects = () => {
    const projects = [
        {
            title: "ai-agent-workflow",
            description: "An NPM tool that standardizes AI tool usage into a structured team of specialist agent personas and enforces a disciplined development workflow using engineered process prompts and rules.",
            link: "https://www.npmjs.com/package/ai-agent-workflow",
            tags: ["npm", "ai", "workflow", "agents", "dx"],
            featured: true,
        },
        {
            title: "react-analyzer",
            description: "An NPM tool to help onboard and understand the tech stack of any React ecosystem project by analyzing dependencies, tooling, and configurations.",
            link: "https://www.npmjs.com/package/@ranveersequeira/react-analyzer",
            tags: ["npm", "tooling", "react", "dx"],
        },
        {
            title: "vite-sane-cli",
            description: "A CLI tool to scaffold Vite projects with sane defaults, offering options like Tailwind CSS, Ant Design, MUI, and Redux Toolkit integration.",
            link: "https://www.npmjs.com/package/vite-sane-cli",
            tags: ["cli", "vite", "scaffold"],
        },
        {
            title: "MIRA",
            description: "Full-stack project management application built with Next.js, Prisma, PostgreSQL, and TypeScript.",
            link: "https://mira-my-jira.vercel.app/signin",
            tags: ["next.js", "prisma", "postgresql"],
        },
        {
            title: "CatWiki",
            description: "Transformed Open Source APIs to list data of cats all around the world. Offers all the required info about cats.",
            link: "https://github.com/ranveersequeira/catwiki",
            tags: ["api", "react", "cats"],
        },
        {
            title: "XFlix",
            description: "A video sharing platform which hosts videos for the world to watch also allows uploading new videos by using external video links.",
            link: "https://ranv-xflix.netlify.app/",
            tags: ["react", "video", "platform"],
        },
        {
            title: "QKart",
            description: "QKart is an E-commerce application offering a variety of products for customers to choose from.",
            link: "https://ranv-qkart.netlify.app/",
            tags: ["react", "e-commerce"],
        },
    ];

    return (
        <section className="space-y-6">
            <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                <span className="text-muted-foreground">~/</span>projects
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
                {projects.map((project, index) => (
                    <Card 
                        key={index} 
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
                            <div className="mt-auto pt-4">
                                <Button asChild variant="outline" size="sm" className="w-full border-primary/50 hover:bg-primary/10 text-primary">
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                        <ExternalLink className="h-4 w-4" />
                                        View Project
                                    </a>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default Projects;

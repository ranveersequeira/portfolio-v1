import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Projects = () => {
    const projects = [
        {
            title: "react-analyzer",
            description: "An NPM tool to help onboard and understand the tech stack of any React ecosystem project by analyzing dependencies, tooling, and configurations.",
            link: "https://www.npmjs.com/package/@ranveersequeira/react-analyzer",
            tags: ["npm", "tooling", "react"],
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
                    <Card key={index} className="bg-card border-border flex flex-col hover:border-primary/50 transition-colors">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold text-primary">
                                {project.title}
                            </CardTitle>
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
                                    <a href={project.link} target="_blank" rel="noopener noreferrer">
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

import { Badge } from "@/components/ui/badge";

const About = () => {
    const stack = {
        frontend: ["React", "Next.js", "React Native", "TypeScript"],
        backend: ["Node.js", "Express", "PostgreSQL", "Prisma", "Redis"],
        devops: ["Docker", "AWS", "Vercel", "GitHub Actions", "Nginx"],
        ai: ["LangChain", "OpenAI API", "Prompt Engineering", "Agent Workflows"],
    };

    const tools = [
        "Neovim", "tmux", "Wezterm", "Aerospace", "Cursor", "zsh", "Raycast"
    ];

    return (
        <section className="space-y-8">
            <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                <span className="text-muted-foreground">~/</span>about
            </h2>

            <div className="space-y-6 text-base sm:text-lg leading-relaxed text-foreground/80">
                <p>
                    I'm Ranveer Sequeira—a <strong className="text-primary">problem solver who writes code</strong>, not a framework developer who solves problems. Based in Gurugram, India, I'm obsessed with <strong className="text-accent">developer experience</strong> and building tools that make engineers more effective.
                </p>
                <p>
                    My focus is <strong className="text-primary">AI-augmented development</strong>. I design and build systems where AI agents work alongside developers—structured workflows with specialist personas, engineered prompts, and disciplined processes. The goal isn't to replace developers; it's to amplify their capabilities and eliminate friction.
                </p>
                <p>
                    I'm the author of <strong className="text-accent">ai-agent-workflow</strong>, an npm tool that structures AI tool usage into teams of specialist agent personas with engineered process prompts. It enforces a disciplined development workflow that actually ships quality code—not just generates text.
                </p>
                <p>
                    Currently at <strong className="text-primary">Ixigo</strong> as a Software Engineer II, solving complex frontend challenges at scale. Previously at <strong>Devkraft Technologies</strong>, I maintained the <strong>Dekoder.com</strong> ecosystem—an enterprise platform that served millions during India's elections, handling real-time data, complex caching strategies, and micro-frontend architectures.
                </p>
                <p>
                    I'm a <strong className="text-primary">full-stack engineer in the JavaScript ecosystem</strong>—that's my full-time focus. I've built everything from real-time video platforms to e-commerce systems to CLI tools. DevOps? I have exposure—enough to get things done when required, not enough to call myself a specialist. But what I really care about is the meta-problem: <em>how do we build better tools for building?</em>
                </p>
                <p>
                    My development philosophy is <strong className="text-primary">terminal-first</strong>. Neovim with a meticulously crafted LazyVim config. tmux for session management. Ghostty as my terminal. Every keystroke is intentional—the mouse is a last resort. This isn't aesthetic preference; it's about removing friction between thought and implementation.
                </p>
                <p>
                    <strong className="text-accent">High agency</strong> defines my approach. I don't wait for perfect specs or complete information. I ship, observe, iterate, and refine. When I hit a wall, I find a way around it, through it, or I build a tool to demolish it.
                </p>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <span className="text-muted-foreground">&gt;</span> stack
                </h3>
                <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm text-muted-foreground font-mono w-20">frontend:</span>
                        {stack.frontend.map((item) => (
                            <Badge key={item} variant="outline" className="text-primary border-primary/50 font-mono">
                                {item}
                            </Badge>
                        ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm text-muted-foreground font-mono w-20">backend:</span>
                        {stack.backend.map((item) => (
                            <Badge key={item} variant="outline" className="text-primary border-primary/50 font-mono">
                                {item}
                            </Badge>
                        ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm text-muted-foreground font-mono w-20">devops:</span>
                        {stack.devops.map((item) => (
                            <Badge key={item} variant="outline" className="text-primary border-primary/50 font-mono">
                                {item}
                            </Badge>
                        ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm text-muted-foreground font-mono w-20">ai:</span>
                        {stack.ai.map((item) => (
                            <Badge key={item} variant="outline" className="text-accent border-accent/50 font-mono">
                                {item}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <span className="text-muted-foreground">&gt;</span> daily_drivers
                </h3>
                <div className="flex flex-wrap gap-2">
                    {tools.map((tool) => (
                        <Badge key={tool} variant="secondary" className="font-mono">
                            {tool}
                        </Badge>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;

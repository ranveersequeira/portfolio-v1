import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="py-12 sm:py-20 space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-primary">
                    Ranveer Sequeira
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground font-mono">
                    <span className="text-accent">$</span> Problem Solver · AI Tooling · Developer Experience
                </p>
            </div>

            <div className="max-w-2xl text-base sm:text-lg leading-relaxed text-foreground/80 space-y-4">
                <p>
                    I'm a <strong className="text-primary">terminal-centric engineer</strong> who builds tools that make developers more effective. Not a framework specialist—a <strong className="text-accent">problem solver</strong> who happens to work in the JavaScript ecosystem.
                </p>
                <p>
                    Currently at <strong className="text-primary">Ixigo</strong>, solving complex frontend challenges at scale. My obsession is <strong className="text-accent">AI-augmented development</strong>—designing workflows where AI agents amplify developer capabilities, not replace them.
                </p>
                <p>
                    Author of <strong className="text-primary">ai-agent-workflow</strong>—an npm tool for structured AI tool usage with specialist agent personas. I ship, iterate, and refine. High agency, minimal friction, maximum impact.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link to="/projects">View Projects</Link>
                </Button>
                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    <Link to="/contact">Contact Me</Link>
                </Button>
            </div>
        </section>
    );
};

export default Hero;

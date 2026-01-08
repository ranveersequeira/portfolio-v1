import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="py-20 space-y-8">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-primary">
                    Ranveer Sequeira
                </h1>
                <p className="text-xl text-muted-foreground">
                    Software Developer.
                </p>
            </div>

        <div className="max-w-2xl text-lg leading-relaxed text-foreground/80">
  <p>
    I'm a terminal-first software engineer who believes the mouse is optional. I spend my days building scalable systems and clean web UIs with <strong>React</strong>, <strong>Next.js</strong>, and <strong>TypeScript</strong>, all from a tightly tuned <strong>Neovim (LazyVim)</strong> + <strong>tmux</strong> workflow inside <strong>Ghostty</strong> on macOS.
  </p>
  <p className="mt-4">
    When I’m not shipping features or optimizing performance, I’m designing <strong>AI agent workflows</strong>, refining developer tooling, or refactoring code that was already working—just to make it simpler, faster, and more maintainable.
  </p>
</div>


            <div className="flex gap-4">
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

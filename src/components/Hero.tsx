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
                    I'm a terminal-dwelling software engineer who believes the mouse is optional. I spend my days crafting pixel-perfect web UIs with <strong>React</strong> and <strong>Next.js</strong>, while arguing with the TypeScript compiler and fine-tuning my <strong>Neovim</strong> config.
                </p>
                <p className="mt-4">
                    When I'm not building scalable applications or optimizing performance, I'm probably refactoring code that was working perfectly fine, just to make it "cleaner".
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

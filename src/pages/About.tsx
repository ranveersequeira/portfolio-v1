import { Badge } from "@/components/ui/badge";

const About = () => {
    const skills = [
        "React.js", "React Native", "TypeScript", "Next.js", "Node.js",
        "Tailwind CSS", "PostgreSQL", "Prisma", "Neovim", "Linux", "Git"
    ];

    return (
        <section className="space-y-8">
            <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                <span className="text-muted-foreground">~/</span>about
            </h2>

            <div className="space-y-6 text-lg leading-relaxed text-foreground/80">
                <p>
                    I’m Ranveer Sequeira. I live in Gurugram, Haryana, India.
                </p>
                <p>
                    I'm a software engineer who speaks fluent JavaScript and broken sarcasm. My relationship status? Committed... to GitHub. I spend my days (and nights) crafting innovative solutions using the React ecosystem, all while juggling multiple projects with the finesse of a seasoned Neovim user. Yes, I use Neovim because I like to suffer... efficiently.
                </p>
                <p>
                    Currently, I'm at <strong>Devkraft Technologies</strong>, where I maintain the <strong>Dekoder.com</strong> ecosystem—an enterprise-grade Next.js 14 media platform that served millions during the elections. I also build AI-driven tools like <strong>Gist AI</strong> and <strong>Mira</strong>, optimizing UX flows and caching strategies until they scream performance.
                </p>
                <p>
                    I've also delivered GenAI-powered tools for <strong>Indegene</strong> using micro-frontends (because who doesn't love a good micro-frontend?) and authored <strong>vite-sane-cli</strong>, an NPM tool to save developers from boilerplate hell.
                </p>
                <p>
                    When I'm not immersed in code or debugging a race condition that only exists on Tuesdays, you'll find me fine-tuning my Neovim config with the precision of a maestro—or just looking for the missing semicolon in my life.
                </p>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">Skills & Tools</h3>
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-primary border-primary/50">
                            {skill}
                        </Badge>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;

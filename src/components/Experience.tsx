import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Experience = () => {
    const experiences = [
        {
            company: "Devkraft Technologies",
            role: "Software Developer (Frontend)",
            date: "Sept 2023 — Present",
            link: "https://www.devkraft.co.in/",
            current: true,
        },
        {
            company: "Devkraft Technologies",
            role: "Software Developer Intern",
            date: "Sept 2021 — Sept 2023",
            link: "https://www.devkraft.co.in/",
        },
        {
            company: "Crio.do",
            role: "Teaching Assistant",
            date: "Sept 2021 — Dec 2021",
            link: "https://www.crio.do/",
        },
    ];

    return (
        <section className="space-y-6">
            <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                <span className="text-muted-foreground">~/</span>experience
            </h2>
            <div className="grid gap-4">
                {experiences.map((exp, index) => (
                    <Card key={index} className="bg-card/50 border-border hover:border-primary/50 transition-colors">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-lg font-bold text-foreground">
                                        {exp.role}
                                    </CardTitle>
                                    <a
                                        href={exp.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-primary hover:underline"
                                    >
                                        @{exp.company}
                                    </a>
                                </div>
                                <Badge variant={exp.current ? "default" : "secondary"} className="font-mono text-xs">
                                    {exp.date}
                                </Badge>
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default Experience;

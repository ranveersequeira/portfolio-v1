import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { ChevronDown, ChevronUp, Mail, Github, Linkedin, Twitter, FileText, ExternalLink } from "lucide-react";

const Contact = () => {
    const [showResume, setShowResume] = useState(true);

    return (
        <section className="space-y-8">
            <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                <span className="text-muted-foreground">~/</span>contact
            </h2>

            <div className="space-y-8">
                <div className="space-y-6">
                    <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                        I'm always open to discussing new projects, interesting problems to solve, or opportunities to build great developer tools.
                    </p>

                    <Card className="bg-card/50 border-border">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary" />
                                <span className="text-muted-foreground font-mono text-sm">email:</span>
                                <a 
                                    href="mailto:ranveersequeira@gmail.com" 
                                    className="text-foreground hover:text-primary transition-colors"
                                >
                                    ranveersequeira@gmail.com
                                </a>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <span className="text-muted-foreground font-mono text-sm pt-0.5">socials:</span>
                                <div className="flex flex-wrap gap-3">
                                    <a 
                                        href="https://github.com/ranveersequeira" 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors"
                                    >
                                        <Github className="h-4 w-4" />
                                        <span>github</span>
                                    </a>
                                    <a 
                                        href="https://www.linkedin.com/in/ranveersequeira" 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors"
                                    >
                                        <Linkedin className="h-4 w-4" />
                                        <span>linkedin</span>
                                    </a>
                                    <a 
                                        href="https://twitter.com/ranveersequeira" 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors"
                                    >
                                        <Twitter className="h-4 w-4" />
                                        <span>twitter</span>
                                    </a>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Resume Section */}
                <div className="space-y-4">
                    <button
                        onClick={() => setShowResume(!showResume)}
                        className="w-full flex items-center justify-between text-xl font-bold text-foreground hover:text-primary transition-colors py-2 border-b border-border"
                    >
                        <span className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            <span className="text-muted-foreground">~/</span>resume
                        </span>
                        {showResume ? (
                            <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                    </button>

                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${showResume ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="space-y-4 pt-2">
                            <div className="aspect-[4/5] sm:aspect-[4/3] w-full border border-border rounded-lg overflow-hidden bg-background/50">
                                <iframe
                                    src="https://drive.google.com/file/d/1VUBY4yr0-PI9ysn5waZhjKeMSbnlsu8O/preview"
                                    width="100%"
                                    height="100%"
                                    className="border-0"
                                    title="Resume Preview"
                                ></iframe>
                            </div>
                            <Button asChild variant="outline" className="w-full gap-2 border-primary/50 text-primary hover:bg-primary/10">
                                <a 
                                    href="https://drive.google.com/file/d/1VUBY4yr0-PI9ysn5waZhjKeMSbnlsu8O/view?usp=sharing" 
                                    target="_blank" 
                                    rel="noreferrer"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                    Open Full Resume
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

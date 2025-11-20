import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
    return (
        <section className="space-y-8">
            <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                <span className="text-muted-foreground">~/</span>contact
            </h2>

            <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                    <p className="text-lg text-foreground/80 leading-relaxed">
                        I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="text-primary font-mono">email:</span>
                            <a href="mailto:ranveersequeira@gmail.com" className="hover:text-primary transition-colors">
                                ranveersequeira@gmail.com
                            </a>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-primary font-mono">socials:</span>
                            <div className="flex gap-4 text-sm">
                                <a href="https://github.com/ranveersequeira" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">github</a>
                                <a href="https://www.linkedin.com/in/ranveersequeira" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">linkedin</a>
                                <a href="https://twitter.com/ranveersequeira" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">twitter</a>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-border/50">
                        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                            <span className="text-muted-foreground">~/</span>resume
                        </h3>
                        <div className="aspect-[4/3] w-full border border-border rounded-lg overflow-hidden bg-background/50">
                            <iframe
                                src="https://drive.google.com/file/d/1VUBY4yr0-PI9ysn5waZhjKeMSbnlsu8O/preview"
                                width="100%"
                                height="100%"
                                className="border-0"
                                title="Resume Preview"
                            ></iframe>
                        </div>
                        <Button asChild variant="outline" className="w-full gap-2">
                            <a href="https://drive.google.com/file/d/1VUBY4yr0-PI9ysn5waZhjKeMSbnlsu8O/view?usp=sharing" target="_blank" rel="noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                                Download / View Full Resume
                            </a>
                        </Button>
                    </div>
                </div>

                <Card className="bg-card border-border">
                    <CardHeader>
                        <CardTitle>Send me a message</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">Name</label>
                                <Input id="name" placeholder="John Doe" className="bg-background border-input" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">Email</label>
                                <Input id="email" type="email" placeholder="john@example.com" className="bg-background border-input" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">Message</label>
                                <Textarea id="message" placeholder="Hello..." className="bg-background border-input min-h-[120px]" />
                            </div>
                            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                                Send Message
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default Contact;

import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogs";

const BlogsPreview = () => {
    const [post] = blogPosts;

    if (!post) {
        return null;
    }

    return (
        <section className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                    <span className="text-muted-foreground">~/</span>blogs
                </h2>
                <Button asChild variant="ghost" size="sm" className="w-fit text-primary hover:bg-primary/10">
                    <Link to="/blogs" className="flex items-center gap-2">
                        open_archive
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </Button>
            </div>

            <article className="rounded-lg border border-border bg-card/50 p-5 transition-colors hover:border-primary/50">
                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-primary" />
                            {post.publishedAt}
                        </span>
                        <span className="inline-flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-primary" />
                            {post.readingTime}
                        </span>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-foreground">
                            <Link to={`/blogs/${post.slug}`} className="hover:text-primary transition-colors">
                                {post.title}
                            </Link>
                        </h3>
                        <p className="text-sm sm:text-base leading-relaxed text-foreground/75">
                            {post.description}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="font-mono text-xs">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    <Button asChild variant="outline" size="sm" className="border-primary/50 text-primary hover:bg-primary/10">
                        <Link to={`/blogs/${post.slug}`} className="flex items-center gap-2">
                            Read Blog
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </article>
        </section>
    );
};

export default BlogsPreview;

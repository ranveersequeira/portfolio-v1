import { useCallback, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, ChevronDown, Clock, ExternalLink, Languages } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBlogPostBySlug, type BlogSection, type BlogTable } from "@/data/blogs";

const GOOGLE_TRANSLATE_ELEMENT_ID = "google_translate_element";
const GOOGLE_TRANSLATE_SCRIPT_ID = "google-translate-script";
const GOOGLE_TRANSLATE_COMBO_SELECTOR = ".goog-te-combo";

type GoogleTranslateElementOptions = {
    pageLanguage: string;
    includedLanguages: string;
    autoDisplay: boolean;
};

declare global {
    interface Window {
        googleTranslateElementInit?: () => void;
        google?: {
            translate?: {
                TranslateElement?: new (
                    options: GoogleTranslateElementOptions,
                    elementId: string
                ) => void;
            };
        };
    }
}

const applyHindiTranslation = () => {
    const translateCombo = document.querySelector<HTMLSelectElement>(GOOGLE_TRANSLATE_COMBO_SELECTOR);

    if (!translateCombo) {
        return false;
    }

    translateCombo.value = "hi";
    translateCombo.dispatchEvent(new Event("change", { bubbles: true }));

    return true;
};

const renderHighlightedText = (text: string) => {
    return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
        if (!part.startsWith("**") || !part.endsWith("**")) {
            return part;
        }

        return (
            <mark
                key={`${part}-${index}`}
                className="rounded-sm bg-primary/15 px-1 py-0.5 font-semibold text-primary box-decoration-clone"
            >
                {part.slice(2, -2)}
            </mark>
        );
    });
};

const BlogContentTable = ({ table }: { table: BlogTable }) => {
    return (
        <div className="overflow-x-auto rounded-lg border border-border">
            <table className="min-w-[720px] w-full border-collapse text-left text-sm sm:text-base">
                <caption className="caption-bottom px-4 py-3 text-left text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {renderHighlightedText(table.caption)}
                </caption>
                <thead className="bg-muted/50 text-foreground">
                    <tr>
                        {table.headers.map((header) => (
                            <th key={header} scope="col" className="border-b border-border px-4 py-3 align-top font-bold">
                                {renderHighlightedText(header)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {table.rows.map((row, rowIndex) => (
                        <tr key={`${table.caption}-${rowIndex}`} className="border-b border-border last:border-b-0">
                            {row.map((cell, cellIndex) => {
                                const isRowHeader = cellIndex === 0;
                                const Cell = isRowHeader ? "th" : "td";

                                return (
                                    <Cell
                                        key={`${cell}-${cellIndex}`}
                                        scope={isRowHeader ? "row" : undefined}
                                        className="px-4 py-3 align-top leading-relaxed text-foreground/80 first:font-bold first:text-foreground"
                                    >
                                        {renderHighlightedText(cell)}
                                    </Cell>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const BlogSectionContent = ({ section }: { section: BlogSection }) => {
    return (
        <div className="space-y-4 text-base sm:text-lg leading-relaxed text-foreground/80">
            {section.body.map((paragraph) => (
                <p key={paragraph}>{renderHighlightedText(paragraph)}</p>
            ))}
            {section.table ? <BlogContentTable table={section.table} /> : null}
        </div>
    );
};

const BlogPost = () => {
    const { slug } = useParams();
    const post = getBlogPostBySlug(slug);
    const pendingHindiTranslationRef = useRef(false);
    const [translationStatus, setTranslationStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");

    const translateToHindi = useCallback(() => {
        if (typeof window === "undefined") {
            return;
        }

        if (applyHindiTranslation()) {
            setTranslationStatus("ready");
            return;
        }

        pendingHindiTranslationRef.current = true;
        setTranslationStatus("loading");

        window.googleTranslateElementInit = () => {
            const TranslateElement = window.google?.translate?.TranslateElement;

            if (!TranslateElement) {
                pendingHindiTranslationRef.current = false;
                setTranslationStatus("error");
                return;
            }

            new TranslateElement(
                {
                    pageLanguage: "en",
                    includedLanguages: "hi",
                    autoDisplay: false,
                },
                GOOGLE_TRANSLATE_ELEMENT_ID
            );

            window.setTimeout(() => {
                if (!pendingHindiTranslationRef.current) {
                    return;
                }

                pendingHindiTranslationRef.current = false;
                setTranslationStatus(applyHindiTranslation() ? "ready" : "error");
            }, 700);
        };

        if (document.getElementById(GOOGLE_TRANSLATE_SCRIPT_ID)) {
            window.googleTranslateElementInit?.();
            window.setTimeout(() => {
                pendingHindiTranslationRef.current = false;
                setTranslationStatus(applyHindiTranslation() ? "ready" : "error");
            }, 700);
            return;
        }

        const script = document.createElement("script");
        script.id = GOOGLE_TRANSLATE_SCRIPT_ID;
        script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        script.onerror = () => {
            pendingHindiTranslationRef.current = false;
            setTranslationStatus("error");
        };
        document.body.appendChild(script);
    }, []);

    if (!post) {
        return (
            <section className="space-y-6 py-12">
                <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">blog lookup failed</p>
                    <h1 className="text-3xl font-bold text-destructive">Post not found</h1>
                </div>
                <Button asChild variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                    <Link to="/blogs" className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Blogs
                    </Link>
                </Button>
            </section>
        );
    }

    return (
        <article className="space-y-10">
            <Button asChild variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                <Link to="/blogs" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    blogs
                </Link>
            </Button>

            <header className="space-y-5 border-b border-border pb-8">
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

                <div className="space-y-4">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">
                        {post.title}
                    </h1>
                    <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-foreground/80">
                        {renderHighlightedText(post.description)}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="font-mono text-xs">
                            {tag}
                        </Badge>
                    ))}
                </div>

                <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm leading-relaxed text-foreground/80">
                            {translationStatus === "error"
                                ? "Hindi translation could not load here. On Chrome mobile, use the browser menu and tap Translate."
                                : "Prefer Hindi? Translate this page in place."}
                        </p>
                        <Button
                            type="button"
                            size="sm"
                            className="w-full sm:w-auto"
                            disabled={translationStatus === "loading"}
                            onClick={translateToHindi}
                        >
                            <Languages className="h-4 w-4" />
                            {translationStatus === "loading" ? "Loading..." : "हिंदी में पढ़ें"}
                        </Button>
                    </div>
                    <div
                        id={GOOGLE_TRANSLATE_ELEMENT_ID}
                        aria-hidden="true"
                        className="pointer-events-none fixed -left-[10000px] top-0 h-px w-px overflow-hidden opacity-0"
                    />
                </div>
            </header>

            <aside className="rounded-lg border border-accent/40 bg-accent/10 p-5 space-y-2">
                <h2 className="text-sm font-bold uppercase text-accent">disclaimer</h2>
                <p className="text-sm sm:text-base leading-relaxed text-foreground/80">
                    {renderHighlightedText(post.disclaimer)}
                </p>
            </aside>

            <div className="space-y-9">
                {post.sections.map((section) => {
                    const isTldrSection = section.title.toLowerCase().startsWith("tl;dr");

                    if (isTldrSection) {
                        return (
                            <section key={section.title} className="space-y-3">
                                <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-start gap-2">
                                    <span className="text-muted-foreground">&gt;</span>
                                    <span>{section.title}</span>
                                </h2>
                                <details className="group rounded-lg border border-primary/30 bg-primary/5 p-4">
                                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold text-primary outline-none transition-colors hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background [&::-webkit-details-marker]:hidden">
                                        <span>Show TL;DR key points</span>
                                        <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" />
                                    </summary>
                                    <div className="mt-4">
                                        <BlogSectionContent section={section} />
                                    </div>
                                </details>
                            </section>
                        );
                    }

                    return (
                        <section key={section.title} className="space-y-3">
                            <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-start gap-2">
                                <span className="text-muted-foreground">&gt;</span>
                                <span>{section.title}</span>
                            </h2>
                            <BlogSectionContent section={section} />
                        </section>
                    );
                })}
            </div>

            <section className="rounded-lg border border-primary/30 bg-primary/5 p-5 space-y-4">
                <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                    <span className="text-muted-foreground">&gt;</span> keep_in_mind
                </h2>
                <ul className="space-y-2 text-foreground/80">
                    {post.takeaways.map((takeaway) => (
                        <li key={takeaway} className="flex gap-2">
                            <span className="text-accent">-</span>
                            <span>{renderHighlightedText(takeaway)}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="space-y-4 border-t border-border pt-8">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <span className="text-muted-foreground">&gt;</span> references
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                    This is personal writing, not medical advice. If there is immediate danger, call local emergency services or a crisis helpline.
                </p>
                <ul className="space-y-2">
                    {post.resources.map((resource) => (
                        <li key={resource.href}>
                            <a
                                href={resource.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                            >
                                {resource.label}
                                <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                        </li>
                    ))}
                </ul>
            </section>
        </article>
    );
};

export default BlogPost;

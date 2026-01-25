import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const links = [
        { href: "/", label: "~/home" },
        { href: "/projects", label: "~/projects" },
        { href: "/about", label: "~/about" },
        { href: "/contact", label: "~/contact" },
    ];

    return (
        <>
            <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 font-bold text-sm sm:text-base">
                        <span className="text-primary">ranveer</span>
                        <span className="text-muted-foreground">_sequeira</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                className={cn(
                                    "transition-colors hover:text-primary",
                                    location.pathname === link.href 
                                        ? "text-primary" 
                                        : "text-muted-foreground"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <ModeToggle />
                    </nav>

                    {/* Mobile: Theme Toggle + Hamburger */}
                    <div className="flex md:hidden items-center gap-2">
                        <ModeToggle />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </Button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu - Portal-like rendering outside header */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 z-[100] bg-black/60 md:hidden"
                        onClick={() => setIsOpen(false)}
                        aria-hidden="true"
                    />
                    
                    {/* Drawer */}
                    <div className="fixed top-0 right-0 z-[101] h-full w-72 bg-background border-l border-border shadow-2xl md:hidden">
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between h-14 px-4 border-b border-border">
                            <span className="font-mono text-sm text-muted-foreground">menu</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(false)}
                                aria-label="Close menu"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                        
                        {/* Navigation Links */}
                        <nav className="flex flex-col p-4 space-y-1">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "text-lg font-mono py-3 px-4 rounded-md transition-all",
                                        location.pathname === link.href
                                            ? "text-primary bg-primary/10 border-l-2 border-primary"
                                            : "text-foreground hover:text-primary hover:bg-muted"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </>
            )}
        </>
    );
};

export default Navbar;

import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";

const Navbar = () => {
    const location = useLocation();

    const links = [
        { href: "/", label: "~/home" },
        { href: "/projects", label: "~/projects" },
        { href: "/about", label: "~/about" },
        { href: "/contact", label: "~/contact" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-14 max-w-4xl items-center px-4">
                <div className="mr-4 hidden md:flex">
                    <Link to="/" className="mr-6 flex items-center space-x-2 font-bold">
                        <span>ranveer_sequeira</span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                className={cn(
                                    "transition-colors hover:text-foreground/80",
                                    location.pathname === link.href ? "text-primary" : "text-foreground/60"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <ModeToggle />
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;

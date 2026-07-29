import Navbar from "@/components/Navbar";
import { useTheme } from "@/components/theme-provider";
import { ThemeSuggestion } from "@/components/ThemeSuggestion";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { theme } = useTheme();
    
    return (
        <div className="min-h-screen flex flex-col font-mono bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-4xl">
                {children}
            </main>
            <footer className="border-t border-border bg-card py-2 px-4 text-xs text-muted-foreground">
                <div className="container mx-auto max-w-4xl flex flex-col sm:flex-row justify-between items-center gap-2">
                    <div className="flex gap-4">
                        <span className="text-primary">NORMAL</span>
                        <span>main*</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="hidden sm:inline">utf-8</span>
                        <span>typescript</span>
                        <span className="text-accent">{theme}</span>
                    </div>
                </div>
            </footer>
            <ThemeSuggestion />
        </div>
    );
};

export default Layout;

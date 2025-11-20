import Navbar from "@/components/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col font-mono bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
                {children}
            </main>
            <footer className="border-t border-border bg-card py-2 px-4 text-xs text-muted-foreground flex justify-between items-center">
                <div className="flex gap-4">
                    <span>NORMAL</span>
                    <span>master*</span>
                </div>
                <div className="flex gap-4">
                    <span>utf-8</span>
                    <span>typescript</span>
                    <span>100%</span>
                </div>
            </footer>
        </div>
    );
};

export default Layout;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-destructive/10 flex flex-col items-center justify-center p-4 text-center space-y-6 font-mono">
            <div className="space-y-2">
                <h1 className="text-6xl font-bold text-destructive">404</h1>
                <h2 className="text-2xl font-bold text-foreground">KERNEL PANIC</h2>
            </div>
            <p className="text-muted-foreground max-w-md">
                Fatal exception: Page not found at memory address {window.location.pathname}
                <br />
                System halted.
            </p>
            <Button asChild variant="default" className="bg-primary text-primary-foreground">
                <Link to="/">Reboot System (Go Home)</Link>
            </Button>
        </div>
    );
};

export default NotFound;

import { useState, useEffect } from "react";
import { X, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme, themes } from "@/components/theme-provider";
import type { Theme } from "@/components/theme-provider";

export function ThemeSuggestion() {
    const { theme, setTheme, hasSeenThemePicker, setHasSeenThemePicker } = useTheme();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show popup after a short delay if user hasn't seen it
        if (!hasSeenThemePicker) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [hasSeenThemePicker]);

    const handleDismiss = () => {
        setIsVisible(false);
        setHasSeenThemePicker(true);
    };

    const handleThemeSelect = (newTheme: Theme) => {
        setTheme(newTheme);
        handleDismiss();
    };

    if (!isVisible) return null;

    // Show a subset of popular themes
    const suggestedThemes = themes.slice(0, 6);

    return (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
            <div className="bg-card border border-border rounded-lg shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between p-3 border-b border-border bg-muted/50">
                    <div className="flex items-center gap-2">
                        <Palette className="h-4 w-4 text-primary" />
                        <span className="font-mono text-sm font-medium">Pick a theme</span>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={handleDismiss}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                
                <div className="p-3">
                    <div className="grid grid-cols-3 gap-2">
                        {suggestedThemes.map((t) => (
                            <button
                                key={t.value}
                                onClick={() => handleThemeSelect(t.value)}
                                className={`flex flex-col items-center gap-1.5 p-2 rounded-md transition-colors hover:bg-muted ${
                                    theme === t.value ? "bg-primary/10 ring-1 ring-primary" : ""
                                }`}
                            >
                                <div className="flex gap-0.5">
                                    <div 
                                        className="w-4 h-4 rounded-full border border-border/50" 
                                        style={{ backgroundColor: t.colors.bg }}
                                    />
                                    <div 
                                        className="w-4 h-4 rounded-full border border-border/50" 
                                        style={{ backgroundColor: t.colors.primary }}
                                    />
                                </div>
                                <span className="text-[10px] font-mono text-muted-foreground truncate w-full text-center">
                                    {t.label.split(" ")[0]}
                                </span>
                            </button>
                        ))}
                    </div>
                    
                    <p className="text-[10px] text-muted-foreground text-center mt-3">
                        More themes available in the menu
                    </p>
                </div>
            </div>
        </div>
    );
}

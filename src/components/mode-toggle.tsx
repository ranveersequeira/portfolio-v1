import { Palette, Check, Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { useTheme, themes } from "@/components/theme-provider"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    const darkThemes = themes.filter(t => !t.isLight)
    const lightThemes = themes.filter(t => t.isLight)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <Palette className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Select theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel className="flex items-center gap-2 text-muted-foreground">
                    <Moon className="h-3 w-3" /> Dark
                </DropdownMenuLabel>
                {darkThemes.map((t) => (
                    <DropdownMenuItem
                        key={t.value}
                        onClick={() => setTheme(t.value)}
                        className="flex items-center gap-3 cursor-pointer"
                    >
                        <div className="flex gap-1">
                            <div 
                                className="w-3 h-3 rounded-full border border-border/50" 
                                style={{ backgroundColor: t.colors.bg }}
                            />
                            <div 
                                className="w-3 h-3 rounded-full border border-border/50" 
                                style={{ backgroundColor: t.colors.primary }}
                            />
                            <div 
                                className="w-3 h-3 rounded-full border border-border/50" 
                                style={{ backgroundColor: t.colors.accent }}
                            />
                        </div>
                        <span className="flex-1 font-mono text-sm">{t.label}</span>
                        {theme === t.value && (
                            <Check className="h-4 w-4 text-primary" />
                        )}
                    </DropdownMenuItem>
                ))}
                
                <DropdownMenuSeparator />
                
                <DropdownMenuLabel className="flex items-center gap-2 text-muted-foreground">
                    <Sun className="h-3 w-3" /> Light
                </DropdownMenuLabel>
                {lightThemes.map((t) => (
                    <DropdownMenuItem
                        key={t.value}
                        onClick={() => setTheme(t.value)}
                        className="flex items-center gap-3 cursor-pointer"
                    >
                        <div className="flex gap-1">
                            <div 
                                className="w-3 h-3 rounded-full border border-border/50" 
                                style={{ backgroundColor: t.colors.bg }}
                            />
                            <div 
                                className="w-3 h-3 rounded-full border border-border/50" 
                                style={{ backgroundColor: t.colors.primary }}
                            />
                            <div 
                                className="w-3 h-3 rounded-full border border-border/50" 
                                style={{ backgroundColor: t.colors.accent }}
                            />
                        </div>
                        <span className="flex-1 font-mono text-sm">{t.label}</span>
                        {theme === t.value && (
                            <Check className="h-4 w-4 text-primary" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

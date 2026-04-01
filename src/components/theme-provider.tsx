/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react"

export type Theme = 
    | "tokyo-night" 
    | "catppuccin-mocha" 
    | "gruvbox-dark" 
    | "dracula" 
    | "one-dark" 
    | "nord"
    | "catppuccin-latte"
    | "gruvbox-light"
    | "rose-pine-dawn"

type ThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: Theme
    storageKey?: string
}

type ThemeProviderState = {
    theme: Theme
    setTheme: (theme: Theme) => void
    hasSeenThemePicker: boolean
    setHasSeenThemePicker: (value: boolean) => void
}

const initialState: ThemeProviderState = {
    theme: "tokyo-night",
    setTheme: () => null,
    hasSeenThemePicker: false,
    setHasSeenThemePicker: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export type ThemeConfig = { 
    value: Theme
    label: string
    isLight: boolean
    colors: { bg: string; primary: string; accent: string } 
}

export const themes: ThemeConfig[] = [
    // Dark themes
    { 
        value: "tokyo-night", 
        label: "Tokyo Night",
        isLight: false,
        colors: { bg: "#1a1b26", primary: "#7aa2f7", accent: "#bb9af7" }
    },
    { 
        value: "catppuccin-mocha", 
        label: "Catppuccin Mocha",
        isLight: false,
        colors: { bg: "#1e1e2e", primary: "#cba6f7", accent: "#f5c2e7" }
    },
    { 
        value: "gruvbox-dark", 
        label: "Gruvbox Dark",
        isLight: false,
        colors: { bg: "#282828", primary: "#fabd2f", accent: "#fe8019" }
    },
    { 
        value: "dracula", 
        label: "Dracula",
        isLight: false,
        colors: { bg: "#282a36", primary: "#bd93f9", accent: "#ff79c6" }
    },
    { 
        value: "one-dark", 
        label: "One Dark",
        isLight: false,
        colors: { bg: "#282c34", primary: "#61afef", accent: "#c678dd" }
    },
    { 
        value: "nord", 
        label: "Nord",
        isLight: false,
        colors: { bg: "#2e3440", primary: "#88c0d0", accent: "#81a1c1" }
    },
    // Light themes
    { 
        value: "catppuccin-latte", 
        label: "Catppuccin Latte",
        isLight: true,
        colors: { bg: "#eff1f5", primary: "#8839ef", accent: "#ea76cb" }
    },
    { 
        value: "gruvbox-light", 
        label: "Gruvbox Light",
        isLight: true,
        colors: { bg: "#fbf1c7", primary: "#b57614", accent: "#af3a03" }
    },
    { 
        value: "rose-pine-dawn", 
        label: "Rosé Pine Dawn",
        isLight: true,
        colors: { bg: "#faf4ed", primary: "#907aa9", accent: "#d7827e" }
    },
]

export function ThemeProvider({
    children,
    defaultTheme = "tokyo-night",
    storageKey = "portfolio-theme",
    ...props
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
    )
    const [hasSeenThemePicker, setHasSeenThemePickerState] = useState<boolean>(
        () => localStorage.getItem("theme-picker-seen") === "true"
    )

    useEffect(() => {
        const root = window.document.documentElement
        root.setAttribute("data-theme", theme)
    }, [theme])

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            localStorage.setItem(storageKey, theme)
            setTheme(theme)
        },
        hasSeenThemePicker,
        setHasSeenThemePicker: (value: boolean) => {
            localStorage.setItem("theme-picker-seen", String(value))
            setHasSeenThemePickerState(value)
        },
    }

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext)

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider")

    return context
}

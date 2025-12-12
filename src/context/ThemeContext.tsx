"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "reading";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    readingIntensity: number; // 0 to 100
    setReadingIntensity: (intensity: number) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("light");
    const [readingIntensity, setReadingIntensity] = useState<number>(50);

    useEffect(() => {
        // Check local storage or preference
        const storedTheme = localStorage.getItem("pensieri-theme") as Theme;
        const storedIntensity = localStorage.getItem("pensieri-reading-intensity");

        if (storedTheme) {
            setTheme(storedTheme);
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark");
        }

        if (storedIntensity) {
            setReadingIntensity(parseInt(storedIntensity));
        }
    }, []);

    useEffect(() => {
        // Apply theme to document
        const root = document.documentElement;
        root.setAttribute("data-theme", theme);
        localStorage.setItem("pensieri-theme", theme);
    }, [theme]);

    useEffect(() => {
        // Apply intensity variable
        const root = document.documentElement;
        root.style.setProperty("--reading-intensity", `${readingIntensity}%`);
        localStorage.setItem("pensieri-reading-intensity", readingIntensity.toString());
    }, [readingIntensity]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, readingIntensity, setReadingIntensity }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}


"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="fixed top-6 right-6 z-50">
                <button
                    className="group relative flex h-8 w-14 cursor-pointer items-center rounded-full bg-gray-100 dark:bg-zinc-800 p-1"
                    aria-label="Toggle Theme"
                >
                    <div className="flex h-6 w-6 transform items-center justify-center rounded-full bg-white dark:bg-black shadow-md"></div>
                </button>
            </div>
        )
    }

    return (
        <div className="fixed top-6 right-6 z-50">
            <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="group relative flex h-8 w-14 cursor-pointer items-center rounded-full bg-gray-100 dark:bg-zinc-800 p-1 transition-all duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-zinc-700"
                aria-label="Toggle Theme"
            >
                <div className="flex h-6 w-6 transform items-center justify-center rounded-full bg-white dark:bg-black shadow-md transition-all duration-500 ease-in-out dark:translate-x-6 translate-x-0 relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun h-3 w-3 text-orange-400 fill-orange-400 absolute transition-all duration-500 rotate-0 scale-100 dark:-rotate-90 dark:opacity-0" aria-hidden="true">
                        <circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon h-3 w-3 text-white absolute transition-all duration-500 rotate-90 opacity-0 dark:rotate-0 dark:opacity-100" aria-hidden="true">
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                    </svg>
                </div>
            </button>
        </div>
    )
}

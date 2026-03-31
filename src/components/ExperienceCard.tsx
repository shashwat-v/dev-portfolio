"use client";

import { useState } from "react";

interface ExperienceCardProps {
    title: string;
    role: string;
    logo: React.ReactNode;
    children: React.ReactNode;
    link?: string;
}

export function ExperienceCard({ title, role, logo, children, link }: ExperienceCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="group relative rounded-2xl border border-gray-200 dark:border-gray-800 p-6 transition-all hover:border-gray-300 dark:hover:border-gray-700">
            <div className="mb-4 flex items-center gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-50 dark:bg-zinc-800 flex items-center justify-center grayscale transition-all duration-300 group-hover:grayscale-0">
                    {logo}
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-black dark:text-white text-base">{title}</span>
                        {link && (
                            <a href={link} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 dark:text-gray-500 underline underline-offset-2 hover:text-black dark:hover:text-white">link</a>
                        )}
                    </div>
                    <span className="text-sm text-gray-400 dark:text-gray-500">{role}</span>
                </div>
            </div>
            
            <div className={`relative text-sm leading-relaxed text-gray-500 dark:text-gray-400 transition-all duration-300 ${!isExpanded ? 'max-h-20 overflow-hidden' : ''}`}>
                <div className="space-y-2">
                    {children}
                </div>
                {!isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white dark:from-black to-transparent"></div>
                )}
            </div>
            
            <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 flex items-center gap-1 text-xs font-medium text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                aria-expanded={isExpanded}
            >
                {isExpanded ? (
                    <>
                        View Less <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-up h-3 w-3"><path d="m18 15-6-6-6 6"></path></svg>
                    </>
                ) : (
                    <>
                        View More <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down h-3 w-3"><path d="m6 9 6 6 6-6"></path></svg>
                    </>
                )}
            </button>
        </div>
    );
}

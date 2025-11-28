import AppLogoIcon from "@/components/app-logo-icon";
import { home } from "@/routes";
import { type SharedData } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { type PropsWithChildren, useEffect, useState } from "react";

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    const { name, quote } = usePage<SharedData>().props;

    const images = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg", "/5.jpg"];
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % images.length);
        }, 5000); // 5 seconds per slide

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
            {/* LEFT SECTION — FADE CAROUSEL */}
            <div className="relative hidden h-full flex-col overflow-hidden bg-black text-white lg:flex dark:border-r">
                {/* Images (cross-fade) */}
                <div className="absolute inset-0">
                    {images.map((src, idx) => (
                        <img
                            key={idx}
                            src={src}
                            alt=""
                            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
                                idx === activeIndex ? "opacity-100" : "opacity-0"
                            }`}
                        />
                    ))}
                </div>

                {/* Dark gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />

                {/* Logo + Brand */}
                <Link
                    href={home()}
                    className="relative z-20 flex items-center text-lg font-medium px-10 pt-8"
                >
                    <AppLogoIcon className="mr-2 size-9 fill-current text-white" />
                    {name}
                </Link>

                {/* Quote at bottom */}
                {quote && (
                    <div className="relative z-20 mt-auto px-10 pb-10 max-w-xl">
                        <blockquote className="space-y-2">
                            <p className="text-lg leading-relaxed">
                                &ldquo;{quote.message}&rdquo;
                            </p>
                            <footer className="text-sm text-neutral-300">
                                {quote.author}
                            </footer>
                        </blockquote>

                        {/* Dots */}
                        <div className="mt-6 flex items-center gap-2">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    aria-label={`Go to slide ${idx + 1}`}
                                    className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                                        idx === activeIndex
                                            ? "bg-white scale-110 shadow-[0_0_0_4px_rgba(255,255,255,0.25)]"
                                            : "bg-white/40 hover:bg-white/70"
                                    }`}
                                    onClick={() => setActiveIndex(idx)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* RIGHT SECTION — AUTH FORM */}
            <div className="w-full lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Link
                        href={home()}
                        className="relative z-20 flex items-center justify-center lg:hidden"
                    >
                        <AppLogoIcon className="h-10 fill-current text-black dark:text-white sm:h-12" />
                    </Link>

                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-xl font-medium">{title}</h1>
                        <p className="text-sm text-balance text-muted-foreground">
                            {description}
                        </p>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}
    
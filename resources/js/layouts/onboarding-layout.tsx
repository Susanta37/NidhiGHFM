import { PropsWithChildren } from "react";
import { Head } from "@inertiajs/react";

export default function OnboardingLayout({ title, children }: PropsWithChildren<{ title?: string }>) {
    return (
        <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950">
            {title && <Head title={title} />}

            <div className="flex flex-col items-center justify-center flex-1 px-6 py-12">
                <div className="max-w-md w-full space-y-6 text-center">
                    {children}
                </div>
            </div>

            <footer className="py-6 text-center text-xs text-neutral-500 dark:text-neutral-400">
                © {new Date().getFullYear()} Your Company — All rights reserved.
            </footer>
        </div>
    );
}

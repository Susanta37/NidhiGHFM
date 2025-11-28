import { Head, Link, usePage } from "@inertiajs/react";
import type { SharedData } from "@/types";

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome" />

            <div className="min-h-screen flex flex-col items-center justify-center px-6 py-14 bg-white text-[#0c2b39] dark:bg-neutral-950 dark:text-neutral-200 transition-colors">

                {/* LOGO */}
                <div className="flex flex-col items-center gap-4 animate-fade-in">
                    <img
                        src="/favicon.png"
                        alt="Nidhi Group Logo"
                        className="h-36 w-36 drop-shadow-md"
                    />

                    <h1 className="text-3xl font-extrabold tracking-wide text-[#083c5c] dark:text-neutral-100 text-center">
                        NIDHI GROUP
                    </h1>

                    <p className="text-sm tracking-wide text-[#2aa9b3] dark:text-[#34e4f2] text-center font-medium uppercase">
                        Of Hospitality & Facility Management
                    </p>
                </div>

                {/* Tagline */}
                <p className="mt-8 text-center max-w-2xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Delivering trusted hospitality & industrial workforce solutions
                    with professionalism, integrity and excellence.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-10">
                    {auth.user ? (
                        <Link
                            href="/login"
                            className="px-6 py-2 rounded-lg bg-[#0c2b39] text-white hover:bg-[#0e4257] dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-300 transition"
                        >
                            Go to Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="px-6 py-2 rounded-lg bg-[#0c2b39] text-white hover:bg-[#0e4257] dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-300 transition"
                            >
                                Log In
                            </Link>
                            <Link
                                href="/register"
                                className="px-6 py-2 rounded-lg border border-[#0c2b39] text-[#0c2b39] hover:bg-[#0c2b39] hover:text-white 
                                dark:border-neutral-300 dark:text-neutral-200 dark:hover:bg-neutral-200 dark:hover:text-neutral-900 transition"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                {/* Footer */}
                <footer className="mt-14 text-xs text-neutral-500 dark:text-neutral-400">
                    © {new Date().getFullYear()} Nidhi Group of Hospitality & Facility Management. All rights reserved.
                </footer>
            </div>
        </>
    );
}

import OnboardingLayout from "@/layouts/onboarding-layout";
import { Head, Link, router } from "@inertiajs/react";

export default function Welcome() {
    const handleSkip = () => {
        router.post(("onboarding.skip"));
    };

    return (
        <OnboardingLayout title="Welcome">
            <h1 className="text-3xl font-bold">Welcome to the CRM 👋</h1>

            <p className="text-neutral-600 dark:text-neutral-300 text-center">
                Before you jump in, let’s update your profile and preferences so we can personalize your dashboard.
            </p>

            <Link
                href="/settings/profile"
                className="inline-block px-6 py-3 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 transition"
            >
                Complete Profile
            </Link>

            {/* NEW Skip Button */}
            <button
                onClick={handleSkip}
                className="mt-4 text-sm text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
            >
                Skip for now
            </button>
        </OnboardingLayout>
    );
}

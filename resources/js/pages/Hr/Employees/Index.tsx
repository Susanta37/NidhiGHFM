import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";

export default function Index() {
    return (
        <AppLayout>
            <Head title="Employee" />
            <div className="p-6 text-xl font-semibold text-neutral-900 dark:text-white">
                WEmployees
            </div>
        </AppLayout>
    );
}

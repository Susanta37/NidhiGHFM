import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <AppLayout>
            <Head title="Dashboard" />
            <div className="p-6 text-xl font-semibold text-neutral-900 dark:text-white">
                Welcome to your Site Manager Dashboard
            </div>
        </AppLayout>
    );
}

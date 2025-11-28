import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Supervisor Dashboard',
        href: '/supervisor/dashboard',
    },
];

export default function SupervisorDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Supervisor Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 bg-neutral-900 text-white">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-green-500/50 bg-neutral-800 shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]">
                        <div className="flex h-full items-center justify-center p-4">
                            <h3 className="text-lg font-semibold text-green-400">Team Overview</h3>
                        </div>
                        <PlaceholderPattern className="absolute inset-0 -z-10 size-full stroke-green-500/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-blue-500/50 bg-neutral-800 shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]">
                        <div className="flex h-full items-center justify-center p-4">
                            <h3 className="text-lg font-semibold text-blue-400">Reports</h3>
                        </div>
                        <PlaceholderPattern className="absolute inset-0 -z-10 size-full stroke-blue-500/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-yellow-500/50 bg-neutral-800 shadow-[0_0_15px_rgba(234,179,8,0.3)] transition-all hover:shadow-[0_0_25px_rgba(234,179,8,0.5)]">
                        <div className="flex h-full items-center justify-center p-4">
                            <h3 className="text-lg font-semibold text-yellow-400">Tasks</h3>
                        </div>
                        <PlaceholderPattern className="absolute inset-0 -z-10 size-full stroke-yellow-500/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-neutral-700 bg-neutral-800/50 md:min-h-min">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600">Welcome, Supervisor!</h2>
                        <p className="mt-2 text-gray-400">Manage your team and tasks here.</p>
                    </div>
                    <PlaceholderPattern className="absolute inset-0 -z-10 size-full stroke-neutral-700/20" />
                </div>
            </div>
        </AppLayout>
    );
}

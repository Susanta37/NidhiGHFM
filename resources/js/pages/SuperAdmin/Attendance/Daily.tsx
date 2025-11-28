import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import {
    Calendar,
    Clock,
    Search,
    CheckCircle,
    XCircle,
} from "lucide-react";

import KpiCard from "@/components/KpiCard";

interface Props {
    records: any[];
    selectedDate: string;
}

export default function DailyAttendance({ records, selectedDate }: Props) {

    const [date, setDate] = useState(selectedDate);
    const [search, setSearch] = useState("");

    const filterRecords = records.filter((rec) => {
        const match =
            rec.user.name.toLowerCase().includes(search.toLowerCase()) ||
            rec.user.email.toLowerCase().includes(search.toLowerCase());
        return match;
    });

    const total = records.length;
    const present = records.filter((r) => r.check_in_time).length;
    const absent = total - present;

    const breadcrumbs = [
        { title: "Attendance", href: "#" },
        { title: "Daily Overview", href: "#" },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daily Attendance" />

            <div className="p-6 bg-neutral-50 dark:bg-neutral-950 min-h-screen">

                <h1 className="text-2xl font-semibold mb-8 text-neutral-900 dark:text-white flex items-center gap-2">
                    <Clock className="w-6 h-6" /> Daily Attendance
                </h1>

                {/* ======================== KPI CARDS ========================== */}
                <div className="grid gap-6 md:grid-cols-3 mb-8">
                    <KpiCard
                        title="Total Employees"
                        value={total}
                        change="+1%"
                        ctitle="Active users"
                        icon={Clock}
                        color="from-blue-500 to-sky-600"
                    />

                    <KpiCard
                        title="Present"
                        value={present}
                        change="+4%"
                        ctitle="Checked in"
                        icon={CheckCircle}
                        color="from-green-500 to-emerald-600"
                    />

                    <KpiCard
                        title="Absent"
                        value={absent}
                        change="-1.5%"
                        ctitle="Not checked in"
                        icon={XCircle}
                        color="from-red-500 to-red-700"
                    />
                </div>

                {/* ======================== FILTER BAR ========================= */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">

                    {/* Date Filter */}
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => {
                                setDate(e.target.value);
                                router.get(`/super-admin/attendance/daily`, { date: e.target.value });
                            }}
                            className="px-3 py-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                        />
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-1/3">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                        <input
                            type="text"
                            placeholder="Search employee..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 pr-3 py-2 border rounded-lg w-full dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                        />
                    </div>
                </div>

                {/* ======================== TABLE ============================== */}
                <div className="bg-white dark:bg-neutral-900 border dark:border-neutral-800 rounded-xl shadow-sm p-6 overflow-x-auto">

                    <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
                        <thead className="bg-neutral-100 dark:bg-neutral-800/60">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Employee</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Check In</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Check Out</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Image</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">

                            {filterRecords.map((rec) => (
                                <tr key={rec.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40">

                                    {/* Name */}
                                    <td className="px-4 py-4 font-medium text-neutral-900 dark:text-white">
                                        {rec.user.name}
                                        <div className="text-sm text-neutral-500">{rec.user.email}</div>
                                    </td>

                                    {/* Check In */}
                                    <td className="px-4 py-4 text-neutral-700 dark:text-neutral-300">
                                        {rec.check_in_time || "—"}
                                    </td>

                                    {/* Check Out */}
                                    <td className="px-4 py-4 text-neutral-700 dark:text-neutral-300">
                                        {rec.check_out_time || "—"}
                                    </td>

                                    {/* Status */}
                                    <td className="px-4 py-4">
                                        {rec.check_in_time ? (
                                            <span className="text-green-600 dark:text-green-400 flex items-center gap-2">
                                                <CheckCircle className="h-5 w-5" /> Present
                                            </span>
                                        ) : (
                                            <span className="text-red-600 dark:text-red-400 flex items-center gap-2">
                                                <XCircle className="h-5 w-5" /> Absent
                                            </span>
                                        )}
                                    </td>

                                    {/* Image */}
                                    <td className="px-4 py-4">
                                        {rec.check_in_image ? (
                                            <img
                                                src={`/storage/${rec.check_in_image}`}
                                                className="w-16 h-16 rounded-lg object-cover shadow"
                                            />
                                        ) : (
                                            <span className="text-neutral-400">—</span>
                                        )}
                                    </td>
                                </tr>
                            ))}

                            {filterRecords.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="text-center py-6 text-neutral-500 dark:text-neutral-400"
                                    >
                                        No attendance records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            </div>
        </AppLayout>
    );
}

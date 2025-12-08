import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

import {
    Calendar,
    Camera,
    CheckCircle,
    XCircle,
    Search,
    Filter,
    Timer,
} from "lucide-react";

import KpiCard from "@/components/KpiCard";

interface Props {
    logs: any[];
}

export default function Logs({  logs }: Props) {

    /* -------------------------------------------------------
       STATE
    ------------------------------------------------------- */
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [date, setDate] = useState("");

    /* -------------------------------------------------------
       KPI
    ------------------------------------------------------- */
    const total = logs.length;
    const matched = logs.filter((l) => l.is_face_matched).length;
    const mismatched = total - matched;

    /* -------------------------------------------------------
       FILTER LOGIC
    ------------------------------------------------------- */
    const filtered = logs.filter((log) => {
        const matchesSearch =
            log.user.name.toLowerCase().includes(search.toLowerCase()) ||
            log.user.email.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            status === "matched" ? log.is_face_matched :
            status === "mismatch" ? !log.is_face_matched :
            true;

        const matchesDate =
            date ? log.date === date : true;

        return matchesSearch && matchesStatus && matchesDate;
    });

    /* -------------------------------------------------------
       BREADCRUMBS
    ------------------------------------------------------- */
    const breadcrumbs = [
        { title: "Face Recognition", href: "/super-admin/face/records" },
        { title: "Attendance Logs", href: "#" },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Attendance Verification Logs" />

            <div className="p-6 bg-neutral-50 dark:bg-neutral-950 min-h-screen">

                <h1 className="text-2xl font-semibold mb-6 text-neutral-900 dark:text-white flex items-center gap-2">
                    <Timer className="w-6 h-6" /> Attendance Verification Logs
                </h1>

                {/* =======================================================
                    KPI CARDS
                ======================================================== */}
                <div className="grid gap-6 md:grid-cols-3 mb-8">
                    <KpiCard
                        title="Total Logs"
                        value={total}
                        change="+1.2%"
                        ctitle="Captured"
                        icon={Camera}
                        color="from-blue-500 to-sky-600"
                    />

                    <KpiCard
                        title="Matched"
                        value={matched}
                        change="+4%"
                        ctitle="Verified"
                        icon={CheckCircle}
                        color="from-green-500 to-teal-600"
                    />

                    <KpiCard
                        title="Mismatches"
                        value={mismatched}
                        change="-2%"
                        ctitle="Issues"
                        icon={XCircle}
                        color="from-red-500 to-red-700"
                    />
                </div>

                {/* =======================================================
                    FILTER BAR
                ======================================================== */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">

                    {/* Search */}
                    <div className="relative w-full md:w-1/3">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            placeholder="Search user..."
                            className="pl-10 pr-3 py-2 border rounded-lg w-full dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                        <select
                            onChange={(e) => setStatus(e.target.value)}
                            className="px-3 py-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                        >
                            <option value="">All Status</option>
                            <option value="matched">Matched</option>
                            <option value="mismatch">Mismatch</option>
                        </select>
                    </div>

                    {/* Date Filter */}
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="px-3 py-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                        />
                    </div>
                </div>

                {/* =======================================================
                    TABLE
                ======================================================== */}
                <div className="bg-white dark:bg-neutral-900 rounded-xl border dark:border-neutral-800 shadow-sm p-6 overflow-x-auto">

                    <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                        <thead className="bg-neutral-100 dark:bg-neutral-800/60">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">User</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Date</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Check-in</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Matched?</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Captured Image</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">

                            {filtered.map((log) => (
                                <tr key={log.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition">

                                    {/* USER */}
                                    <td className="px-4 py-4 font-medium text-neutral-900 dark:text-white">
                                        {log.user.name}
                                        <div className="text-sm text-neutral-500">{log.user.email}</div>
                                    </td>

                                    {/* DATE */}
                                    <td className="px-4 py-4 text-neutral-700 dark:text-neutral-300">
                                        {log.date}
                                    </td>

                                    {/* CHECK-IN */}
                                    <td className="px-4 py-4 text-neutral-700 dark:text-neutral-300">
                                        {log.check_in_time || "—"}
                                    </td>

                                    {/* MATCHED STATUS */}
                                    <td className="px-4 py-4">
                                        {log.is_face_matched ? (
                                            <span className="text-green-600 dark:text-green-400 flex items-center gap-2">
                                                <CheckCircle className="h-5 w-5" /> Yes
                                            </span>
                                        ) : (
                                            <span className="text-red-600 dark:text-red-400 flex items-center gap-2">
                                                <XCircle className="h-5 w-5" /> No
                                            </span>
                                        )}
                                    </td>

                                    {/* IMAGE */}
                                    <td className="px-4 py-4">
                                        {log.check_in_image ? (
                                            <img
                                                src={`/storage/${log.check_in_image}`}
                                                className="w-16 h-16 rounded-lg object-cover shadow"
                                            />
                                        ) : (
                                            <span className="text-neutral-400">—</span>
                                        )}
                                    </td>

                                </tr>
                            ))}

                            {filtered.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="py-6 text-center text-neutral-500 dark:text-neutral-400"
                                    >
                                        No logs found.
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

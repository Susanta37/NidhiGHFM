import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Activity, Users, Settings, User } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer, XAxis } from 'recharts';
import KpiCard from '@/components/KpiCard';
import { useState } from 'react';
import Modal from "@/components/Modal";


interface DashboardProps {
    kpi: any;
    roles: any;
    userGraph: any[];
    attendance: any[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Super Admin Dashboard", href: "/super-admin/dashboard" },
];

export default function SuperAdminDashboard({ kpi, roles, userGraph, attendance }: DashboardProps) {

    // ✅ HOOKS MUST BE INSIDE COMPONENT
    const [viewModal, setViewModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState<any>(null);

    const openModal = (row: any) => {
        setSelectedRow(row);
        setViewModal(true);
    };

    const closeModal = () => {
        setViewModal(false);
        setSelectedRow(null);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Super Admin Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6 bg-neutral-50 dark:bg-neutral-950">

                {/* ================= KPI Cards ================= */}
                <div className="grid gap-6 md:grid-cols-4">
                    <KpiCard title="Total Users" value={kpi.total_users} change="+12.5%" icon={Users} color="from-purple-500 to-indigo-600" />

                    <KpiCard title="Active Sessions" value={kpi.active_today} change="+5.2%" icon={Activity} color="from-cyan-500 to-blue-600" />

                    <KpiCard title="System Health" value={kpi.system_health + '%'} change="+1.2%" icon={Settings} color="from-pink-500 to-rose-600" />

                    <KpiCard title="Total Present" value={kpi.present_today} change="+1.2%" icon={User} color="from-orange-500 to-orange-600" />
                </div>

                {/* ================= HRIS Overview ================= */}
                <div className="col-span-4 rounded-xl border dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white border-b pb-2 mb-6">
                        HRIS Overview
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

                        <div className="relative overflow-hidden rounded-xl p-5 shadow-md bg-gradient-to-br from-purple-500/10 to-purple-700/10 border border-purple-500/20">
                            <p className="text-sm font-medium text-purple-700 dark:text-purple-300">HR</p>
                            <h2 className="text-3xl font-bold text-purple-900 dark:text-purple-100 mt-2">{roles.hr}</h2>
                        </div>

                        <div className="relative overflow-hidden rounded-xl p-5 shadow-md bg-gradient-to-br from-cyan-500/10 to-cyan-700/10 border border-cyan-500/20">
                            <p className="text-sm font-medium text-cyan-700 dark:text-cyan-300">Site Manager</p>
                            <h2 className="text-3xl font-bold text-cyan-900 dark:text-cyan-100 mt-2">{roles.sitemanager}</h2>
                        </div>

                        <div className="relative overflow-hidden rounded-xl p-5 shadow-md bg-gradient-to-br from-emerald-500/10 to-emerald-700/10 border border-emerald-500/20">
                            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Supervisors</p>
                            <h2 className="text-3xl font-bold text-emerald-900 dark:text-emerald-100 mt-2">{roles.supervisor}</h2>
                        </div>

                        <div className="relative overflow-hidden rounded-xl p-5 shadow-md bg-gradient-to-br from-orange-500/10 to-orange-700/10 border border-orange-500/20">
                            <p className="text-sm font-medium text-orange-700 dark:text-orange-300">Field Staff</p>
                            <h2 className="text-3xl font-bold text-orange-900 dark:text-orange-100 mt-2">{roles.fieldstaff}</h2>
                        </div>

                    </div>
                </div>

                {/* ================= User Growth Chart ================= */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="col-span-2 rounded-xl border bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Work Growth Analytics</h3>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">New user trends</p>
                        </div>

                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={userGraph}>
                                    <XAxis dataKey="date" />
                                    <Area dataKey="total" stroke="#8b5cf6" fill="#8b5cf622" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* ================= Recent Activity (Static) ================= */}
                    <div className="rounded-xl border bg-white dark:bg-neutral-900 p-6 shadow-sm dark:border-neutral-800">
                        <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-white">Recent Activity</h3>

                        <div className="relative">
                            <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-neutral-200 dark:bg-neutral-700" />

                            <div className="space-y-6">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="pl-10 relative flex flex-col gap-1">
                                        <div className="absolute left-3 top-1.5 h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />

                                        <p className="text-sm font-medium text-neutral-800 dark:text-neutral-100">
                                            New user registered
                                        </p>
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                            Few minutes ago
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

                {/* ================= Attendance Table ================= */}
                <div className="col-span-3 rounded-xl border bg-white dark:bg-neutral-900 shadow-sm p-6 dark:border-neutral-800">
                    <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white">
                        Attendance Records
                    </h3>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
                            <thead className="bg-neutral-100 dark:bg-neutral-800/50">
                                <tr>
                                    {[
                                        "User",
                                        "Check In",
                                        "Check-In Photo",
                                        "Check Out",
                                        "Checkout Photo",
                                        "Hours",
                                        "Overtime",
                                        "Status",
                                        "Actions"
                                    ].map((head) => (
                                        <th
                                            key={head}
                                            className="px-4 py-3 text-left text-xs font-semibold text-neutral-600 dark:text-neutral-300 uppercase"
                                        >
                                            {head}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                                {attendance.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40">

                                        <td className="px-4 py-3 text-sm">{row.user}</td>

                                        <td className="px-4 py-3 text-sm">{row.check_in ?? "-"}</td>

                                        <td className="px-4 py-3">
                                            {row.checkin_photo ? (
                                                <img src={row.checkin_photo} className="h-10 w-10 rounded-lg object-cover" />
                                            ) : "—"}
                                        </td>

                                        <td className="px-4 py-3 text-sm">{row.check_out ?? "-"}</td>

                                        <td className="px-4 py-3">
                                            {row.checkout_photo ? (
                                                <img src={row.checkout_photo} className="h-10 w-10 rounded-lg object-cover" />
                                            ) : "—"}
                                        </td>

                                        <td className="px-4 py-3 text-sm">{row.hours ?? 0} hrs</td>

                                        <td className="px-4 py-3 text-sm">{row.overtime ?? 0} hrs</td>

                                        <td className="px-4 py-3">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium 
                                                    ${
                                                        row.status === "present" 
                                                        ? "bg-emerald-500/20 text-emerald-700"
                                                        : row.status === "late"
                                                        ? "bg-orange-500/20 text-orange-700"
                                                        : "bg-red-500/20 text-red-700"
                                                    }
                                                `}
                                            >
                                                {row.status.toUpperCase()}
                                            </span>
                                        </td>

                                        <td>
                                            <button
                                                onClick={() => openModal(row)}
                                                className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600"
                                            >
                                                View
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            {/* ================= VIEW MODAL ================= */}
            <Modal show={viewModal} onClose={closeModal} title="Attendance Details">
                {selectedRow && (
                    <div className="space-y-6">

                        {/* User Header */}
                        <div>
                            <p className="text-xl font-semibold">{selectedRow.user}</p>
                            <p className="text-sm text-neutral-500">{selectedRow.status?.toUpperCase()}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {/* Check-In */}
                            <div>
                                <h3 className="font-medium text-neutral-700 dark:text-neutral-300">Check-In</h3>
                                <p className="text-lg font-semibold">{selectedRow.check_in ?? "-"}</p>

                                {selectedRow.checkin_photo && (
                                    <img
                                        src={selectedRow.checkin_photo}
                                        className="h-28 w-28 rounded-lg object-cover mt-3 border"
                                    />
                                )}

                                {selectedRow.check_in_lat && (
                                    <a
                                        href={`https://www.google.com/maps?q=${selectedRow.check_in_lat},${selectedRow.check_in_lng}`}
                                        target="_blank"
                                        className="text-blue-500 text-xs mt-2 block"
                                    >
                                        View Check-in Location ↗
                                    </a>
                                )}
                            </div>

                            {/* Check-Out */}
                            <div>
                                <h3 className="font-medium text-neutral-700 dark:text-neutral-300">Check-Out</h3>
                                <p className="text-lg font-semibold">{selectedRow.check_out ?? "-"}</p>

                                {selectedRow.checkout_photo && (
                                    <img
                                        src={selectedRow.checkout_photo}
                                        className="h-28 w-28 rounded-lg object-cover mt-3 border"
                                    />
                                )}

                                {selectedRow.check_out_lat && (
                                    <a
                                        href={`https://www.google.com/maps?q=${selectedRow.check_out_lat},${selectedRow.check_out_lng}`}
                                        target="_blank"
                                        className="text-blue-500 text-xs mt-2 block"
                                    >
                                        View Checkout Location ↗
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t">

                            <div>
                                <p className="text-sm text-neutral-600 dark:text-neutral-300">Worked Hours</p>
                                <p className="text-lg font-semibold">{selectedRow.hours ?? 0} hrs</p>
                            </div>

                            <div>
                                <p className="text-sm text-neutral-600 dark:text-neutral-300">Overtime</p>
                                <p className="text-lg font-semibold">{selectedRow.overtime ?? 0} hrs</p>
                            </div>

                            <div>
                                <p className="text-sm text-neutral-600 dark:text-neutral-300">Face Match</p>
                                <p className="text-lg font-semibold">
                                    {selectedRow.face_match ? "Matched ✓" : "Not Matched ✗"}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-neutral-600 dark:text-neutral-300">Submitted By</p>
                                <p className="text-lg font-semibold">{selectedRow.submitted_by ?? "—"}</p>
                            </div>
                        </div>

                        {/* Notes */}
                        {selectedRow.notes && (
                            <div>
                                <p className="text-sm text-neutral-600 dark:text-neutral-300">Notes</p>
                                <p className="text-sm mt-1">{selectedRow.notes}</p>
                            </div>
                        )}
                    </div>
                )}
            </Modal>


        </AppLayout>
    );
}

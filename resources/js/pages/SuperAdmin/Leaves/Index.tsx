import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import { SetStateAction, useState } from "react";
import { FileText, CheckCircle, XCircle, Calendar } from "lucide-react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import KpiCard from "@/components/KpiCard";
import FilterBar from "@/components/FilterBar";
import Modal from "@/components/Modal";
import DynamicFilterBar from "@/components/DynamicFilterBar";

interface Props {
    requests: any[];
    leaveTypes: any[];
}

export default function LeaveRequestsPage({ requests, leaveTypes }: Props) {

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [type, setType] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");

    const [selected, setSelected] = useState<any>(null);

    /** ============================
     *  FILTER LOGIC
     * ============================ */
    const filtered = requests.filter((req) => {
        const matchSearch =
            req.user.name.toLowerCase().includes(search.toLowerCase()) ||
            req.user.email.toLowerCase().includes(search.toLowerCase());

        const matchStatus = status ? req.status === status : true;

        const matchType = type ? req.leave_type_id == type : true;

        const matchDateFrom = dateFrom ? req.start_date >= dateFrom : true;
        const matchDateTo = dateTo ? req.end_date <= dateTo : true;

        return matchSearch && matchStatus && matchType && matchDateFrom && matchDateTo;
    });

    /** ============================
     *  KPI COUNTS
     * ============================ */
    const total = requests.length;
    const pending = requests.filter((r) => r.status === "pending").length;
    const approved = requests.filter((r) => r.status === "approved").length;

    const approve = (id: number) =>
        router.post(`/super-admin/leaves/${id}/approve`, {}, { preserveScroll: true });

    const reject = (id: number) =>
        router.post(`/super-admin/leaves/${id}/reject`, {}, { preserveScroll: true });

    return (
        <AppLayout>
            <Head title="Leave Requests" />

            <div className="p-6 bg-neutral-50 dark:bg-neutral-950 min-h-screen">

                {/* ===================== PAGE TITLE ======================== */}
                <h1 className="text-2xl font-semibold mb-8 flex items-center gap-2 text-neutral-900 dark:text-white">
                    <FileText className="h-6 w-6" /> Leave Requests
                </h1>

                {/* ===================== KPI CARDS ======================== */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <KpiCard
                        title="Total Requests"
                        value={total}
                        change="+1.8%"
                        ctitle="Activity"
                        icon={FileText}
                        color="from-purple-500 to-indigo-600"
                    />

                    <KpiCard
                        title="Pending"
                        value={pending}
                        change="+3.1%"
                        ctitle="Waiting approval"
                        icon={Calendar}
                        color="from-yellow-500 to-orange-500"
                    />

                    <KpiCard
                        title="Approved"
                        value={approved}
                        change="+6%"
                        ctitle="Confirmed leaves"
                        icon={CheckCircle}
                        color="from-green-500 to-emerald-600"
                    />
                </div>

                {/* ===================== FILTER BAR ======================== */}
                <DynamicFilterBar
    filters={[
        { key: "search", label: "Search Employee", type: "text", icon: "search" },
        { key: "status", label: "Status", type: "select", options: [
            { label: "All", value: "" },
            { label: "Pending", value: "pending" },
            { label: "Approved", value: "approved" },
            { label: "Rejected", value: "rejected" },
        ]},
        { key: "type", label: "Leave Type", type: "select",
          options: leaveTypes.map(t => ({ label: t.name, value: t.id })) },
        { key: "from", label: "Start Date", type: "date" },
        { key: "to", label: "End Date", type: "date" },
    ]}
    values={{ search, status, type, from: dateFrom, to: dateTo }}
    onChange={(key: string, value: SetStateAction<string>) => {
        if (key === "search") setSearch(value);
        if (key === "status") setStatus(value);
        if (key === "type") setType(value);
        if (key === "from") setDateFrom(value);
        if (key === "to") setDateTo(value);
    }}
/>


                {/* ===================== TABLE ======================== */}
                <div className="bg-white dark:bg-neutral-900 rounded-xl border dark:border-neutral-800 shadow-sm p-6 overflow-x-auto">

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-56">Employee</TableHead>
                                <TableHead className="w-40">Leave Type</TableHead>
                                <TableHead className="w-52">Dates</TableHead>
                                <TableHead className="w-32">Status</TableHead>
                                <TableHead className="text-right w-40">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {filtered.map((req) => (
                                <TableRow key={req.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40">

                                    {/* Employee */}
                                    <TableCell>
                                        <div className="font-medium text-neutral-900 dark:text-white">
                                            {req.user.name}
                                        </div>
                                        <div className="text-xs text-neutral-500">
                                            {req.user.email}
                                        </div>
                                    </TableCell>

                                    {/* Type */}
                                    <TableCell className="text-neutral-700 dark:text-neutral-300">
                                        {req.type?.name}
                                    </TableCell>

                                    {/* Dates */}
                                    <TableCell className="text-sm text-neutral-700 dark:text-neutral-300">
                                        {req.start_date} → {req.end_date}
                                    </TableCell>

                                    {/* Status */}
                                    <TableCell>
                                        {req.status === "pending" && (
                                            <span className="px-3 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-600">
                                                Pending
                                            </span>
                                        )}
                                        {req.status === "approved" && (
                                            <span className="px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-600">
                                                Approved
                                            </span>
                                        )}
                                        {req.status === "rejected" && (
                                            <span className="px-3 py-1 text-xs rounded-full bg-red-500/20 text-red-600">
                                                Rejected
                                            </span>
                                        )}
                                    </TableCell>

                                    {/* Actions */}
                                    <TableCell className="text-right">
                                        {req.status === "pending" ? (
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => approve(req.id)}
                                                    className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-1 text-sm"
                                                >
                                                    <CheckCircle className="w-4 h-4" /> Approve
                                                </button>

                                                <button
                                                    onClick={() => reject(req.id)}
                                                    className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-1 text-sm"
                                                >
                                                    <XCircle className="w-4 h-4" /> Reject
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                className="px-3 py-1 bg-neutral-700 text-white rounded-lg text-xs hover:bg-neutral-800"
                                                onClick={() => setSelected(req)}
                                            >
                                                View Details
                                            </button>
                                        )}
                                    </TableCell>

                                </TableRow>
                            ))}

                            {filtered.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="text-center py-6 text-neutral-500"
                                    >
                                        No matching leave requests.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>



                {/* ===================== MODAL ======================== */}
                <Modal
                    show={!!selected}
                    onClose={() => setSelected(null)}
                    title="Leave Request Details"
                >
                    {selected && (
                        <div className="space-y-4 text-neutral-700 dark:text-neutral-300">
                            <p><b>Employee:</b> {selected.user.name}</p>
                            <p><b>Email:</b> {selected.user.email}</p>
                            <p><b>Type:</b> {selected.type?.name}</p>
                            <p><b>Reason:</b> {selected.reason}</p>
                            <p><b>Dates:</b> {selected.start_date} → {selected.end_date}</p>

                            <p><b>Status:</b> {selected.status}</p>
                            {selected.status !== "pending" && (
                                <p><b>Processed By:</b> {selected.approver?.name}</p>
                            )}
                        </div>
                    )}
                </Modal>

            </div>
        </AppLayout>
    );
}

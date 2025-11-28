import AppLayout from "@/layouts/app-layout";
import { Head, Link, router } from "@inertiajs/react";
import { useState, useMemo } from "react";

import { FileText, AlertCircle, CheckCircle } from "lucide-react";

import KpiCard from "@/components/KpiCard";
import Modal from "@/components/Modal";
import DynamicFilterBar from "@/components/DynamicFilterBar";

// ShadCN UI table
import {
    Table,
    TableHeader,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
} from "@/components/ui/table";

/* ---------------- TYPES ---------------- */
interface User {
    id: number;
    name: string;
    email: string;
}

interface ComplianceRecord {
    id: number;
    user: User | null;
    certificate_type: string;
    file_path: string;
    expiry_date: string;
    status: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    records: {
        data: ComplianceRecord[];
        total: number;
        links: PaginationLink[];
    };
    filters: any;
    types: string[];
}

export default function CompliancePage({ records, filters, types }: Props) {
    /* ---------------- STATE ---------------- */
    const [viewFile, setViewFile] = useState<ComplianceRecord | null>(null);

    const [filterValues, setFilterValues] = useState({
        search: filters.search ?? "",
        status: filters.status ?? "",
        certificate_type: filters.certificate_type ?? "",
        from: filters.from ?? "",
        to: filters.to ?? "",
    });

    const onFilterChange = (key: string, value: string) => {
        setFilterValues((prev) => ({ ...prev, [key]: value }));
    };

    const data = records?.data ?? [];
    const isPdf = (file: string) => file.toLowerCase().endsWith(".pdf");

    /* ---------------- FILTER LOGIC ---------------- */
    const filtered = useMemo(() => {
        return data.filter((rec) => {
            const s = filterValues.search.toLowerCase();

            const matchSearch =
                rec.user?.name?.toLowerCase().includes(s) ||
                rec.user?.email?.toLowerCase().includes(s) ||
                rec.certificate_type.toLowerCase().includes(s);

            const matchStatus = filterValues.status
                ? rec.status === filterValues.status
                : true;

            const matchType = filterValues.certificate_type
                ? rec.certificate_type === filterValues.certificate_type
                : true;

            const matchFrom = filterValues.from
                ? rec.expiry_date >= filterValues.from
                : true;

            const matchTo = filterValues.to
                ? rec.expiry_date <= filterValues.to
                : true;

            return matchSearch && matchStatus && matchType && matchFrom && matchTo;
        });
    }, [filterValues, data]);

    /* ---------------- KPI ---------------- */
    const total = records.total ?? 0;
    const pending = data.filter((r) => r.status === "pending").length;
    const verified = data.filter((r) => r.status === "verified").length;

    /* ---------------- FILTER CONFIG ---------------- */
    const filterConfig = [
        { key: "search", label: "Search", type: "text", icon: "search", placeholder: "Search name, email or type..." },

        {
            key: "status",
            label: "Status",
            type: "select",
            options: [
                { label: "All", value: "" },
                { label: "Pending", value: "pending" },
                { label: "Verified", value: "verified" },
            ],
        },

        {
            key: "certificate_type",
            label: "Certificate Type",
            type: "select",
            options: [
                { label: "All", value: "" },
                ...types.map((t) => ({ label: t, value: t })),
            ],
        },

        { key: "from", label: "Expiry From", type: "date" },
        { key: "to", label: "Expiry To", type: "date" },
    ];

    /* ---------------- VIEW ---------------- */
    return (
        <AppLayout>
            <Head title="Compliance Records" />

            <div className="p-6 min-h-screen bg-neutral-50 dark:bg-neutral-950">
                <h1 className="text-2xl font-semibold mb-8 flex items-center gap-2">
                    <FileText className="w-6 h-6" />
                    Compliance Records
                </h1>

                {/* KPI CARDS */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <KpiCard
                        title="Total Records"
                        value={total}
                        icon={FileText}
                        color="from-blue-500 to-sky-600"
                    />

                    <KpiCard
                        title="Pending"
                        value={pending}
                        icon={AlertCircle}
                        color="from-yellow-500 to-orange-600"
                    />

                    <KpiCard
                        title="Verified"
                        value={verified}
                        icon={CheckCircle}
                        color="from-green-500 to-emerald-600"
                    />
                </div>

                {/* FILTER BAR */}
                <DynamicFilterBar
                    filters={filterConfig}
                    values={filterValues}
                    onChange={onFilterChange}
                />

                {/* TABLE */}
                <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border dark:border-neutral-800 overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Employee</TableHead>
                                <TableHead>Certificate</TableHead>
                                <TableHead>Expiry</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {filtered.map((rec) => (
                                <TableRow key={rec.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40">

                                    <TableCell>
                                        <div>{rec.user?.name}</div>
                                        <div className="text-sm text-neutral-500">{rec.user?.email}</div>
                                    </TableCell>

                                    <TableCell>{rec.certificate_type}</TableCell>
                                    <TableCell>{rec.expiry_date}</TableCell>

                                    <TableCell>
                                        {rec.status === "pending" && (
                                            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-600 rounded-full text-xs">
                                                Pending
                                            </span>
                                        )}
                                        {rec.status === "verified" && (
                                            <span className="px-3 py-1 bg-green-500/20 text-green-600 rounded-full text-xs">
                                                Verified
                                            </span>
                                        )}
                                    </TableCell>

                                    <TableCell className="text-right space-x-3">
                                        <button
                                            className="text-blue-600 hover:underline"
                                            onClick={() => setViewFile(rec)}
                                        >
                                            Preview
                                        </button>

                                        <button
                                            className="text-red-600 hover:underline"
                                            onClick={() =>
                                                router.delete(`/super-admin/compliance/${rec.id}`)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {filtered.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="py-6 text-center text-neutral-500">
                                        No matching records.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {/* PAGINATION */}
                    <div className="mt-6 flex justify-center gap-2">
                        {(records.links ?? []).map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || "#"}
                                className={`px-3 py-1 rounded ${
                                    link.active
                                        ? "bg-blue-600 text-white"
                                        : "bg-neutral-200 dark:bg-neutral-800"
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>

                {/* MODAL PREVIEW */}
                <Modal show={!!viewFile} onClose={() => setViewFile(null)} title="Document Preview">
                    {viewFile && (
                        <div className="p-4">
                            {isPdf(viewFile.file_path) ? (
                                <iframe
                                    src={`/storage/${viewFile.file_path}`}
                                    className="w-full h-[75vh] rounded-lg shadow"
                                />
                            ) : (
                                <img
                                    src={`/storage/${viewFile.file_path}`}
                                    className="w-full rounded-lg shadow"
                                />
                            )}
                        </div>
                    )}
                </Modal>
            </div>
        </AppLayout>
    );
}

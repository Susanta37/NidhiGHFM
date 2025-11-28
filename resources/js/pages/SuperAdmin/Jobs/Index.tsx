import AppLayout from "@/layouts/app-layout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "@/components/Modal";
import KpiCard from "@/components/KpiCard";
import DynamicFilterBar from "@/components/DynamicFilterBar";

import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

import {
    Pagination, PaginationContent, PaginationItem, PaginationLink,
    PaginationPrevious, PaginationNext,
} from "@/components/ui/pagination";

import { Briefcase, Plus, Edit3, Trash2 } from "lucide-react";

interface Props {
    jobs: any;
    sites: any;
    filters: any;
    kpi: {
        total: number;
        sites: number;
        highBilling: number;
    };
}

export default function JobIndex({ jobs, sites, filters, kpi }: Props) {
    const [showCreate, setShowCreate] = useState(false);
    const [editing, setEditing] = useState<any>(null);
    const [deleting, setDeleting] = useState<any>(null);

    const [filterValues, setFilterValues] = useState({
        search: filters.search || "",
        site_id: filters.site_id || "",
    });

    const handleFilter = (key: string, value: string) => {
        const updated = { ...filterValues, [key]: value };
        setFilterValues(updated);
        router.get("/super-admin/jobs", updated, { preserveScroll: true });
    };

    // Create form
    const [form, setForm] = useState({
        site_id: "",
        title: "",
        description: "",
        frequency: "",
        billing_rate: "",
    });

    return (
        <AppLayout>
            <Head title="Job List" />

            <div className="p-6 bg-neutral-50 min-h-screen dark:bg-neutral-950">
                
                <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                    <Briefcase className="h-6 w-6" /> Job List
                </h1>

                {/* KPI Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <KpiCard title="Total Jobs" value={kpi.total} icon={Briefcase} color="from-blue-500 to-sky-600" />
                    <KpiCard title="Sites Covered" value={kpi.sites} icon={Briefcase} color="from-purple-500 to-indigo-600" />
                    <KpiCard title="High Billing Jobs" value={kpi.highBilling} icon={Briefcase} color="from-green-500 to-emerald-600" />
                </div>

                {/* Filters */}
                <DynamicFilterBar
                    filters={[
                        {
                            key: "search",
                            label: "Search Job",
                            type: "text",
                            icon: "search",
                            placeholder: "Search by title...",
                        },
                        {
                            key: "site_id",
                            label: "Site",
                            type: "select",
                            options: [
                                { label: "All Sites", value: "" },
                                ...sites.map((s: any) => ({
                                    label: s.site_name,
                                    value: s.id,
                                })),
                            ],
                        },
                    ]}
                    values={filterValues}
                    onChange={handleFilter}
                />

                <div className="flex justify-end mb-4">
                    <Button className="bg-blue-600 text-white" onClick={() => setShowCreate(true)}>
                        <Plus className="w-4 h-4 mr-1" /> Add Job
                    </Button>
                </div>

                {/* TABLE */}
                <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border dark:border-neutral-800">

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Site</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Frequency</TableHead>
                                <TableHead>Billing Rate</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {jobs.data.map((job: any, index: number) => (
                                <TableRow key={job.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{job.site?.site_name || "N/A"}</TableCell>
                                    <TableCell className="font-semibold">{job.title}</TableCell>
                                    <TableCell>{job.frequency}</TableCell>
                                    <TableCell>₹{job.billing_rate}</TableCell>

                                    <TableCell className="flex justify-end gap-3 text-right">
                                        <button className="text-blue-600 flex items-center gap-1 hover:underline"
                                            onClick={() => setEditing(job)}>
                                            <Edit3 className="h-4 w-4" /> Edit
                                        </button>

                                        <button className="text-red-600 flex items-center gap-1 hover:underline"
                                            onClick={() => setDeleting(job)}>
                                            <Trash2 className="h-4 w-4" /> Delete
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>

                    {/* Pagination */}
                    <div className="mt-6 flex justify-center">
                        <Pagination>
                            <PaginationContent>
                                
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (jobs.prev_page_url) router.get(jobs.prev_page_url);
                                        }}
                                    />
                                </PaginationItem>

                                {Array.from({ length: jobs.last_page }, (_, i) => i + 1).map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink isActive={page === jobs.current_page}>
                                            <Link href={`?page=${page}`} preserveScroll>{page}</Link>
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext>
                                        <Link href={jobs.next_page_url || "#"} preserveScroll />
                                    </PaginationNext>
                                </PaginationItem>

                            </PaginationContent>
                        </Pagination>
                    </div>

                </div>

                {/* CREATE MODAL */}
                {showCreate && (
                    <Modal show={showCreate} onClose={() => setShowCreate(false)} title="Add Job">
                        <div className="grid gap-4">
                            <select
                                className="border p-2 rounded"
                                value={form.site_id}
                                onChange={(e) => setForm({ ...form, site_id: e.target.value })}
                            >
                                <option value="">Select Site</option>
                                {sites.map((s: any) => (
                                    <option key={s.id} value={s.id}>{s.site_name}</option>
                                ))}
                            </select>

                            <Input placeholder="Job Title" value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })} />

                            <Input placeholder="Description" value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })} />

                            <Input placeholder="Frequency (Daily/Weekly/...)" value={form.frequency}
                                onChange={(e) => setForm({ ...form, frequency: e.target.value })} />

                            <Input placeholder="Billing Rate" value={form.billing_rate}
                                onChange={(e) => setForm({ ...form, billing_rate: e.target.value })} />

                            <Button className="bg-blue-600 text-white"
                                onClick={() =>
                                    router.post("/super-admin/jobs", form, {
                                        onSuccess: () => {
                                            setShowCreate(false);
                                            setForm({ site_id: "", title: "", description: "", frequency: "", billing_rate: "" });
                                        }
                                    })
                                }>
                                Save Job
                            </Button>
                        </div>
                    </Modal>
                )}

                {/* EDIT MODAL */}
                {editing && (
                    <Modal show={!!editing} onClose={() => setEditing(null)} title="Edit Job">
                        <div className="grid gap-4">
                            <select
                                className="border p-2 rounded"
                                value={editing.site_id}
                                onChange={(e) => setEditing({ ...editing, site_id: e.target.value })}
                            >
                                <option value="">Select Site</option>
                                {sites.map((s: any) => (
                                    <option key={s.id} value={s.id}>{s.site_name}</option>
                                ))}
                            </select>

                            <Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
                            <Input value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
                            <Input value={editing.frequency} onChange={(e) => setEditing({ ...editing, frequency: e.target.value })} />
                            <Input value={editing.billing_rate} onChange={(e) => setEditing({ ...editing, billing_rate: e.target.value })} />

                            <Button className="bg-blue-600 text-white"
                                onClick={() =>
                                    router.put(`/super-admin/jobs/${editing.id}`, editing, {
                                        onSuccess: () => setEditing(null)
                                    })
                                }>
                                Save Changes
                            </Button>
                        </div>
                    </Modal>
                )}

                {/* DELETE MODAL */}
                {deleting && (
                    <Modal show={!!deleting} onClose={() => setDeleting(null)} title="Delete Job">
                        <p className="mb-4">Are you sure you want to delete <strong>{deleting.title}</strong>?</p>

                        <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setDeleting(null)}>Cancel</Button>
                            <Button className="bg-red-600 text-white"
                                onClick={() =>
                                    router.delete(`/super-admin/jobs/${deleting.id}`, {
                                        onSuccess: () => setDeleting(null)
                                    })
                                }>
                                Delete
                            </Button>
                        </div>
                    </Modal>
                )}

            </div>
        </AppLayout>
    );
}

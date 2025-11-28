"use client";

import AppLayout from "@/layouts/app-layout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

import Modal from "@/components/Modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import KpiCard from "@/components/KpiCard";
import DynamicFilterBar from "@/components/DynamicFilterBar";

import {
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableHead,
    TableHeader,
} from "@/components/ui/table";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationLink,
} from "@/components/ui/pagination";

import {
    Building2,
    Plus,
    Edit3,
    Trash2,
    Phone,
    UserRound,
    Mail,
} from "lucide-react";

interface Props {
    clients: any;
    filters: any;
    kpi: {
        total: number;
        active: number;
        inactive: number;
    };
}

export default function ClientIndex({ clients, filters, kpi }: Props) {
    const [showCreate, setShowCreate] = useState(false);
    const [editing, setEditing] = useState<any>(null);
    const [deleting, setDeleting] = useState<any>(null);

    const [filterValues, setFilterValues] = useState({
        search: filters.search || "",
        status: filters.status || "",
    });

    const handleFilter = (key: string, value: string) => {
        setFilterValues({ ...filterValues, [key]: value });
        router.get("/super-admin/clients", { ...filterValues, [key]: value }, { preserveScroll: true });
    };

    const [createForm, setCreateForm] = useState({
        name: "",
        address: "",
        contact_person: "",
        phone: "",
        email: "",
        gst_no: "",
        status: "1",
    });
    const [editForm, setEditForm] = useState({
    name: "",
    address: "",
    contact_person: "",
    phone: "",
    email: "",
    gst_no: "",
    status: "1",
});

    return (
        <AppLayout>
            <Head title="Clients" />

            <div className="p-6 min-h-screen bg-neutral-50 dark:bg-neutral-950">
                
                <h1 className="text-2xl font-semibold flex items-center gap-2 mb-6">
                    <Building2 className="h-6 w-6" /> Client Management
                </h1>

                {/* KPI CARDS */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <KpiCard title="Total Clients" value={kpi.total} icon={Building2} color="from-blue-500 to-sky-600" />
                    <KpiCard title="Active Clients" value={kpi.active} icon={UserRound} color="from-green-500 to-emerald-600" />
                    <KpiCard title="Inactive Clients" value={kpi.inactive} icon={Trash2} color="from-red-500 to-rose-600" />
                </div>

                {/* FILTERS */}
                <DynamicFilterBar
                    filters={[
                        {
                            key: "search",
                            label: "Search",
                            type: "text",
                            icon: "search",
                            placeholder: "Client name, contact person, phone...",
                        },
                        {
                            key: "status",
                            label: "Status",
                            type: "select",
                            options: [
                                { label: "All", value: "" },
                                { label: "Active", value: "1" },
                                { label: "Inactive", value: "0" },
                            ],
                        },
                    ]}
                    values={filterValues}
                    onChange={handleFilter}
                />

                {/* ADD CLIENT BUTTON */}
                <div className="flex justify-end mb-4">
                    <Button className="bg-blue-600 text-white" onClick={() => setShowCreate(true)}>
                        <Plus className="w-4 h-4 mr-1" /> Add Client
                    </Button>
                </div>

                {/* TABLE */}
                <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border dark:border-neutral-800">

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {clients.data.map((c: any, index: number) => (
                                <TableRow key={c.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className="font-medium">{c.name}</TableCell>
                                    <TableCell>{c.contact_person || "—"}</TableCell>
                                    <TableCell>{c.email || "—"}</TableCell>
                                    <TableCell>
                                        {c.status == 1 ? (
                                            <span className="text-green-600 font-semibold">Active</span>
                                        ) : (
                                            <span className="text-red-600">Inactive</span>
                                        )}
                                    </TableCell>

                                    <TableCell className="text-right flex justify-end gap-3">
                                        <button
                                            onClick={() => {
    setEditing(c);
    setEditForm({
        name: c.name || "",
        address: c.address || "",
        contact_person: c.contact_person || "",
        phone: c.phone || "",
        email: c.email || "",
        gst_no: c.gst_no || "",
        status: String(c.status),
    });
}}
                                            className="text-blue-600 flex items-center gap-1 hover:underline"
                                        >
                                            <Edit3 className="h-4 w-4" /> Edit
                                        </button>

                                        <button
                                            onClick={() => setDeleting(c)}
                                            className="text-red-600 flex items-center gap-1 hover:underline"
                                        >
                                            <Trash2 className="h-4 w-4" /> Delete
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* PAGINATION */}
                    <div className="mt-6 flex justify-center">
                        <Pagination>
                            <PaginationContent>

                                {/* Previous */}
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (clients.prev_page_url) {
                                                router.get(clients.prev_page_url);
                                            }
                                        }}
                                    />
                                </PaginationItem>

                                {/* Pages */}
                                {Array.from({ length: clients.last_page }, (_, i) => i + 1).map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink isActive={page === clients.current_page}>
                                            <Link href={`?page=${page}`} preserveScroll>{page}</Link>
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                {/* Next */}
                                <PaginationItem>
                                    <PaginationNext>
                                        <Link href={clients.next_page_url || "#"} preserveScroll />
                                    </PaginationNext>
                                </PaginationItem>

                            </PaginationContent>
                        </Pagination>
                    </div>

                </div>

                {/* CREATE MODAL */}
                {showCreate && (
                    <Modal show={showCreate} onClose={() => setShowCreate(false)} title="Add Client">
                        <div className="grid gap-4">

                            <Input placeholder="Client Name"
                                value={createForm.name}
                                onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                            />

                            <Input placeholder="Address"
                                value={createForm.address}
                                onChange={(e) => setCreateForm({ ...createForm, address: e.target.value })}
                            />

                            <Input placeholder="Contact Person"
                                value={createForm.contact_person}
                                onChange={(e) => setCreateForm({ ...createForm, contact_person: e.target.value })}
                            />

                            <Input placeholder="Phone"
                                value={createForm.phone}
                                onChange={(e) => setCreateForm({ ...createForm, phone: e.target.value })}
                            />

                            <Input placeholder="Email"
                                value={createForm.email}
                                onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                            />

                            <Input placeholder="GST No."
                                value={createForm.gst_no}
                                onChange={(e) => setCreateForm({ ...createForm, gst_no: e.target.value })}
                            />

                            <select
                                className="border rounded p-2 dark:bg-neutral-800"
                                value={createForm.status}
                                onChange={(e) => setCreateForm({ ...createForm, status: e.target.value })}
                            >
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </select>

                            <Button
                                className="bg-blue-600 text-white"
                                onClick={() =>
                                    router.post("/super-admin/clients", createForm, {
                                        onSuccess: () => {
                                            setShowCreate(false);
                                            setCreateForm({
                                                name: "",
                                                address: "",
                                                contact_person: "",
                                                phone: "",
                                                email: "",
                                                gst_no: "",
                                                status: "1",
                                            });
                                        }
                                    })
                                }
                            >
                                Save Client
                            </Button>

                        </div>
                    </Modal>
                )}
                {editing && (
    <Modal show={!!editing} onClose={() => setEditing(null)} title="Edit Client">
        <div className="grid gap-4">

            <Input
                placeholder="Client Name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            />

            <Input
                placeholder="Address"
                value={editForm.address}
                onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
            />

            <Input
                placeholder="Contact Person"
                value={editForm.contact_person}
                onChange={(e) => setEditForm({ ...editForm, contact_person: e.target.value })}
            />

            <Input
                placeholder="Phone"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
            />

            <Input
                placeholder="Email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
            />

            <Input
                placeholder="GST No."
                value={editForm.gst_no}
                onChange={(e) => setEditForm({ ...editForm, gst_no: e.target.value })}
            />

            <select
                className="border rounded p-2 dark:bg-neutral-800"
                value={editForm.status}
                onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
            >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
            </select>

            <Button
                className="bg-blue-600 text-white"
                onClick={() =>
                    router.put(`/super-admin/clients/${editing.id}`, editForm, {
                        onSuccess: () => setEditing(null),
                    })
                }
            >
                Update Client
            </Button>

        </div>
    </Modal>
)}


                {/* DELETE MODAL */}
                {deleting && (
                    <Modal show={!!deleting} onClose={() => setDeleting(null)} title="Delete Client">
                        <p className="mb-4">
                            Delete client: <strong>{deleting.name}</strong>?
                        </p>

                        <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setDeleting(null)}>Cancel</Button>

                            <Button
                                className="bg-red-600 text-white"
                                onClick={() =>
                                    router.delete(`/super-admin/clients/${deleting.id}`, {
                                        onSuccess: () => setDeleting(null),
                                    })
                                }
                            >
                                Delete
                            </Button>
                        </div>
                    </Modal>
                )}

            </div>
        </AppLayout>
    );
}

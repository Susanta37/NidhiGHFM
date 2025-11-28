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
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from "@/components/ui/pagination";

import {
    Building,
    Plus,
    Edit3,
    Trash2,
    MapPin,
    TrendingUp,
    Edit,
} from "lucide-react";

interface Props {
    sites: any;
    clients: any;
    filters: any;
    kpi: {
        total: number;
        active: number;
        clients: number;
    };
}

export default function SiteIndex({ sites, clients, filters, kpi }: Props) {
    const [showCreate, setShowCreate] = useState(false);
    const [editing, setEditing] = useState<any>(null);
    const [deleting, setDeleting] = useState<any>(null);

    const [filterValues, setFilterValues] = useState({
        search: filters.search || "",
        client_id: filters.client_id || "",
    });

    const handleFilter = (key: string, value: string) => {
        setFilterValues({ ...filterValues, [key]: value });
        router.get("/super-admin/sites", { ...filterValues, [key]: value }, { preserveScroll: true });
    };

    /* CREATE FORM STATE */
    const [createForm, setCreateForm] = useState({
        client_id: "",
        site_name: "",
        address: "",
        geo_lat: "",
        geo_lng: "",
    });

    return (
        <AppLayout>
            <Head title="Site Management" />

            <div className="p-6 min-h-screen bg-neutral-50 dark:bg-neutral-950">

                <h1 className="text-2xl font-semibold flex items-center gap-2 mb-6">
                    <Building className="h-6 w-6" /> Site Management
                </h1>

                {/* KPI CARDS */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <KpiCard title="Total Sites" value={kpi.total} icon={Building} color="from-blue-500 to-sky-600" />
                    <KpiCard title="Geo-Active Sites" value={kpi.active} icon={MapPin} color="from-green-500 to-emerald-600" />
                    <KpiCard title="Client Count" value={kpi.clients} icon={TrendingUp} color="from-purple-500 to-indigo-600" />
                </div>

                {/* Dynamic Filter Bar */}
                <DynamicFilterBar
                    filters={[
                        {
                            key: "search",
                            label: "Search Site",
                            type: "text",
                            icon: "search",
                            placeholder: "Search by name or address...",
                        },
                        {
                            key: "client_id",
                            label: "Client",
                            type: "select",
                            options: [
                                { label: "All Clients", value: "" },
                                ...clients.map((c: any) => ({
                                    label: c.name,
                                    value: c.id,
                                })),
                            ],
                        },
                    ]}
                    values={filterValues}
                    onChange={handleFilter}
                />

                {/* Add Site Button */}
                <div className="flex justify-end mb-4">
                    <Button
                        className="bg-blue-600 text-white"
                        onClick={() => setShowCreate(true)}
                    >
                        <Plus className="w-4 h-4 mr-1" /> Add Site
                    </Button>
                </div>

                {/* TABLE */}
                <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border dark:border-neutral-800">

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>SlNo.</TableHead>
                                <TableHead>Client</TableHead>
                                <TableHead>Site Name</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead>Latitude</TableHead>
                                <TableHead>Longitude</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {sites.data.map((s: any, index: number) => (
                                <TableRow key={s.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{s.client?.name ?? "N/A"}</TableCell>
                                    <TableCell>{s.site_name}</TableCell>
                                    <TableCell>{s.address}</TableCell>
                                    <TableCell>{s.geo_lat || "—"}</TableCell>
                                    <TableCell>{s.geo_lng || "—"}</TableCell>

                                    <TableCell className="text-right flex justify-end gap-3">
                                        <button className="text-blue-600 flex items-center gap-1 hover:underline"
                                            onClick={() => setEditing(s)}>
                                            <Edit className="h-4 w-4" /> Edit
                                        </button>

                                        <button className="text-red-600 flex items-center gap-1 hover:underline"
                                            onClick={() => setDeleting(s)}>
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
                                            if (sites.prev_page_url) {
                                                router.get(sites.prev_page_url);
                                            }
                                        }}
                                    />
                                </PaginationItem>

                                {Array.from({ length: sites.last_page }, (_, i) => i + 1).map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink isActive={page === sites.current_page}>
                                            <Link href={`?page=${page}`} preserveScroll>
                                                {page}
                                            </Link>
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext>
                                        <Link href={sites.next_page_url || "#"} preserveScroll />
                                    </PaginationNext>
                                </PaginationItem>

                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
{editing && (
    <Modal
        show={!!editing}
        onClose={() => setEditing(null)}
        title="Edit Site"
    >
        <div className="grid gap-4">

            {/* CLIENT */}
            <select
                className="border rounded p-2 dark:bg-neutral-800"
                value={editing.client_id}
                onChange={(e) =>
                    setEditing({ ...editing, client_id: e.target.value })
                }
            >
                <option value="">Select Client</option>
                {clients.map((c: any) => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}
            </select>

            {/* Site Name */}
            <Input
                placeholder="Site Name"
                value={editing.site_name}
                onChange={(e) =>
                    setEditing({ ...editing, site_name: e.target.value })
                }
            />

            {/* Address */}
            <Input
                placeholder="Address"
                value={editing.address}
                onChange={(e) =>
                    setEditing({ ...editing, address: e.target.value })
                }
            />

            {/* Latitude */}
            <Input
                placeholder="Latitude (-90 to +90)"
                value={editing.geo_lat || ""}
                onChange={(e) =>
                    setEditing({ ...editing, geo_lat: e.target.value })
                }
            />

            {/* Longitude */}
            <Input
                placeholder="Longitude (-180 to +180)"
                value={editing.geo_lng || ""}
                onChange={(e) =>
                    setEditing({ ...editing, geo_lng: e.target.value })
                }
            />

            {/* Save Button */}
            <Button
                className="bg-blue-600 text-white"
                onClick={() =>
                    router.put(`/super-admin/sites/${editing.id}`, {
                        client_id: editing.client_id,
                        site_name: editing.site_name,
                        address: editing.address,
                        geo_lat: editing.geo_lat || null,
                        geo_lng: editing.geo_lng || null,
                    }, {
                        onSuccess: () => setEditing(null)
                    })
                }
            >
                Save Changes
            </Button>

        </div>
    </Modal>
)}

                {/* CREATE MODAL */}
                {showCreate && (
                    <Modal show={showCreate} onClose={() => setShowCreate(false)} title="Add New Site">
                        <div className="grid gap-4">

                            <select
                                className="border rounded p-2 dark:bg-neutral-800"
                                value={createForm.client_id}
                                onChange={(e) => setCreateForm({ ...createForm, client_id: e.target.value })}
                            >
                                <option value="">Select Client</option>
                                {(clients ?? []).map((c: any) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>

                            <Input
                                placeholder="Site Name"
                                value={createForm.site_name}
                                onChange={(e) => setCreateForm({ ...createForm, site_name: e.target.value })}
                            />

                            <Input
                                placeholder="Address"
                                value={createForm.address}
                                onChange={(e) => setCreateForm({ ...createForm, address: e.target.value })}
                            />

                            <Input
                                placeholder="Latitude"
                                value={createForm.geo_lat}
                                onChange={(e) => setCreateForm({ ...createForm, geo_lat: e.target.value })}
                            />

                            <Input
                                placeholder="Longitude"
                                value={createForm.geo_lng}
                                onChange={(e) => setCreateForm({ ...createForm, geo_lng: e.target.value })}
                            />

                            <Button
                                className="bg-blue-600 text-white"
                                onClick={() =>
                                    router.post("/super-admin/sites", createForm, {
                                        onSuccess: () => {
                                            setShowCreate(false);
                                            setCreateForm({
                                                client_id: "",
                                                site_name: "",
                                                address: "",
                                                geo_lat: "",
                                                geo_lng: "",
                                            });
                                        }
                                    })
                                }
                            >
                                Save Site
                            </Button>

                        </div>
                    </Modal>
                )}

                {/* DELETE MODAL */}
                {deleting && (
                    <Modal show={!!deleting} onClose={() => setDeleting(null)} title="Delete Site">
                        <p className="mb-4">
                            Are you sure you want to delete
                            <strong> {deleting.site_name}</strong>?
                        </p>

                        <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setDeleting(null)}>Cancel</Button>

                            <Button
                                className="bg-red-600 text-white"
                                onClick={() =>
                                    router.delete(`/super-admin/sites/${deleting.id}`, {
                                        onSuccess: () => setDeleting(null)
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

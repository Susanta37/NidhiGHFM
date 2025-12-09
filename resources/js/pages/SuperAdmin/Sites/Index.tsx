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
import { BreadcrumbItem } from "@/types";

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
const breadcrumbs: BreadcrumbItem[] = [
  { title: "Site Management", href: "/super-admin/sites" },
];

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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Site Management" />

            <div className="p-6 min-h-screen bg-neutral-50 dark:bg-neutral-950">


                {/* KPI CARDS */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <KpiCard title="Total Sites" value={kpi.total} icon={Building} bgColorClass="bg-blue-500/10 dark:bg-blue-900/20 border-blue-500/50"
                iconColorClass="text-blue-600 dark:text-blue-400"
                color="from-blue-500 to-sky-600" />
                    <KpiCard title="Geo-Active Sites" value={kpi.active} icon={MapPin} bgColorClass="bg-green-500/10 dark:bg-green-900/20 border-green-500/50"
                iconColorClass="text-green-600 dark:text-green-400"
                color="from-green-500 to-emerald-600" />
                    <KpiCard title="Client Count" value={kpi.clients} icon={TrendingUp} bgColorClass="bg-purple-500/10 dark:bg-purple-900/20 border-purple-500/50"
                iconColorClass="text-purple-600 dark:text-purple-400"
                color="from-purple-500 to-indigo-600" />
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
                    actionSlot={
                        <Button
                            className="bg-blue-600 text-white"
                            onClick={() => setShowCreate(true)}
                        >
                            <Plus className="w-4 h-4 mr-1" /> Add Site
                        </Button>
                    }
                />


                {/* TABLE */}
                <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border mt-8 dark:border-neutral-800">

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
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                // Submitting the form data using the router.put method
                                router.put(`/super-admin/sites/${editing.id}`, {
                                    client_id: editing.client_id,
                                    site_name: editing.site_name,
                                    address: editing.address,
                                    geo_lat: editing.geo_lat || null,
                                    geo_lng: editing.geo_lng || null,
                                }, {
                                    onSuccess: () => setEditing(null)
                                });
                            }}
                            // Use a grid with better spacing for modern look
                            className="grid gap-5 grid-cols-1 sm:grid-cols-2"
                        >

                            {/* 1. CLIENT SELECT */}
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                                    Client <span className="text-red-500">*</span>
                                </label>
                                <select
                                    // Modern Select Styling: Matches the professional input style
                                    className="border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white 
                                            px-4 py-2.5 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 
                                            transition duration-150 shadow-sm appearance-none cursor-pointer"
                                    value={editing.client_id}
                                    onChange={(e) =>
                                        setEditing({ ...editing, client_id: e.target.value })
                                    }
                                    required
                                >
                                    <option value="" disabled>Select Client</option>
                                    {clients.map((c: any) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* 2. Site Name */}
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                                    Site Name <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    placeholder="e.g., Downtown Headquarters"
                                    value={editing.site_name}
                                    onChange={(e) =>
                                        setEditing({ ...editing, site_name: e.target.value })
                                    }
                                    required
                                />
                            </div>

                            {/* 3. Address */}
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                                    Full Address
                                </label>
                                <Input
                                    placeholder="123 Main St, City, Country"
                                    value={editing.address}
                                    onChange={(e) =>
                                        setEditing({ ...editing, address: e.target.value })
                                    }
                                />
                            </div>

                            {/* 4. Latitude (Half-width) */}
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                                    Latitude (Geo-tag)
                                </label>
                                <Input
                                    placeholder="e.g., 28.6139"
                                    value={editing.geo_lat || ""}
                                    onChange={(e) =>
                                        setEditing({ ...editing, geo_lat: e.target.value })
                                    }
                                />
                            </div>

                            {/* 5. Longitude (Half-width) */}
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                                    Longitude (Geo-tag)
                                </label>
                                <Input
                                    placeholder="e.g., 77.2090"
                                    value={editing.geo_lng || ""}
                                    onChange={(e) =>
                                        setEditing({ ...editing, geo_lng: e.target.value })
                                    }
                                />
                            </div>

                            {/* 6. ACTION BUTTONS (Separated and aligned) */}
                            <div className="sm:col-span-2 pt-4 flex justify-end gap-3">
                                {/* Cancel Button - Subtle secondary style */}
                                <button
                                    type="button"
                                    onClick={() => setEditing(null)}
                                    className="px-6 py-2.5 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition duration-150"
                                >
                                    Cancel
                                </button>
                                
                                {/* Save Button - Primary, professional look */}
                                <Button
                                    type="submit"
                                    // Professional Button Styling Suggestion (assuming Button component applies this):
                                    className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150"
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </Modal>
                    )}

                {/* CREATE MODAL */}
               {showCreate && (
                        <Modal show={showCreate} onClose={() => setShowCreate(false)} title="Add New Site">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
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
                                        },
                                    });
                                }}
                                // Use a grid with better spacing
                                className="grid gap-5 grid-cols-1 sm:grid-cols-2"
                            >
                                {/* 1. Select Client */}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                                        Client <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        // Modern Select Styling
                                        className="border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white 
                                                    px-4 py-2.5 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 
                                                    transition duration-150 shadow-sm appearance-none cursor-pointer"
                                        value={createForm.client_id}
                                        onChange={(e) => setCreateForm({ ...createForm, client_id: e.target.value })}
                                        required
                                    >
                                        <option value="" disabled>Select Client</option>
                                        {(clients ?? []).map((c: any) => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* 2. Site Name */}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                                        Site Name <span className="text-red-500">*</span>
                                    </label>
                                    {/* Assuming your Input component applies professional classes (like the ones used in the previous modal) */}
                                    <Input
                                        placeholder="e.g., Downtown Headquarters"
                                        // Suggestion for Input internal classes: 
                                        // "border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-4 py-2.5 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                        value={createForm.site_name}
                                        onChange={(e) => setCreateForm({ ...createForm, site_name: e.target.value })}
                                        required
                                    />
                                </div>

                                {/* 3. Address (Full-width) */}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                                        Full Address
                                    </label>
                                    <Input
                                        placeholder="123 Main St, City, Country"
                                        value={createForm.address}
                                        onChange={(e) => setCreateForm({ ...createForm, address: e.target.value })}
                                    />
                                </div>

                                {/* 4. Latitude (Half-width) */}
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                                        Latitude (Geo-tag)
                                    </label>
                                    <Input
                                        placeholder="e.g., 28.6139"
                                        value={createForm.geo_lat}
                                        onChange={(e) => setCreateForm({ ...createForm, geo_lat: e.target.value })}
                                    />
                                </div>

                                {/* 5. Longitude (Half-width) */}
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                                        Longitude (Geo-tag)
                                    </label>
                                    <Input
                                        placeholder="e.g., 77.2090"
                                        value={createForm.geo_lng}
                                        onChange={(e) => setCreateForm({ ...createForm, geo_lng: e.target.value })}
                                    />
                                </div>

                                {/* 6. Action Button (Full-width, clearly separated) */}
                                <div className="sm:col-span-2 pt-4 flex justify-end">
                                    {/* Assuming your Button component is a styled wrapper */}
                                    <Button
                                        type="submit"
                                        // Professional Button Styling Suggestion:
                                        className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150"
                                    >
                                        Save Site
                                    </Button>
                                </div>
                            </form>
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

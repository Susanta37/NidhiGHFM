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
import { BreadcrumbItem } from "@/types";

interface Props {
    clients: any;
    filters: any;
    kpi: {
        total: number;
        active: number;
        inactive: number;
    };
}
const breadcrumbs: BreadcrumbItem[] = [
  { title: "Client Management", href: "/super-admin/clients" },
];

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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clients" />

            <div className="p-6 min-h-screen bg-neutral-50 dark:bg-neutral-950">
               

                {/* KPI CARDS */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <KpiCard title="Total Clients" value={kpi.total} icon={Building2}  bgColorClass="bg-blue-500/10 dark:bg-blue-900/20 border-blue-500/50"
                // Icon: Solid blue
                iconColorClass="text-blue-600 dark:text-blue-400"
                // Hover: Smooth blue gradient
                color="from-blue-500 to-sky-600" />
                            <KpiCard title="Active Clients" value={kpi.active} icon={UserRound}  bgColorClass="bg-green-500/10 dark:bg-green-900/20 border-green-500/50"
                // Icon: Solid green
                iconColorClass="text-green-600 dark:text-green-400"
                // Hover: Smooth green gradient
                color="from-green-500 to-emerald-600" />
                            <KpiCard title="Inactive Clients" value={kpi.inactive} icon={Trash2}  bgColorClass="bg-red-500/10 dark:bg-red-900/20 border-red-500/50"
                // Icon: Solid red
                iconColorClass="text-red-600 dark:text-red-400"
                // Hover: Smooth red gradient
                color="from-red-500 to-rose-600" />
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
                   
                     actionSlot={
                        <button
                            onClick={() => setShowCreate(true)}
                            // Ensure button height matches the input field height (py-2.5)
                            className="bg-blue-600 text-white px-4 py-2.5 rounded-lg shadow-md hover:bg-blue-700 transition duration-150 w-full md:w-auto"
                        >
                            + Add client
                        </button>
                    }
                />

                {/* TABLE */}
                <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border mt-8 dark:border-neutral-800">

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Sl No.</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead>GST No.</TableHead>
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
                                    <TableCell>{c.address || "—"}</TableCell>
                                    <TableCell>{c.gst_no || "—"}</TableCell>
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
{/* CREATE CLIENT MODAL */}
{showCreate && (
    <Modal show={showCreate} onClose={() => setShowCreate(false)} title="Add New Client">
        <form
            onSubmit={(e) => {
                e.preventDefault();
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
                    },
                });
            }}
            className="space-y-8"
        >

            {/* ================= CLIENT INFO ================= */}
            <div className="border rounded-lg p-4 bg-neutral-50 dark:bg-neutral-800/40">
                <h3 className="section-title">Client Information</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                        placeholder="Client Name *"
                        value={createForm.name}
                        onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                    />

                    <Input
                        placeholder="Address"
                        value={createForm.address}
                        onChange={(e) => setCreateForm({ ...createForm, address: e.target.value })}
                    />
                </div>
            </div>

            {/* ================= CONTACT INFO ================= */}
            <div className="border rounded-lg p-4 bg-neutral-50 dark:bg-neutral-800/40">
                <h3 className="section-title">Primary Contact Details</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                        placeholder="Contact Person"
                        value={createForm.contact_person}
                        onChange={(e) => setCreateForm({ ...createForm, contact_person: e.target.value })}
                    />

                    <Input
                        placeholder="Phone Number"
                        value={createForm.phone}
                        onChange={(e) => setCreateForm({ ...createForm, phone: e.target.value })}
                    />

                    <Input
                        placeholder="Email"
                        value={createForm.email}
                        onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                    />
                </div>
            </div>

            {/* ================= BUSINESS DETAILS ================= */}
            <div className="border rounded-lg p-4 bg-neutral-50 dark:bg-neutral-800/40">
                <h3 className="section-title">Business Details</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                        placeholder="GST No."
                        value={createForm.gst_no}
                        onChange={(e) => setCreateForm({ ...createForm, gst_no: e.target.value })}
                    />

                    <select
                        value={createForm.status}
                        onChange={(e) => setCreateForm({ ...createForm, status: e.target.value })}
                        className="form-select"
                    >
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                    </select>
                </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
                <Button className="bg-blue-600 text-white" type="submit">Save Client</Button>
            </div>
        </form>
    </Modal>
)}

                {/* EDIT CLIENT MODAL */}
{editing && (
    <Modal show={!!editing} onClose={() => setEditing(null)} title="Edit Client">
        <form
            onSubmit={(e) => {
                e.preventDefault();
                // Assuming editForm is a state object or form helper with the client data
                router.put(`/super-admin/clients/${editing.id}`, editForm, {
                    onSuccess: () => setEditing(null),
                });
            }}
            // Use gap-6 for consistent spacing between major sections
            className="space-y-6"
        >

            {/* ============ 1. CLIENT INFORMATION ============ */}
            <div className="pt-2">
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4 border-b border-neutral-200 dark:border-neutral-700 pb-2">
                    Client Information
                </h3>

                {/* Section Grid: 2 columns */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Client Name</label>
                        <Input
                            placeholder="Client Name"
                            // Assuming Input component handles: px-4 py-2.5 rounded-lg w-full focus:ring-blue-500
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Address</label>
                        <Input
                            placeholder="Address"
                            value={editForm.address}
                            onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            {/* ============ 2. CONTACT INFORMATION ============ */}
            <div>
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4 border-b border-neutral-200 dark:border-neutral-700 pb-2">
                    Primary Contact Details
                </h3>

                {/* Section Grid: 2 columns */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Contact Person</label>
                        <Input
                            placeholder="Contact Person"
                            value={editForm.contact_person}
                            onChange={(e) => setEditForm({ ...editForm, contact_person: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Phone</label>
                        <Input
                            placeholder="Phone"
                            value={editForm.phone}
                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Email</label>
                        <Input
                            placeholder="Email"
                            type="email"
                            value={editForm.email}
                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            {/* ============ 3. BUSINESS DETAILS ============ */}
            <div>
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4 border-b border-neutral-200 dark:border-neutral-700 pb-2">
                    Business Details
                </h3>

                {/* Section Grid: 2 columns */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">GST No.</label>
                        <Input
                            placeholder="GST No."
                            value={editForm.gst_no}
                            onChange={(e) => setEditForm({ ...editForm, gst_no: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Status</label>
                        <select
                            // Explicitly style the select element
                            className="border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white 
                                       px-4 py-2.5 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 
                                       transition duration-150 shadow-sm appearance-none cursor-pointer"
                            value={editForm.status}
                            onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                        >
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* ============ BUTTONS ============ */}
            <div className="flex justify-end gap-3 border-t border-neutral-200 dark:border-neutral-700 pt-4 mt-6">
                
                {/* Cancel Button - Secondary style */}
                <Button 
                    variant="outline" 
                    onClick={() => setEditing(null)}
                    // Assuming Button component handles: px-6 py-2.5 rounded-lg text-neutral-600 hover:bg-neutral-100
                    className="px-6 py-2.5 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition duration-150"
                >
                    Cancel
                </Button>
                
                {/* Update Button - Primary style */}
                <Button 
                    className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150" 
                    type="submit"
                >
                    Update Client
                </Button>
            </div>

        </form>
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

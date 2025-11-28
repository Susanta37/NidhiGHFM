"use client";

import AppLayout from "@/layouts/app-layout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useReactForm } from "react-hook-form";

/* -------------------- SHADCN COMPONENTS -------------------- */
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Modal from "@/components/Modal";
import KpiCard from "@/components/KpiCard";


/* -------------------- ICONS -------------------- */
import {
    FileCog,
    Plus,
    Edit3,
    Trash2,
    AlertTriangle,
    SlidersHorizontal,
    Search,
} from "lucide-react";

interface Props {
    types: any;
    filters: {
        search?: string;
        maxDays?: string;
        reset?: string;
    };
     kpi: {
        total: number;
        resets: number;
        no_resets: number;
    };
}




/* ---------------- SHAPE (NO TYPE WARNINGS) ---------------- */
const leaveTypeSchema = z.object({
    name: z.string().min(2, "Name is required"),
    description: z.string().optional(),
    max_days: z.number(),
    annual_reset: z.boolean(),
});

type LeaveTypeForm = z.infer<typeof leaveTypeSchema>;

export default function LeaveTypes({ types, filters,kpi  }: Props) {
    const [editing, setEditing] = useState<any>(null);
    const [deleting, setDeleting] = useState<any>(null);

    // Filter State
    const [showFilters, setShowFilters] = useState(false);
    const [search, setSearch] = useState(filters.search || "");
    const [maxDays, setMaxDays] = useState(filters.maxDays || "");
    const [reset, setReset] = useState(filters.reset || "");

    /* ---------------- ADD FORM ---------------- */
    const addForm = useReactForm<LeaveTypeForm>({
        resolver: zodResolver(leaveTypeSchema),
        defaultValues: {
            name: "",
            description: "",
            max_days: 0,
            annual_reset: false,
        },
    });

    /* ---------------- EDIT FORM ---------------- */
    const editForm = useReactForm<LeaveTypeForm>({
        resolver: zodResolver(leaveTypeSchema),
        defaultValues: {
            name: "",
            description: "",
            max_days: 0,
            annual_reset: false,
        },
    });

    const startEdit = (type: any) => {
        setEditing(type);
        editForm.setValue("name", type.name);
        editForm.setValue("description", type.description ?? "");
        editForm.setValue("max_days", Number(type.max_days));
        editForm.setValue("annual_reset", !!type.annual_reset);
    };

    return (
        <AppLayout>
            <Head title="Leave Types" />

            <div className="p-6 min-h-screen bg-neutral-50 dark:bg-neutral-950">

                <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                    <FileCog className="h-6 w-6" /> Leave Types
                </h1>
                {/* ===========================================================
        KPI CARDS
=========================================================== */}
<div className="grid gap-6 md:grid-cols-3 mb-8">

    <KpiCard
        title="Total Leave Types"
        value={kpi.total}
        icon={FileCog}
        color="from-blue-500 to-sky-600"
        change="+4%"
        ctitle="vs last month"
    />

    <KpiCard
        title="Annual Reset Enabled"
        value={kpi.resets}
        icon={SlidersHorizontal}
        color="from-green-500 to-emerald-600"
        change="+1%"
        ctitle="reset types"
    />

    <KpiCard
        title="No Reset Types"
        value={kpi.no_resets}
        icon={AlertTriangle}
        color="from-red-500 to-rose-600"
        change="-1%"
        ctitle="non-reset"
    />

</div>

                


                {/* ===========================================================
                        ADD NEW
                ============================================================ */}
                <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border dark:border-neutral-800 mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold">Add Leave Type</h2>

                        {/* FILTER BUTTON */}
                        <button
                            onClick={() => setShowFilters(true)}
                            className="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg flex items-center gap-2"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            Filters
                        </button>
                    </div>

                    <Form {...addForm}>
                        <form
                            onSubmit={addForm.handleSubmit((values) => {
                                router.post("/super-admin/leave-types", values, {
                                    preserveScroll: true,
                                    onSuccess: () => addForm.reset(),
                                });
                            })}
                            className="grid gap-5 md:grid-cols-2"
                        >
                            {/* NAME */}
                            <FormField
                                control={addForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* MAX DAYS */}
                            <FormField
                                control={addForm.control}
                                name="max_days"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Max Days</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                value={field.value}
                                                onChange={(e) =>
                                                    field.onChange(Number(e.target.value))
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* DESCRIPTION */}
                            <FormField
                                control={addForm.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} rows={3} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* ANNUAL RESET */}
                            <FormField
                                control={addForm.control}
                                name="annual_reset"
                                render={({ field }) => (
                                    <FormItem className="flex items-center gap-2 col-span-2">
                                        <FormControl>
                                            <input
                                                type="checkbox"
                                                checked={field.value}
                                                onChange={(e) =>
                                                    field.onChange(e.target.checked)
                                                }
                                            />
                                        </FormControl>
                                        <FormLabel>Yearly Reset?</FormLabel>
                                    </FormItem>
                                )}
                            />

                            <div className="col-span-2 flex justify-end mt-2">
                                <Button className="bg-blue-600 text-white flex items-center gap-1">
                                    <Plus className="h-4 w-4" /> Add Type
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>

                {/* ===========================================================
                        TABLE
                ============================================================ */}
                <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border dark:border-neutral-800">

                    <Table>
                        {/* <TableCaption>All Leave Types</TableCaption> */}

                        <TableHeader>
                            <TableRow>
                                <TableHead>SlNo.</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Max Days</TableHead>
                                <TableHead>Reset?</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {types.data.map((t: any, index: number) => (
                                <TableRow key={t.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className="font-medium">{t.name}</TableCell>
                                    <TableCell>{t.max_days}</TableCell>
                                    <TableCell>
                                        {t.annual_reset ? (
                                            <span className="text-green-600">Yes</span>
                                        ) : (
                                            <span className="text-neutral-500">No</span>
                                        )}
                                    </TableCell>

                                    <TableCell className="text-right space-x-3 flex justify-end">
                                        <button
                                            onClick={() => startEdit(t)}
                                            className="text-blue-600 flex items-center gap-1 hover:underline"
                                        >
                                            <Edit3 className="h-4 w-4" /> Edit
                                        </button>

                                        <button
                                            onClick={() => setDeleting(t)}
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
                                        if (types.prev_page_url) {
                                            router.get(types.prev_page_url, {
                                                preserveScroll: true,
                                                preserveState: true,
                                            });
                                        }
                                    }}
                                />

                                       
                                </PaginationItem>

                                {/* Page Numbers */}
                                {Array.from({ length: types.last_page }, (_, i) => i + 1).map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink  isActive={page === types.current_page}>
                                            <Link
                                                href={`?page=${page}`}
                                                preserveScroll
                                            >
                                                {page}
                                            </Link>
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                {/* Next */}
                                <PaginationItem>
                                    <PaginationNext>
                                        <Link
                                            href={types.next_page_url || "#"}
                                            preserveScroll
                                        />
                                    </PaginationNext>
                                </PaginationItem>

                            </PaginationContent>
                        </Pagination>

                    </div>
                </div>

                {/* ===========================================================
                        FILTER MODAL
                ============================================================ */}
                <Modal show={showFilters} onClose={() => setShowFilters(false)} title="Filter Leave Types">
                    <div className="grid gap-4">

                        {/* Search */}
                        <div>
                            <label className="text-sm font-medium">Search</label>

                            <Input
                                placeholder="Search by name..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {/* Max Days */}
                        <div>
                            <label className="text-sm font-medium">Max Days (Less Than)</label>
                            <Input
                                type="number"
                                value={maxDays}
                                onChange={(e) => setMaxDays(e.target.value)}
                            />
                        </div>

                        {/* Reset */}
                        <div>
                            <label className="text-sm font-medium">Annual Reset</label>
                            <select
                                className="w-full px-3 py-2 border dark:bg-neutral-800 rounded"
                                value={reset}
                                onChange={(e) => setReset(e.target.value)}
                            >
                                <option value="">All</option>
                                <option value="1">Reset Only</option>
                                <option value="0">No Reset</option>
                            </select>
                        </div>

                        <Button
                            className="bg-blue-600 text-white mt-4"
                            onClick={() => {
                                setShowFilters(false);
                                router.get("/super-admin/leave-types", {
                                    search,
                                    maxDays,
                                    reset,
                                });
                            }}
                        >
                            Apply Filters
                        </Button>
                    </div>
                </Modal>

                {/* ===========================================================
                        EDIT MODAL
                ============================================================ */}
                <Modal show={!!editing} onClose={() => setEditing(null)} title="Edit Leave Type">
                    <Form {...editForm}>
                        <form
                            onSubmit={editForm.handleSubmit((values) => {
                                router.put(`/super-admin/leave-types/${editing.id}`, values, {
                                    preserveScroll: true,
                                    onSuccess: () => setEditing(null),
                                });
                            })}
                            className="grid gap-5"
                        >
                            {/* NAME */}
                            <FormField
                                control={editForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* MAX DAYS */}
                            <FormField
                                control={editForm.control}
                                name="max_days"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Max Days</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                value={field.value}
                                                onChange={(e) =>
                                                    field.onChange(Number(e.target.value))
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* DESCRIPTION */}
                            <FormField
                                control={editForm.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea rows={3} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* RESET */}
                            <FormField
                                control={editForm.control}
                                name="annual_reset"
                                render={({ field }) => (
                                    <FormItem className="flex items-center gap-2">
                                        <FormControl>
                                            <input
                                                type="checkbox"
                                                checked={field.value}
                                                onChange={(e) =>
                                                    field.onChange(e.target.checked)
                                                }
                                            />
                                        </FormControl>
                                        <FormLabel>Annual Reset?</FormLabel>
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end gap-2 mt-4">
                                <Button variant="outline" onClick={() => setEditing(null)}>
                                    Cancel
                                </Button>
                                <Button className="bg-blue-600" type="submit">
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </Form>
                </Modal>

                {/* ===========================================================
                        DELETE MODAL
                ============================================================ */}
                <Modal show={!!deleting} onClose={() => setDeleting(null)} title="Confirm Delete">
                    <div className="p-2">
                        <div className="flex items-center gap-3 text-red-600 mb-4">
                            <AlertTriangle className="w-6 h-6" />
                            <p className="font-semibold">This action cannot be undone.</p>
                        </div>

                        <p className="text-neutral-700 dark:text-neutral-300 mb-6">
                            Delete leave type:
                            <strong className="ml-1">{deleting?.name}</strong>?
                        </p>

                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setDeleting(null)}>
                                Cancel
                            </Button>

                           <Button
    className="bg-red-600 text-white"
    onClick={() => {
        if (!deleting) return; // <— Prevents null crash

        router.delete(`/super-admin/leave-types/${deleting.id}`, {
            preserveScroll: true,
            onSuccess: () => setDeleting(null),
        });
    }}
>
    Delete Permanently
</Button>

                        </div>
                    </div>
                </Modal>
            </div>
        </AppLayout>
    );
}

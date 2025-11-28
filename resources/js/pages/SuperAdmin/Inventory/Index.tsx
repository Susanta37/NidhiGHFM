import AppLayout from "@/layouts/app-layout";
import { Head, Link, router } from "@inertiajs/react";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useReactForm } from "react-hook-form";

/* SHADCN COMPONENTS */
import {
    Form, FormField, FormItem, FormLabel,
    FormControl, FormMessage
} from "@/components/ui/form";

import {
    Table, TableBody, TableCell, TableHead,
    TableHeader, TableRow
} from "@/components/ui/table";

import {
    Pagination, PaginationContent, PaginationItem,
    PaginationLink, PaginationNext, PaginationPrevious
} from "@/components/ui/pagination";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Modal from "@/components/Modal";
import KpiCard from "@/components/KpiCard";

/* ICONS */
import {
    Boxes,
    Plus,
    Edit3,
    Trash2,
    Search,
    SlidersHorizontal,
    AlertTriangle
} from "lucide-react";

interface Props {
    items: any;
    filters: any;
    kpi: {
        total: number;
        low_stock: number;
        units: number;
    };
}

/* ZOD FORM */
const inventorySchema = z.object({
    item_name: z.string().min(2, "Item name is required"),
    sku: z.string().min(1, "SKU required"),
    unit: z.string().min(1, "Unit required"),
    reorder_level: z.number(),
});

type InventoryForm = z.infer<typeof inventorySchema>;

export default function InventoryIndex({ items, filters, kpi }: Props) {

    const [editing, setEditing] = useState<any>(null);
    const [deleting, setDeleting] = useState<any>(null);

    const [showFilters, setShowFilters] = useState(false);

    const [search, setSearch] = useState(filters.search || "");
    const [unit, setUnit] = useState(filters.unit || "");
    const [reorder, setReorder] = useState(filters.reorder || "");

    /* CREATE FORM */
    const addForm = useReactForm<InventoryForm>({
        resolver: zodResolver(inventorySchema),
        defaultValues: {
            item_name: "",
            sku: "",
            unit: "",
            reorder_level: 0,
        },
    });

    /* EDIT FORM */
    const editForm = useReactForm<InventoryForm>({
        resolver: zodResolver(inventorySchema),
        defaultValues: {
            item_name: "",
            sku: "",
            unit: "",
            reorder_level: 0,
        },
    });

    const startEdit = (item: any) => {
        setEditing(item);
        editForm.setValue("item_name", item.item_name);
        editForm.setValue("sku", item.sku);
        editForm.setValue("unit", item.unit);
        editForm.setValue("reorder_level", item.reorder_level);
    };

    return (
        <AppLayout>
            <Head title="Inventory Items" />

            <div className="p-6 min-h-screen bg-neutral-50 dark:bg-neutral-950">

                <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                    <Boxes className="h-6 w-6" /> Inventory Items
                </h1>

                {/* KPI CARDS */}
                <div className="grid gap-6 md:grid-cols-3 mb-8">

                    <KpiCard
                        title="Total Items"
                        value={kpi.total}
                        icon={Boxes}
                        color="from-blue-500 to-sky-600"
                        change="+5%"
                        ctitle="vs last month"
                    />

                    <KpiCard
                        title="Low Stock Items"
                        value={kpi.low_stock}
                        icon={AlertTriangle}
                        color="from-red-500 to-rose-600"
                        change="+2%"
                        ctitle="low stock"
                    />

                    <KpiCard
                        title="Total Units"
                        value={kpi.units}
                        icon={SlidersHorizontal}
                        color="from-green-500 to-emerald-600"
                        change="+1%"
                        ctitle="unique units"
                    />

                </div>

                {/* ADD ITEM */}
                <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border dark:border-neutral-800 mb-8">

                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold">Add Inventory Item</h2>

                        <button
                            onClick={() => setShowFilters(true)}
                            className="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg flex items-center gap-2"
                        >
                            <SlidersHorizontal className="w-4 h-4" /> Filters
                        </button>
                    </div>

                    <Form {...addForm}>
                        <form
                            onSubmit={addForm.handleSubmit((values) => {
                                router.post("/super-admin/inventory", values, {
                                    preserveScroll: true,
                                    onSuccess: () => addForm.reset(),
                                });
                            })}
                            className="grid gap-5 md:grid-cols-2"
                        >
                            <FormField
                                control={addForm.control}
                                name="item_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Item Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={addForm.control}
                                name="sku"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>SKU</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={addForm.control}
                                name="unit"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Unit</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={addForm.control}
                                name="reorder_level"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Reorder Level</FormLabel>
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

                            <div className="col-span-2 flex justify-end mt-2">
                                <Button className="bg-blue-600 text-white flex items-center gap-1">
                                    <Plus className="h-4 w-4" /> Add Item
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>

                {/* TABLE */}
                <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border dark:border-neutral-800">

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>SlNo.</TableHead>
                                <TableHead>Item</TableHead>
                                <TableHead>SKU</TableHead>
                                <TableHead>Unit</TableHead>
                                <TableHead>Reorder Level</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {items.data.map((inv: any, i: number) => (
                                <TableRow key={inv.id}>
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell className="font-medium">{inv.item_name}</TableCell>
                                    <TableCell>{inv.sku}</TableCell>
                                    <TableCell>{inv.unit}</TableCell>
                                    <TableCell>{inv.reorder_level}</TableCell>

                                    <TableCell className="text-right flex justify-end gap-3">
                                        <button
                                            onClick={() => startEdit(inv)}
                                            className="text-blue-600 flex items-center gap-1 hover:underline"
                                        >
                                            <Edit3 className="w-4 h-4" /> Edit
                                        </button>

                                        <button
                                            onClick={() => setDeleting(inv)}
                                            className="text-red-600 flex items-center gap-1 hover:underline"
                                        >
                                            <Trash2 className="w-4 h-4" /> Delete
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

                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (items.prev_page_url) {
                                                router.get(items.prev_page_url, {
                                                    preserveScroll: true,
                                                    preserveState: true,
                                                });
                                            }
                                        }}
                                    />
                                </PaginationItem>

                                {Array.from({ length: items.last_page }, (_, i) => i + 1).map(page => (
                                    <PaginationItem key={page}>
                                        <PaginationLink isActive={page === items.current_page}>
                                            <Link href={`?page=${page}`} preserveScroll>
                                                {page}
                                            </Link>
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext>
                                        <Link href={items.next_page_url || "#"} preserveScroll />
                                    </PaginationNext>
                                </PaginationItem>

                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>

                {/* FILTER MODAL */}
                <Modal show={showFilters} onClose={() => setShowFilters(false)} title="Filter Inventory">
                    <div className="grid gap-4">

                        <div>
                            <label>Search Item</label>
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by name or SKU"
                            />
                        </div>

                        <div>
                            <label>Unit</label>
                            <Input value={unit} onChange={(e) => setUnit(e.target.value)} />
                        </div>

                        <div>
                            <label>Reorder ≤</label>
                            <Input
                                type="number"
                                value={reorder}
                                onChange={(e) => setReorder(e.target.value)}
                            />
                        </div>

                        <Button
                            className="bg-blue-600 text-white mt-4"
                            onClick={() => {
                                setShowFilters(false);
                                router.get("/super-admin/inventory", {
                                    search,
                                    unit,
                                    reorder,
                                });
                            }}
                        >
                            Apply Filters
                        </Button>
                    </div>
                </Modal>

                {/* EDIT MODAL */}
                {editing && (
    <Modal show={!!editing} onClose={() => setEditing(null)} title="Edit Item">
        <Form {...editForm}>
            <form
                onSubmit={editForm.handleSubmit(values => {
                    router.put(`/super-admin/inventory/${editing.id}`, values, {
                        preserveScroll: true,
                        onSuccess: () => setEditing(null),
                    });
                })}
                className="grid gap-5"
            >
                            <FormField
                                control={editForm.control}
                                name="item_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Item Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={editForm.control}
                                name="sku"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>SKU</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={editForm.control}
                                name="unit"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Unit</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={editForm.control}
                                name="reorder_level"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Reorder Level</FormLabel>
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

                            <div className="flex justify-end gap-2 mt-4">
                                <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
                                <Button className="bg-blue-600" type="submit">Save</Button>
                            </div>
                       </form>
        </Form>
    </Modal>
)}

            {deleting && (
    <Modal show={!!deleting} onClose={() => setDeleting(null)} title="Delete Item">
        <div className="p-2">

            <div className="flex items-center gap-2 text-red-600 mb-4">
                <AlertTriangle className="h-6 w-6" />
                <p className="font-semibold">This action cannot be undone.</p>
            </div>

            <p>
                Delete item: <strong>{deleting.item_name}</strong>?
            </p>

            <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setDeleting(null)}>Cancel</Button>

                <Button
                    className="bg-red-600 text-white"
                    onClick={() => {
                        router.delete(`/super-admin/inventory/${deleting.id}`, {
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
)}

            </div>
        </AppLayout>
    );
}

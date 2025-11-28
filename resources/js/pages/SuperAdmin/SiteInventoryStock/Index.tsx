"use client";

import AppLayout from "@/layouts/app-layout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useReactForm } from "react-hook-form";

/* SHADCN */
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
    PaginationLink, PaginationPrevious, PaginationNext
} from "@/components/ui/pagination";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal";
import KpiCard from "@/components/KpiCard";

/* ICONS */
import {
    Warehouse,
    Plus,
    Edit3,
    Trash2,
    SlidersHorizontal,
    AlertTriangle,
} from "lucide-react";

interface Props {
    stocks: any;
    sites: any;
    items: any;
    filters: any;
    kpi: {
        total: number;
        sites: number;
        items: number;
    };
}

const stockSchema = z.object({
    site_id: z.string().min(1),
    inventory_id: z.string().min(1),
    quantity: z.number(),
});

type StockForm = z.infer<typeof stockSchema>;

export default function StockIndex({ stocks, sites, items, filters, kpi }: Props) {
    
    const [editing, setEditing] = useState<any>(null);
    const [deleting, setDeleting] = useState<any>(null);
    const [showFilters, setShowFilters] = useState(false);

    const [search, setSearch] = useState(filters.search || "");
    const [site_id, setSiteId] = useState(filters.site_id || "");
    const [inventory_id, setInventoryId] = useState(filters.inventory_id || "");

    /* CREATE FORM */
    const addForm = useReactForm<StockForm>({
        resolver: zodResolver(stockSchema),
        defaultValues: {
            site_id: "",
            inventory_id: "",
            quantity: 0,
        },
    });

    /* EDIT FORM */
    const editForm = useReactForm<StockForm>({
        resolver: zodResolver(stockSchema),
        defaultValues: {
            site_id: "",
            inventory_id: "",
            quantity: 0,
        },
    });

    const startEdit = (stock: any) => {
        setEditing(stock);

        editForm.setValue("site_id", String(stock.site_id));
        editForm.setValue("inventory_id", String(stock.inventory_id));
        editForm.setValue("quantity", stock.quantity);
    };

    return (
        <AppLayout>
            <Head title="Site Inventory Stock" />

            <div className="p-6 min-h-screen bg-neutral-50 dark:bg-neutral-950">

                <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                    <Warehouse className="h-6 w-6" /> Site Inventory Stock
                </h1>

                {/* KPIs */}
                <div className="grid gap-6 md:grid-cols-3 mb-8">

                    <KpiCard
                        title="Total Stock Records"
                        value={kpi.total}
                        icon={Warehouse}
                        color="from-blue-500 to-sky-600"
                        change="+3%"
                        ctitle="vs last month"
                    />

                    <KpiCard
                        title="Sites Covered"
                        value={kpi.sites}
                        icon={SlidersHorizontal}
                        color="from-green-500 to-emerald-600"
                    />

                    <KpiCard
                        title="Inventory Types"
                        value={kpi.items}
                        icon={AlertTriangle}
                        color="from-orange-500 to-yellow-600"
                    />

                </div>

                {/* ADD STOCK */}
                <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border dark:border-neutral-800 mb-8">

                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold">Add Stock</h2>

                        <button
                            onClick={() => setShowFilters(true)}
                            className="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg flex items-center gap-2"
                        >
                            <SlidersHorizontal className="w-4 h-4" /> Filters
                        </button>
                    </div>

                    <Form {...addForm}>
                        <form
                            onSubmit={addForm.handleSubmit(values => {
                                router.post("/super-admin/site-inventory-stock", values, {
                                    preserveScroll: true,
                                    onSuccess: () => addForm.reset(),
                                });
                            })}
                            className="grid gap-5 md:grid-cols-3"
                        >
                            <FormField
                                control={addForm.control}
                                name="site_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Site</FormLabel>
                                        <FormControl>
                                            <select
                                                className="w-full border rounded p-2 dark:bg-neutral-800"
                                                {...field}
                                            >
                                                <option value="">Select Site</option>
                                                {sites.map((s: any) => (
                                                    <option key={s.id} value={s.id}>{s.site_name}</option>
                                                ))}
                                            </select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={addForm.control}
                                name="inventory_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Inventory Item</FormLabel>
                                        <FormControl>
                                            <select
                                                className="w-full border rounded p-2 dark:bg-neutral-800"
                                                {...field}
                                            >
                                                <option value="">Select Item</option>
                                                {items.map((i: any) => (
                                                    <option key={i.id} value={i.id}>{i.item_name}</option>
                                                ))}
                                            </select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={addForm.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quantity</FormLabel>
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

                            <div className="col-span-3 flex justify-end">
                                <Button className="bg-blue-600 text-white flex items-center gap-1">
                                    <Plus className="w-4 h-4" /> Add Stock
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
                                <TableHead>Site</TableHead>
                                <TableHead>Inventory</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Updated By</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {stocks.data.map((record: any, i: number) => (
                                <TableRow key={record.id}>
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell>{record.site?.site_name}</TableCell>
                                    <TableCell>{record.inventory?.item_name}</TableCell>
                                    <TableCell>{record.quantity}</TableCell>
                                    <TableCell>
                                        {record.updater?.name ?? "—"}
                                    </TableCell>

                                    <TableCell className="text-right flex justify-end gap-3">
                                        <button
                                            onClick={() => startEdit(record)}
                                            className="text-blue-600 flex items-center gap-1 hover:underline"
                                        >
                                            <Edit3 className="w-4 h-4" /> Edit
                                        </button>

                                        <button
                                            onClick={() => setDeleting(record)}
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
                                        onClick={e => {
                                            e.preventDefault();
                                            if (stocks.prev_page_url) {
                                                router.get(stocks.prev_page_url, {
                                                    preserveScroll: true,
                                                    preserveState: true,
                                                });
                                            }
                                        }}
                                    />
                                </PaginationItem>

                                {Array.from({ length: stocks.last_page }, (_, i) => i + 1).map(page => (
                                    <PaginationItem key={page}>
                                        <PaginationLink isActive={page === stocks.current_page}>
                                            <Link href={`?page=${page}`} preserveScroll>
                                                {page}
                                            </Link>
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext>
                                        <Link href={stocks.next_page_url || "#"} preserveScroll />
                                    </PaginationNext>
                                </PaginationItem>

                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>

                {/* FILTER MODAL */}
                {showFilters && (
                    <Modal show={showFilters} onClose={() => setShowFilters(false)} title="Filter Stock">
                        <div className="grid gap-4">

                            <div>
                                <label>Search Inventory</label>
                                <Input
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Item or SKU"
                                />
                            </div>

                            <div>
                                <label>Site</label>
                                <select
                                    value={site_id}
                                    onChange={e => setSiteId(e.target.value)}
                                    className="w-full border rounded p-2 dark:bg-neutral-800"
                                >
                                    <option value="">All Sites</option>
                                    {sites.map((s: any) => (
                                        <option key={s.id} value={s.id}>{s.site_name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label>Inventory Item</label>
                                <select
                                    value={inventory_id}
                                    onChange={e => setInventoryId(e.target.value)}
                                    className="w-full border rounded p-2 dark:bg-neutral-800"
                                >
                                    <option value="">All Items</option>
                                    {items.map((i: any) => (
                                        <option key={i.id} value={i.id}>{i.item_name}</option>
                                    ))}
                                </select>
                            </div>

                            <Button
                                className="bg-blue-600 text-white mt-4"
                                onClick={() => {
                                    setShowFilters(false);

                                    router.get("/super-admin/site-inventory-stock", {
                                        search,
                                        site_id,
                                        inventory_id,
                                    });
                                }}
                            >
                                Apply Filters
                            </Button>

                        </div>
                    </Modal>
                )}

                {/* EDIT MODAL */}
                {editing && (
                    <Modal show={!!editing} onClose={() => setEditing(null)} title="Edit Stock Record">
                        <Form {...editForm}>
                            <form
                                onSubmit={editForm.handleSubmit(values => {
                                    router.put(`/super-admin/site-inventory-stock/${editing.id}`, values, {
                                        preserveScroll: true,
                                        onSuccess: () => setEditing(null),
                                    });
                                })}
                                className="grid gap-5"
                            >
                                <FormField
                                    control={editForm.control}
                                    name="site_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Site</FormLabel>
                                            <FormControl>
                                                <select
                                                    {...field}
                                                    className="w-full border rounded p-2 dark:bg-neutral-800"
                                                >
                                                    <option value="">Select Site</option>
                                                    {sites.map((s: any) => (
                                                        <option key={s.id} value={s.id}>{s.site_name}</option>
                                                    ))}
                                                </select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={editForm.control}
                                    name="inventory_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Inventory Item</FormLabel>
                                            <FormControl>
                                                <select
                                                    {...field}
                                                    className="w-full border rounded p-2 dark:bg-neutral-800"
                                                >
                                                    <option value="">Select Item</option>
                                                    {items.map((i: any) => (
                                                        <option key={i.id} value={i.id}>{i.item_name}</option>
                                                    ))}
                                                </select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={editForm.control}
                                    name="quantity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Quantity</FormLabel>
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
                                    <Button className="bg-blue-600" type="submit">Save Changes</Button>
                                </div>
                            </form>
                        </Form>
                    </Modal>
                )}

                {/* DELETE MODAL */}
                {deleting && (
                    <Modal show={!!deleting} onClose={() => setDeleting(null)} title="Delete Stock">
                        <div className="p-2">

                            <div className="flex items-center gap-2 text-red-600 mb-4">
                                <AlertTriangle className="h-6 w-6" />
                                <p className="font-semibold">This action cannot be undone.</p>
                            </div>

                            <p>
                                Delete stock record for:
                                <strong className="ml-1">
                                    {deleting.inventory?.item_name} at {deleting.site?.site_name}
                                </strong>?
                            </p>

                            <div className="flex justify-end gap-2 mt-6">
                                <Button variant="outline" onClick={() => setDeleting(null)}>Cancel</Button>

                                <Button
                                    className="bg-red-600 text-white"
                                    onClick={() => {
                                        router.delete(`/super-admin/site-inventory-stock/${deleting.id}`, {
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

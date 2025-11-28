import { useState } from "react";
import { cn } from "@/lib/utils";

interface Column {
    key: string;
    label: string;
    render?: (row: any) => React.ReactNode;
}

interface Filter {
    key: string;
    type: "text" | "select" | "date";
    placeholder?: string;
    options?: string[];
}

interface DataTableProps {
    columns: Column[];
    data: any[];
    filters?: Filter[];
    onFilter?: (filterValues: Record<string, string>) => void;
}

export default function DataTable({
    columns,
    data,
    filters = [],
    onFilter,
}: DataTableProps) {
    const [filterValues, setFilterValues] = useState<Record<string, string>>({});

    const handleChange = (key: string, value: string) => {
        const updated = { ...filterValues, [key]: value };
        setFilterValues(updated);
        onFilter && onFilter(updated);
    };

    return (
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">

            {/* Filters */}
            {filters.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-3">
                    {filters.map((f, idx) => (
                        <div key={idx}>
                            {f.type === "text" && (
                                <input
                                    type="text"
                                    placeholder={f.placeholder}
                                    onChange={(e) =>
                                        handleChange(f.key, e.target.value)
                                    }
                                    className="rounded-lg border border-neutral-300 dark:border-neutral-700 
                                                bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-sm outline-none 
                                                dark:text-white min-w-[180px]"
                                />
                            )}

                            {f.type === "date" && (
                                <input
                                    type="date"
                                    onChange={(e) =>
                                        handleChange(f.key, e.target.value)
                                    }
                                    className="rounded-lg border border-neutral-300 dark:border-neutral-700 
                                                bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-sm outline-none 
                                                dark:text-white min-w-[150px]"
                                />
                            )}

                            {f.type === "select" && (
                                <select
                                    onChange={(e) =>
                                        handleChange(f.key, e.target.value)
                                    }
                                    className="rounded-lg border border-neutral-300 dark:border-neutral-700 
                                                bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-sm outline-none 
                                                dark:text-white min-w-[150px]"
                                >
                                    <option value="">All</option>
                                    {f.options?.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
                    <thead className="bg-neutral-100 dark:bg-neutral-800/50">
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className="px-4 py-3 text-left text-xs font-semibold 
                                               text-neutral-600 dark:text-neutral-300 uppercase tracking-wide"
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                        {data.length === 0 && (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-4 py-6 text-center text-neutral-500 dark:text-neutral-400"
                                >
                                    No records found.
                                </td>
                            </tr>
                        )}

                        {data.map((row, idx) => (
                            <tr
                                key={idx}
                                className="hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors"
                            >
                                {columns.map((col) => (
                                    <td
                                        key={col.key}
                                        className="px-4 py-3 text-sm text-neutral-800 dark:text-neutral-200"
                                    >
                                        {col.render
                                            ? col.render(row)
                                            : row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

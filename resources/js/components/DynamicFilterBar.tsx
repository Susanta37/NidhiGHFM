import { Search } from "lucide-react";

interface Filter {
    key: string;
    label: string;
    type: "text" | "select" | "date";
    placeholder?: string;
    options?: { label: string; value: string }[];
    icon?: "search";
}

export default function DynamicFilterBar({ filters, values, onChange }) {
    return (
        <div className="bg-white dark:bg-neutral-900 border dark:border-neutral-800 
                        rounded-xl shadow-sm p-4 mb-6 grid md:grid-cols-5 gap-4">

            {filters.map((f) => (
                <div key={f.key} className="w-full">
                    
                    {/* Label */}
                    <label className="text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-1 block">
                        {f.label}
                    </label>

                    {/* TEXT FIELD */}
                    {f.type === "text" && (
                        <div className="relative">
                            {f.icon === "search" && (
                                <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                            )}
                            <input
                                type="text"
                                placeholder={f.placeholder || ""}
                                className={`pl-${f.icon ? "10" : "3"} pr-3 py-2 border rounded-lg w-full 
                                           dark:bg-neutral-800 dark:border-neutral-700 dark:text-white`}
                                value={values[f.key] ?? ""}
                                onChange={(e) => onChange(f.key, e.target.value)}
                            />
                        </div>
                    )}

                    {/* SELECT FIELD */}
                    {f.type === "select" && (
                        <select
                            className="px-3 py-2 border rounded-lg w-full dark:bg-neutral-800 
                                       dark:border-neutral-700 dark:text-white"
                            value={values[f.key] ?? ""}
                            onChange={(e) => onChange(f.key, e.target.value)}
                        >
                            {f.options?.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    )}

                    {/* DATE FIELD */}
                    {f.type === "date" && (
                        <input
                            type="date"
                            className="px-3 py-2 border rounded-lg w-full dark:bg-neutral-800 
                                       dark:border-neutral-700 dark:text-white"
                            value={values[f.key] ?? ""}
                            onChange={(e) => onChange(f.key, e.target.value)}
                        />
                    )}

                </div>
            ))}
        </div>
    );
}

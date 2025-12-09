import { Search } from "lucide-react";
import { cn } from "@/lib/utils"; 
import React from 'react'; 

interface Filter {
    key: string;
    label: string;
    type: "text" | "select" | "date";
    placeholder?: string;
    options?: { label: string; value: string }[];
    icon?: "search";
}

interface DynamicFilterBarProps {
    filters: Filter[];
    values: Record<string, any>;
    onChange: (key: string, value: string) => void;
    primaryColor?: string;
    // NEW PROP: Allows passing a React node (like a button) to the filter bar
    actionSlot?: React.ReactNode;
}

export default function DynamicFilterBar({
    filters,
    values,
    onChange,
    primaryColor = "blue",
    actionSlot, // Destructure the new prop
}: DynamicFilterBarProps) {

    // Helper function to dynamically create Tailwind focus classes
    const focusClasses = `focus:ring-${primaryColor}-500 focus:border-${primaryColor}-500`;

    // Base input/select classes
    const baseInputClasses = `px-3 py-2 border rounded-lg w-full transition duration-150 shadow-sm
                              dark:bg-neutral-800 dark:border-neutral-700 dark:text-white 
                              focus:ring-2 focus:outline-none`;

    // Calculate how many filter slots are needed for the filters + 1 for the action slot
    const filterCount = filters.length;
    // Determine the grid columns based on the number of filters, up to a max of 5 or 6, plus one for the action.
    const columns = Math.min(filterCount + (actionSlot ? 1 : 0), 6); 

    return (
        <div className={cn(
            "bg-white dark:bg-neutral-900 border dark:border-neutral-800 rounded-xl  p-5  grid gap-6",
            // Dynamically set grid columns: 'grid-cols-1 md:grid-cols-X'
            `md:grid-cols-${columns}`
        )}>

            {/* Render Filter Fields */}
            {filters.map((f) => (
                <div key={f.key} className="w-full">
                    
                    {/* ... (Filter logic for text, select, date remains the same) ... */}
                    
                    {/* Label */}
                    <label className="text-sm font-medium text-neutral-600 dark:text-neutral-300  block">
                        {f.label}
                    </label>

                    {/* TEXT FIELD */}
                    {f.type === "text" && (
                        <div className="relative">
                            {f.icon === "search" && (
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                            )}
                            <input
                                type="text"
                                placeholder={f.placeholder || ""}
                                className={cn(
                                    baseInputClasses,
                                    focusClasses,
                                    f.icon === "search" ? "pl-10" : "pl-3"
                                )}
                                value={values[f.key] ?? ""}
                                onChange={(e) => onChange(f.key, e.target.value)}
                            />
                        </div>
                    )}

                    {/* SELECT FIELD */}
                    {f.type === "select" && (
                        <select
                            className={cn(baseInputClasses, focusClasses)}
                            value={values[f.key] ?? ""}
                            onChange={(e) => onChange(f.key, e.target.value)}
                        >
                            <option value="">{f.placeholder || `Select ${f.label}`}</option>
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
                            className={cn(baseInputClasses, focusClasses)}
                            value={values[f.key] ?? ""}
                            onChange={(e) => onChange(f.key, e.target.value)}
                        />
                    )}

                </div>
            ))}

            {/* NEW: Action Slot for buttons */}
            {actionSlot && (
                <div className="w-full flex items-end justify-start md:justify-end">
                    {/* The wrapper aligns the content to the bottom (items-end) 
                       to match the height of the inputs above it.
                    */}
                    {actionSlot}
                </div>
            )}
        </div>
    );
}
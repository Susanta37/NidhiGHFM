import { FilterProps } from "@/types";
import { Search } from "lucide-react";

export default function FilterBar({
    search,
    setSearch,
    status,
    setStatus,
    type,
    setType,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    types = [],
}: FilterProps) {
    return (
        <div className="bg-white dark:bg-neutral-900 border dark:border-neutral-800 rounded-xl shadow-sm p-4 mb-6 grid md:grid-cols-5 gap-4">

            {/* Search */}
            <div className="w-full">
                <label className="text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-1 block">
                    Search Employee
                </label>

                <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                    <input
                        type="text"
                        placeholder="Name or Email..."
                        className="pl-10 pr-3 py-2 border rounded-lg w-full 
                                   dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Status */}
            <div>
                <label className="text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-1 block">
                    Status
                </label>

                <select
                    className="px-3 py-2 border rounded-lg w-full dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            {/* Leave Type */}
            <div>
                <label className="text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-1 block">
                    Leave Type
                </label>

                <select
                    className="px-3 py-2 border rounded-lg w-full dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="">All</option>
                    {(types || []).map((t) => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                </select>
            </div>

            {/* Date From */}
            <div>
                <label className="text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-1 block">
                    Start Date
                </label>

                <input
                    type="date"
                    className="px-3 py-2 border rounded-lg w-full dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                />
            </div>

            {/* Date To */}
            <div>
                <label className="text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-1 block">
                    End Date
                </label>

                <input
                    type="date"
                    className="px-3 py-2 border rounded-lg w-full dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                />
            </div>

        </div>
    );
}

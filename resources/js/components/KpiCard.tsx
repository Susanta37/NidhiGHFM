import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming this utility is available

interface KpiCardProps {
    title: string;
    value: string | number;
    change?: string;
    icon: any;
    // Keeping existing color prop for the hover effect
    color?: string;
    ctitle?: string;
    // NEW PROPS for dynamic background and icon colors
    bgColorClass?: string;
    iconColorClass?: string;
}

export default function KpiCard({
    title,
    value,
    change,
    icon: Icon,
    color = "from-blue-500 to-sky-600",
    ctitle,
    // Provide default fallback classes for new props
    bgColorClass = "bg-white dark:bg-neutral-900", // Default card background
    iconColorClass = "text-neutral-900 dark:text-white", // Default icon color
}: KpiCardProps) {
    return (
        // 1. Apply dynamic background color here
        <div className={cn(
            "relative overflow-hidden rounded-xl border p-6 shadow-sm transition-all hover:shadow-md group",
            // Apply a default border color, but allow background class to dictate the main color
            "border-neutral-200 dark:border-neutral-800",
            bgColorClass
        )}>
            {/* Gradient Hover Overlay */}
            <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br",
                color
            )} />

            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{title}</p>
                    <h3 className="mt-2 text-3xl font-bold text-neutral-900 dark:text-white">{value}</h3>
                </div>

                {/* 2. Update icon container for better visibility */}
                <div className="rounded-full p-3 bg-white/20 backdrop-blur-sm dark:bg-black/20">
                    {/* 3. Apply dynamic icon color class here */}
                    <Icon className={cn("h-7 w-7", iconColorClass)} />
                </div>
            </div>

            {change && (
                <div className="mt-4 flex items-center text-sm">
                    {/* Note: The 'change' text color remains green for positive trending */}
                    <span className="flex items-center text-green-500 font-medium">
                        <TrendingUp className="mr-1 h-4 w-4" />
                        {change}
                    </span>
                    <span className="ml-2 text-neutral-500 dark:text-neutral-400">{ctitle}</span>
                </div>
            )}
        </div>
    );
}
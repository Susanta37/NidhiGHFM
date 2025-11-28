import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
    title: string;
    value: string | number;
    change?: string;
    icon: any;
    color?: string; 
    ctitle?: string;
}

export default function KpiCard({ title, value, change, icon: Icon, color = "from-blue-500 to-sky-600",ctitle }: KpiCardProps) {
    return (
        <div className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 transition-all hover:shadow-md group">
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

                <div className="rounded-full p-3 bg-white/10 backdrop-blur-sm dark:bg-neutral-800/40">
                    <Icon className="h-7 w-7 text-neutral-900 dark:text-white" />
                </div>
            </div>

            {change && (
                <div className="mt-4 flex items-center text-sm">
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

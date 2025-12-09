import { NavFooter } from '@/components/nav-footer';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem
} from '@/components/ui/sidebar';

import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';

import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

import {
    Bell,
    BookOpen,
    Boxes,
    CalendarRange,
    Camera,
    ChevronRight,
    ClipboardList,
    Clock,
    FileText,
    Folder,
    LayoutGrid,
    Settings,
    ShieldCheck,
    User2Icon,
    Wallet,
} from 'lucide-react';

import AppLogo from './app-logo';

/* ------------------------------------------
    BASIC NAV ITEMS
------------------------------------------ */
const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/',
        icon: LayoutGrid,
    },
];

const footerNavItems: NavItem[] = [];

/* ------------------------------------------
    SIDEBAR COMPONENT
------------------------------------------ */
export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const role = String(auth?.user?.role ?? '');

    const navItems = getNavItems(role);

    return (
        <Sidebar collapsible="icon" variant="inset">
            {/* HEADER */}
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* CONTENT */}
            <SidebarContent>
                <SidebarMenu>
                    {navItems.map((item, index) => (
                        <SidebarItemComponent key={index} item={item} />
                    ))}
                </SidebarMenu>
            </SidebarContent>

            {/* FOOTER */}
            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

/* ------------------------------------------
    HELPERS
------------------------------------------ */
function hrefToString(href: NavItem["href"]): string {
    if (!href) return "";
    if (typeof href === "string") return href;
    if (typeof href === "object" && "url" in href) return String(href.url);
    return "";
}

/* ------------------------------------------
    RENDER A SINGLE SIDEBAR ITEM
------------------------------------------ */
function SidebarItemComponent({ item }: { item: NavItem }) {
    const { url } = usePage();
    const Icon = item.icon ?? null;

    const activeClass =
        "bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold";

    const parentHref = hrefToString(item.href);
    const isActive = parentHref && url === parentHref;

    const isChildActive = item.children?.some(child =>
        url.startsWith(hrefToString(child.href))
    );

    const shouldOpen = isChildActive || url.startsWith(parentHref + "/");

    /* ------------------------------------------
        COLLAPSIBLE ITEM
    ------------------------------------------ */
    if (item.children && item.children.length > 0) {
        return (
            <Collapsible defaultOpen={shouldOpen} className="group/collapsible">
                <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                            className={`flex items-center w-full justify-between pr-2 ${isChildActive ? activeClass : ""
                                }`}
                        >
                            {/* ICON + TITLE */}
                            <div className="flex items-center gap-2 overflow-hidden">
                                {Icon && <Icon className="h-4 w-4 shrink-0" />}
                                <span className="truncate">{item.title}</span>
                            </div>

                            {/* CHEVRON ROTATE */}
                            <ChevronRight
                                className={`
                                    h-4 w-4 shrink-0 transition-transform duration-200
                                    text-neutral-600 dark:text-neutral-300
                                    group-data-[state=open]/collapsible:rotate-90
                                `}
                            />
                        </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                        <SidebarMenuSub>
                            {item.children.map((sub, i) => {
                                const subHref = hrefToString(sub.href);
                                const isSubActive = url.startsWith(subHref);

                                return (
                                    <SidebarMenuSubItem key={i}>
                                        <Link
                                            href={sub.href}
                                            className={`w-full flex items-center px-3 py-1.5 rounded-md
                                                hover:bg-neutral-100 dark:hover:bg-neutral-800
                                                ${isSubActive ? activeClass : ""}
                                            `}
                                        >
                                            {sub.title}
                                        </Link>
                                    </SidebarMenuSubItem>
                                );
                            })}
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </SidebarMenuItem>
            </Collapsible>
        );
    }

    /* ------------------------------------------
        NORMAL ITEM
    ------------------------------------------ */
    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild className={isActive ? activeClass : ""}>
                <Link href={item.href} className="flex items-center gap-2">
                    {Icon && <Icon className="h-4 w-4" />}
                    {item.title}
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}

/* ------------------------------------------
    ROLE-BASED MENU BUILDER
------------------------------------------ */
function getNavItems(role: string): NavItem[] {
    switch (role) {
        case "superadmin":
            return [
                {
                    title: "Super Admin Dashboard",
                    href: "/super-admin/dashboard",
                    icon: LayoutGrid,
                },
                {
                    title: "User Management",
                    href: "/super-admin/users",
                    icon: Folder,
                },
                {
                    title: "Scheduling & Shifts",
                    href: "#",
                    icon: CalendarRange,
                    children: [
                        { title: "Clients", href: "/super-admin/clients" },
                        { title: "Sites", href: "/super-admin/sites" },
                        { title: "Shift Management", href: "/super-admin/shifts" },
                        { title: "Shift Assignments", href: "/super-admin/shifts/assignments" },
                        { title: "Shift Swap Requests", href: "/super-admin/shifts/swaps" },
                    ],
                },
                {
                    title: "Job Management",
                    href: "#",
                    icon: ClipboardList,
                    children: [
                        { title: "Job List", href: "/super-admin/jobs" },
                        { title: "Job Assignments", href: "/super-admin/job-assignments" },
                        { title: "Job Logs", href: "/super-admin/job-logs" },
                    ],
                },
                {
                    title: "Inventory",
                    href: "#",
                    icon: Boxes,
                    children: [
                        { title: "Inventory Items", href: "/super-admin/inventory" },
                        { title: "Site Stock", href: "/super-admin/site-inventory-stock" },
                        { title: "Consumption Logs", href: "#" },
                        { title: "Reorder Alerts", href: "#" },
                    ],
                },
                {
                    title: "Face Recognition",
                    href: "#",
                    icon: Camera,
                    children: [
                        { title: "Face Records", href: "/super-admin/face/records" },
                        { title: "Attendance Verification Logs", href: "/super-admin/face/logs" },
                        { title: "Face Recognition Settings", href: "/super-admin/face/settings" },
                    ],
                },
                {
                    title: "Attendance",
                    href: "#",
                    icon: Clock,
                    children: [
                        { title: "Daily Attendance", href: "/super-admin/attendance/daily" },
                        { title: "Manual Attendance Correction", href: "#" },
                        { title: "GPS Attendance Map", href: "#" },
                        { title: "Selfie Attendance Viewer", href: "#" },
                    ],
                },
                {
                    title: "Leave & Compliance",
                    href: "#",
                    icon: ShieldCheck,
                    children: [
                        { title: "Leave Requests", href: "/super-admin/leaves" },
                        { title: "Leave Types", href: "/super-admin/leave-types" },
                        { title: "Compliance Certificates", href: "/super-admin/compliance" },
                    ],
                },
                {
                    title: "Payroll",
                    href: "#",
                    icon: Wallet,
                    children: [
                        { title: "Salary Setup", href: "#" },
                        { title: "Payroll Run", href: "#" },
                        { title: "Payroll List", href: "#" },
                        { title: "Payslip Export", href: "#" },
                    ],
                },
                {
                    title: "Reports",
                    href: "#",
                    icon: FileText,
                    children: [
                        { title: "Attendance Report", href: "#" },
                        { title: "Payroll Summary", href: "#" },
                        { title: "Staff Utilization Report", href: "#" },
                        { title: "Billing Report", href: "#" },
                        { title: "Face Verification Report", href: "#" },
                    ],
                },
                {
                    title: "Notifications",
                    href: "#",
                    icon: Bell,
                    children: [
                        { title: "Send Notifications", href: "#" },
                        { title: "Notification History", href: "#" },
                    ],
                },
                {
                    title: "System Settings",
                    href: "#",
                    icon: Settings,
                    children: [
                        { title: "Roles & Permissions", href: "#" },
                        { title: "General Settings", href: "#" },
                        { title: "Backup / Restore", href: "#" },
                        { title: "Integrations", href: "#" },
                    ],
                },
            ];
        case "hr":
            return [
                {
                    title: "HR",
                    href: "/hr/dashboard",
                    icon: LayoutGrid,
                },
                {
                    title: "User Management",
                    href: "/hr/users",
                    icon: User2Icon,
                },
                {
                    title: "Face Recognition",
                    href: "#",
                    icon: Camera,
                    children: [
                        { title: "Face Records", href: "/hr/face/records" },
                        { title: "Attendance Verification Logs", href: "/hr/face/logs" },
                        { title: "Face Recognition Settings", href: "/hr/face/settings" },
                    ],
                },
                {
                    title: "Attendance",
                    href: "#",
                    icon: Clock,
                    children: [
                        { title: "Daily Attendance", href: "/hr/attendance/daily" },
                        { title: "Manual Attendance Correction", href: "/hr/manual-attendance" },
                        { title: "GPS Attendance Map", href: "#" },
                        { title: "Selfie Attendance Viewer", href: "#" },
                    ],
                },
                {
                    title: "Leave & Compliance",
                    href: "#",
                    icon: ShieldCheck,
                    children: [
                        { title: "Leave Requests", href: "/hr/leaves" },
                        { title: "Leave Types", href: "/hr/leave-types" },
                        { title: "Compliance Certificates", href: "/hr/compliance" },
                    ],
                }
            ];

        default:
            return mainNavItems;
    }
}

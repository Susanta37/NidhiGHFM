import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Activity, Users, Settings, TrendingUp, User } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import KpiCard from '@/components/KpiCard';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Super Admin Dashboard',
        href: '/super-admin/dashboard',
    },
];

const data = [
    { name: 'Jan', users: 400, active: 240 },
    { name: 'Feb', users: 300, active: 139 },
    { name: 'Mar', users: 200, active: 980 },
    { name: 'Apr', users: 278, active: 390 },
    { name: 'May', users: 189, active: 480 },
    { name: 'Jun', users: 239, active: 380 },
    { name: 'Jul', users: 349, active: 430 },
];

const userGraph = [
    { name: "Mon", value: 200 },
    { name: "Tue", value: 340 },
    { name: "Wed", value: 420 },
    { name: "Thu", value: 380 },
    { name: "Fri", value: 460 },
    { name: "Sat", value: 500 },
    { name: "Sun", value: 620 },
];
const attendanceData= [
                        {
                            user: "John Doe",
                            check_in: "09:12 AM",
                            check_out: "06:04 PM",
                            hours: "8.5",
                            overtime: "1.0",
                            status: "present",
                            checkin_photo: "https://img.freepik.com/free-vector/rapper-neon-sign_1262-15705.jpg?semt=ais_hybrid&w=740&q=80",
                            checkout_photo: "https://img.freepik.com/free-vector/rapper-neon-sign_1262-15705.jpg?semt=ais_hybrid&w=740&q=80",
                        },
                        {
                            user: "Asha Patel",
                            check_in: "09:48 AM",
                            check_out: "06:10 PM",
                            hours: "8.0",
                            overtime: "0.5",
                            status: "late",
                            checkin_photo: "https://img.freepik.com/free-vector/rapper-neon-sign_1262-15705.jpg?semt=ais_hybrid&w=740&q=80",
                            checkout_photo: "https://img.freepik.com/free-vector/rapper-neon-sign_1262-15705.jpg?semt=ais_hybrid&w=740&q=80",
                        },
                        {
                            user: "Ravi Kumar",
                            check_in: "-",
                            check_out: "-",
                            hours: "0",
                            overtime: "0",
                            status: "absent",
                            checkin_photo: "",
                            checkout_photo: "",
                        },
                        {
                            user: "Maria Singh",
                            check_in: "09:20 AM",
                            check_out: "05:40 PM",
                            hours: "7.5",
                            overtime: "0",
                            status: "manual_correction",
                            checkin_photo: "https://img.freepik.com/free-vector/rapper-neon-sign_1262-15705.jpg?semt=ais_hybrid&w=740&q=80",
                            checkout_photo: "https://img.freepik.com/free-vector/rapper-neon-sign_1262-15705.jpg?semt=ais_hybrid&w=740&q=80",
                        },
                    ]



export default function SuperAdminDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Super Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6 bg-neutral-50 dark:bg-neutral-950">
                <div className="grid gap-6 md:grid-cols-4">
                    <KpiCard
                        title="Total Users"
                        value="1,234"
                        change="+12.5%"
                        icon={Users}
                        color="from-purple-500 to-indigo-600"
                    />
                    <KpiCard
                        title="Active Sessions"
                        value="845"
                        change="+5.2%"
                        icon={Activity}
                        color="from-cyan-500 to-blue-600"
                    />
                    <KpiCard
                        title="System Health"
                        value="98%"
                        change="+1.2%"
                        ctitle="VS Last Month"
                        icon={Settings}
                        color="from-pink-500 to-rose-600"
                    />
                    <KpiCard
                        title="Total Present"
                        value="15"
                        change="+1.2%"
                        ctitle="From Yesterday"
                        icon={User}
                        color="from-orange-500 to-orange-600"
                    />
                </div>
                <div className="col-span-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white border-b pb-2 mb-6">
                        HRIS Overview
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

                        {/* HR */}
                        <div className="relative overflow-hidden rounded-xl p-5 shadow-md bg-gradient-to-br from-purple-500/10 to-purple-700/10 
                                        border border-purple-500/20 backdrop-blur-sm transition-all hover:shadow-lg hover:scale-[1.02]">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/20 rounded-full blur-2xl"></div>

                            <p className="text-sm font-medium text-purple-700 dark:text-purple-300">HR</p>
                            <h2 className="text-3xl font-bold text-purple-900 dark:text-purple-100 mt-2">12</h2>
                        </div>

                        {/* Site Manager */}
                        <div className="relative overflow-hidden rounded-xl p-5 shadow-md bg-gradient-to-br from-cyan-500/10 to-cyan-700/10 
                                        border border-cyan-500/20 backdrop-blur-sm transition-all hover:shadow-lg hover:scale-[1.02]">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/20 rounded-full blur-2xl"></div>

                            <p className="text-sm font-medium text-cyan-700 dark:text-cyan-300">Site Manager</p>
                            <h2 className="text-3xl font-bold text-cyan-900 dark:text-cyan-100 mt-2">8</h2>
                        </div>

                        {/* Supervisor */}
                        <div className="relative overflow-hidden rounded-xl p-5 shadow-md bg-gradient-to-br from-emerald-500/10 to-emerald-700/10 
                                        border border-emerald-500/20 backdrop-blur-sm transition-all hover:shadow-lg hover:scale-[1.02]">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/20 rounded-full blur-2xl"></div>

                            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Supervisors</p>
                            <h2 className="text-3xl font-bold text-emerald-900 dark:text-emerald-100 mt-2">27</h2>
                        </div>

                        {/* Field Staff */}
                        <div className="relative overflow-hidden rounded-xl p-5 shadow-md bg-gradient-to-br from-orange-500/10 to-orange-700/10 
                                        border border-orange-500/20 backdrop-blur-sm transition-all hover:shadow-lg hover:scale-[1.02]">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/20 rounded-full blur-2xl"></div>

                            <p className="text-sm font-medium text-orange-700 dark:text-orange-300">Field Staff</p>
                            <h2 className="text-3xl font-bold text-orange-900 dark:text-orange-100 mt-2">350</h2>
                        </div>

                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="col-span-2 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Work Growth Analytics</h3>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">Work registration and activity trends</p>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200 dark:stroke-neutral-800" />
                                    <XAxis dataKey="name" className="text-xs text-neutral-500" />
                                    <YAxis className="text-xs text-neutral-500" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'rgba(23, 23, 23, 0.9)',
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: '#fff',
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="users"
                                        stroke="#8b5cf6"
                                        fillOpacity={1}
                                        fill="url(#colorUsers)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="active"
                                        stroke="#06b6d4"
                                        fillOpacity={1}
                                        fill="url(#colorActive)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                   <div className="rounded-xl md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 border border-neutral-200 bg-white/80 dark:bg-neutral-900/80 
                                    backdrop-blur-sm p-6 shadow-sm dark:border-neutral-800">

                        <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-white">
                            Recent Activity
                        </h3>

                        <div className="relative">

                            {/* Vertical timeline line */}
                            <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-neutral-200 dark:bg-neutral-700" />

                            <div className="space-y-6">

                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div 
                                        key={i}
                                        className="pl-10 relative flex flex-col gap-1 group"
                                    >
                                        {/* Dot */}
                                        <div className="absolute left-3 top-1.5 h-3 w-3 rounded-full 
                                                        bg-emerald-500 ring-4 ring-emerald-500/20 
                                                        transition-transform group-hover:scale-125" />

                                        {/* Content */}
                                        <p className="text-sm font-medium text-neutral-800 dark:text-neutral-100">
                                            New user registered
                                        </p>

                                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                            2 minutes ago
                                        </p>

                                        {/* Glow hover bar */}
                                        <div className="absolute inset-0 left-0 rounded-md 
                                                        bg-neutral-200/40 dark:bg-neutral-700/20 
                                                        opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

               <div className="col-span-3 rounded-xl border border-neutral-200 dark:border-neutral-800 
                    bg-white dark:bg-neutral-900 shadow-sm p-6">

                    {/* Header + Filters */}
                    <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                            Attendance Records
                        </h3>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="date"
                                className="rounded-lg border border-neutral-300 dark:border-neutral-700 
                                        bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-sm outline-none 
                                        dark:text-white"
                            />

                            <select
                                className="rounded-lg border border-neutral-300 dark:border-neutral-700 
                                        bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-sm outline-none 
                                        dark:text-white"
                            >
                                <option value="">All Status</option>
                                <option value="present">Present</option>
                                <option value="late">Late</option>
                                <option value="absent">Absent</option>
                                <option value="manual_correction">Manual Correction</option>
                            </select>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
                            <thead className="bg-neutral-100 dark:bg-neutral-800/50">
                                <tr>
                                    {[
                                        "User", 
                                        "Check In", 
                                        "Check-In Photo",
                                        "Check Out",
                                        "Checkout Photo",
                                        "Hours",
                                        "Overtime",
                                        "Status",
                                        "Action"
                                    ].map((head) => (
                                        <th
                                            key={head}
                                            className="px-4 py-3 text-left text-xs font-semibold 
                                                    text-neutral-600 dark:text-neutral-300 uppercase tracking-wide"
                                        >
                                            {head}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">

                                {/* Dummy rows with check-in/out photos */}
                               {attendanceData.map((row, idx) => (
                                    <tr
                                        key={idx}
                                        className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors"
                                    >
                                        {/* User */}
                                        <td className="px-4 py-3 text-sm text-neutral-900 dark:text-white">
                                            {row.user}
                                        </td>

                                        {/* Check-in time */}
                                        <td className="px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300">
                                            {row.check_in}
                                        </td>

                                        {/* Check-in Photo */}
                                        <td className="px-4 py-3">
                                            {row.checkin_photo ? (
                                                <img
                                                    src={row.checkin_photo}
                                                    className="h-10 w-10 rounded-lg object-cover border border-neutral-300 dark:border-neutral-700 shadow-sm"
                                                />
                                            ) : (
                                                <span className="text-xs text-neutral-400">—</span>
                                            )}
                                        </td>

                                        {/* Check-out time */}
                                        <td className="px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300">
                                            {row.check_out}
                                        </td>

                                        {/* Checkout photo */}
                                        <td className="px-4 py-3">
                                            {row.checkout_photo ? (
                                                <img
                                                    src={row.checkout_photo}
                                                    className="h-10 w-10 rounded-lg object-cover border border-neutral-300 dark:border-neutral-700 shadow-sm"
                                                />
                                            ) : (
                                                <span className="text-xs text-neutral-400">—</span>
                                            )}
                                        </td>

                                        {/* Total hours */}
                                        <td className="px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300">
                                            {row.hours} hrs
                                        </td>

                                        {/* Overtime */}
                                        <td className="px-4 py-3 text-sm font-medium">
                                            <span
                                                className={`
                                                    px-3 py-1 rounded-full text-xs
                                                    ${
                                                        Number(row.overtime) > 0
                                                            ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                                                            : "bg-neutral-300/20 text-neutral-600 dark:text-neutral-300"
                                                    }
                                                `}
                                            >
                                                {row.overtime} hrs
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td className="px-4 py-3 text-sm">
                                            <span
                                                className={`
                                                    px-3 py-1 rounded-full text-xs font-medium
                                                    ${
                                                        row.status === "present"
                                                            ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                                                            : row.status === "late"
                                                            ? "bg-orange-500/20 text-orange-700 dark:text-orange-300"
                                                            : row.status === "absent"
                                                            ? "bg-red-500/20 text-red-700 dark:text-red-300"
                                                            : "bg-blue-500/20 text-blue-700 dark:text-blue-300"
                                                    }
                                                `}
                                            >
                                                {row.status.replace("_", " ").toUpperCase()}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 cursor-pointer">
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </AppLayout>
    );
}

import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import { useState, useRef } from "react";

import { Users, CheckCircle, Camera, XCircle, Search, Filter, Loader2 } from "lucide-react";
import Webcam from "react-webcam";
import axios from "axios";

import KpiCard from "@/components/KpiCard";
import Modal from "@/components/Modal";

interface Props {
    users: any[];
}

/* ========================================================================
   MAIN COMPONENT
========================================================================= */

export default function Records({ users }: Props) {

    /* ----------------------- STATE ----------------------- */
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    const [isCapturing, setIsCapturing] = useState(false);
    const [error, setError] = useState("");

    /* ----------------------- FILTER LOGIC ----------------------- */

    const filtered = users.filter((u) => {
        const matchesSearch =
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            status === "registered" ? u.face :
            status === "pending" ? !u.face :
            true;

        return matchesSearch && matchesStatus;
    });

    /* ----------------------- KPI NUMBERS ----------------------- */
    const total = users.length;
    const registered = users.filter((u) => u.face).length;
    const pending = total - registered;

    /* ----------------------- WEBCAM ----------------------- */
    const webcamRef = useRef<any>(null);

    const captureAndRegister = async () => {
        if (!selectedUser) return;

        setIsCapturing(true);
        setError("");

        try {
            const img = webcamRef.current.getScreenshot();
            if (!img) {
                throw new Error("Failed to capture image from webcam");
            }

            const response = await axios.post(`/hr/users/${selectedUser.id}/face-register`, {
                image: img,
            });

            // Success - close modal and reload page
            setShowModal(false);
            setSelectedUser(null);

            // Reload the page to show updated data
            router.reload({ only: ['users'] });

        } catch (err: any) {
            console.error("Face registration error:", err);

            if (err.response?.data?.errors?.face) {
                setError(err.response.data.errors.face[0]);
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Failed to register face. Please try again.");
            }
        } finally {
            setIsCapturing(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
        setError("");
    };

    /* ----------------------- BREADCRUMBS ----------------------- */
    const breadcrumbs = [
        { title: "Face Recognition", href: "/hr/face/records" },
        { title: "Face Records", href: "#" },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Face Records" />

            <div className="p-6 bg-neutral-50 dark:bg-neutral-950 min-h-screen">

                <h1 className="text-2xl font-semibold mb-6 text-neutral-900 dark:text-white flex items-center gap-2">
                    <Camera className="w-6 h-6" /> Face Records
                </h1>

                {/* =======================================================
                    KPI CARDS
                ======================================================== */}
                <div className="grid gap-6 md:grid-cols-3 mb-8">
                    <KpiCard
                        title="Total Users"
                        value={total}
                        change="+2.4%"
                        ctitle="Growth"
                        icon={Users}
                        color="from-purple-500 to-indigo-600"
                    />

                    <KpiCard
                        title="Face Registered"
                        value={registered}
                        change="+8%"
                        ctitle="Completed"
                        icon={CheckCircle}
                        color="from-green-500 to-teal-600"
                    />

                    <KpiCard
                        title="Pending Registration"
                        value={pending}
                        change="-3%"
                        ctitle="Remaining"
                        icon={Camera}
                        color="from-orange-500 to-red-600"
                    />
                </div>

                {/* =======================================================
                    FILTER BAR
                ======================================================== */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">

                    {/* Search */}
                    <div className="relative w-full md:w-1/3">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            placeholder="Search user..."
                            className="pl-10 pr-3 py-2 border rounded-lg w-full dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                        />
                    </div>

                    {/* Filter */}
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                        <select
                            onChange={(e) => setStatus(e.target.value)}
                            className="px-3 py-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                        >
                            <option value="">All</option>
                            <option value="registered">Registered</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                </div>

                {/* =======================================================
                    TABLE
                ======================================================== */}
                <div className="bg-white dark:bg-neutral-900 rounded-xl border dark:border-neutral-800 shadow-sm p-6">

                    <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                        <thead className="bg-neutral-100 dark:bg-neutral-800/60">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">User</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Email</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Role</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Image</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                            {filtered.map((user) => (
                                <tr key={user.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition">

                                    {/* NAME */}
                                    <td className="px-4 py-4 font-medium text-neutral-900 dark:text-white">
                                        {user.name}
                                    </td>

                                    {/* EMAIL */}
                                    <td className="px-4 py-4 text-neutral-700 dark:text-neutral-300">
                                        {user.email}
                                    </td>

                                    {/* ROLE */}
                                    <td className="px-4 py-4 capitalize text-neutral-700 dark:text-neutral-300">
                                        {user.role}
                                    </td>

                                    {/* STATUS */}
                                    <td className="px-4 py-4">
                                        {user.face ? (
                                            <span className="text-green-600 dark:text-green-400 flex items-center gap-2">
                                                <CheckCircle className="h-5 w-5" /> Registered
                                            </span>
                                        ) : (
                                            <span className="text-red-600 dark:text-red-400 flex items-center gap-2">
                                                <XCircle className="h-5 w-5" /> Pending
                                            </span>
                                        )}
                                    </td>

                                    {/* IMAGE */}
                                    <td className="px-4 py-4">
                                        {user.face?.registered_image ? (
                                            <img
                                                src={`/storage/${user.face.registered_image}`}
                                                className="w-16 h-16 rounded-lg object-cover shadow"
                                                alt={`${user.name}'s face`}
                                            />
                                        ) : (
                                            <span className="text-neutral-400">—</span>
                                        )}
                                    </td>

                                    {/* ACTION */}
                                    <td className="px-4 py-4">
                                        <button
                                            onClick={() => { setSelectedUser(user); setShowModal(true); }}
                                            className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                        >
                                            {user.face ? 'Re-register' : 'Register'}
                                        </button>
                                    </td>

                                </tr>
                            ))}

                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="py-6 text-center text-neutral-500 dark:text-neutral-400">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>

                {/* =======================================================
                    FACE REGISTER MODAL
                ======================================================== */}
                <Modal show={showModal} onClose={handleCloseModal}>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-neutral-900 dark:text-white">
                        <Camera className="w-6 h-6" /> Register Face for {selectedUser?.name}
                    </h2>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col items-center gap-4">
                        <Webcam
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="rounded-lg w-full shadow"
                            videoConstraints={{ width: 480, height: 360, facingMode: "user" }}
                        />

                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={handleCloseModal}
                                disabled={isCapturing}
                                className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800 transition disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={captureAndRegister}
                                disabled={isCapturing}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 flex items-center gap-2"
                            >
                                {isCapturing ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    'Capture & Save'
                                )}
                            </button>
                        </div>
                    </div>
                </Modal>

            </div>
        </AppLayout>
    );
}

import React, { useState } from "react";
import { Head, useForm, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import DataTable from "@/components/DataTable";
import Modal from "@/components/Modal";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { route } from 'ziggy-js';



import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { format } from "date-fns";
import { Pencil, Trash2, Plus } from "lucide-react";

import Heading from "@/components/heading";


interface User {
    id: number;
    name: string;
}

interface Attendance {
    id: number;
    user_id: number;
    user: User;
    date: string;
    check_in_time: string;
    check_out_time: string | null;
    worked_hours: string;
    notes: string | null;
    submitted_by_user: User | null;
}

interface Props {
    attendances: {
        data: Attendance[];
        links: any[];
        meta: any;
    };
    employees: User[];
    filters: {
        search?: string;
        date?: string;
    };
}

export default function ManualCorrection({ attendances, employees, filters }: Props) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedAttendance, setSelectedAttendance] = useState<Attendance | null>(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        user_id: '',
        date: '',
        check_in_time: '',
        check_out_time: '',
        notes: '',
    });

    const openAddModal = () => {
        reset();
        setIsAddModalOpen(true);
    };

    const openEditModal = (attendance: Attendance) => {
        setSelectedAttendance(attendance);
        setData({
            user_id: attendance.user_id.toString(),
            date: attendance.date,
            check_in_time: attendance.check_in_time ? format(new Date(attendance.check_in_time), 'HH:mm') : '',
            check_out_time: attendance.check_out_time ? format(new Date(attendance.check_out_time), 'HH:mm') : '',
            notes: attendance.notes || '',
        });
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (attendance: Attendance) => {
        setSelectedAttendance(attendance);
        setIsDeleteModalOpen(true);
    };

    const handleAddSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('hr.manual-attendance.store'), {
            onSuccess: () => {
                setIsAddModalOpen(false);
                reset();
            },
        });
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedAttendance) return;
        put(route('hr.manual-attendance.update', selectedAttendance.id), {
            onSuccess: () => {
                setIsEditModalOpen(false);
                reset();
            },
        });
    };

    const handleDeleteSubmit = () => {
        if (!selectedAttendance) return;
        destroy(route('hr.manual-attendance.destroy', selectedAttendance.id), {
            onSuccess: () => setIsDeleteModalOpen(false),
        });
    };

    const columns = [
        {
            header: 'Employee',
            accessorKey: 'user.name',
        },
        {
            header: 'Date',
            accessorKey: 'date',
            cell: (info: any) => format(new Date(info.getValue()), 'MMM dd, yyyy'),
        },
        {
            header: 'In Time',
            accessorKey: 'check_in_time',
            cell: (info: any) => info.getValue() ? format(new Date(info.getValue()), 'hh:mm a') : '-',
        },
        {
            header: 'Out Time',
            accessorKey: 'check_out_time',
            cell: (info: any) => info.getValue() ? format(new Date(info.getValue()), 'hh:mm a') : '-',
        },
        {
            header: 'Hours',
            accessorKey: 'worked_hours',
        },
        {
            header: 'Notes',
            accessorKey: 'notes',
        },
        {
            header: 'Created By',
            accessorKey: 'submitted_by_user.name',
            cell: (info: any) => info.getValue() || 'System',
        },
        {
            header: 'Actions',
            id: 'actions',
            cell: (info: any) => (
                <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => openEditModal(info.row.original)}>
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500" onClick={() => openDeleteModal(info.row.original)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <AppLayout>
            <Head title="Manual Attendance Correction" />

            <div className="flex justify-between items-center mb-6">
                <Heading title="Manual Attendance Correction" description="Manage manual attendance records" />
                <Button onClick={openAddModal}>
                    <Plus className="mr-2 h-4 w-4" /> Add Attendance
                </Button>
            </div>

       {/* ======================== TABLE ============================== */}
<div className="bg-white dark:bg-neutral-900 border dark:border-neutral-800 rounded-xl shadow-sm p-6 overflow-x-auto">

    <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
        <thead className="bg-neutral-100 dark:bg-neutral-800/60">
            <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Employee</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Check In</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Check Out</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Hours</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Notes</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Created By</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Actions</th>
            </tr>
        </thead>

        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">

            {attendances.data.map((rec) => (
                <tr key={rec.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40">

                    {/* EMPLOYEE */}
                    <td className="px-4 py-4 font-medium text-neutral-900 dark:text-white">
                        {rec.user?.name}
                        <div className="text-sm text-neutral-500">{rec.user?.email ?? "—"}</div>
                    </td>

                    {/* DATE */}
                    <td className="px-4 py-4 text-neutral-700 dark:text-neutral-300">
                       {rec.date || "—"}
                    </td>

                    {/* CHECK IN */}
                    <td className="px-4 py-4 text-neutral-700 dark:text-neutral-300">
                        {rec.check_in_time || "—"}
                    </td>

                    {/* CHECK OUT */}
                    <td className="px-4 py-4 text-neutral-700 dark:text-neutral-300">
                       {rec.check_out_time || "—"}
                    </td>

                    {/* WORKED HOURS */}
                    <td className="px-4 py-4 text-neutral-700 dark:text-neutral-300">
                        {rec.worked_hours ?? "—"}
                    </td>

                    {/* NOTES */}
                    <td className="px-4 py-4 text-neutral-700 dark:text-neutral-300">
                        {rec.notes || "—"}
                    </td>

                    {/* CREATED BY */}
                    <td className="px-4 py-4 text-neutral-700 dark:text-neutral-300">
                        {rec.submitted_by_user?.name ?? "System"}
                    </td>

                    {/* ACTIONS */}
                    <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => openEditModal(rec)}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                <Pencil className="h-4 w-4" />
                            </button>

                            <button
                                onClick={() => openDeleteModal(rec)}
                                className="text-red-600 hover:text-red-800"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </td>
                </tr>
            ))}

            {attendances.data.length === 0 && (
                <tr>
                    <td
                        colSpan={8}
                        className="text-center py-6 text-neutral-500 dark:text-neutral-400"
                    >
                        No manual attendance records found.
                    </td>
                </tr>
            )}
        </tbody>
    </table>
</div>


            {/* Add Modal */}
            <Modal show={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} maxWidth="md">
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Add Manual Attendance</h2>
                    <form onSubmit={handleAddSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="user_id">Employee</Label>
                            <Select
                                value={data.user_id}
                                onValueChange={(value) => setData('user_id', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Employee" />
                                </SelectTrigger>
                                <SelectContent>
                                    {employees.map((emp) => (
                                        <SelectItem key={emp.id} value={emp.id.toString()}>
                                            {emp.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.user_id && <div className="text-red-500 text-sm mt-1">{errors.user_id}</div>}
                        </div>

                        <div>
                            <Label htmlFor="date">Date</Label>
                            <Input
                                type="date"
                                id="date"
                                value={data.date}
                                onChange={(e) => setData('date', e.target.value)}
                            />
                            {errors.date && <div className="text-red-500 text-sm mt-1">{errors.date}</div>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="check_in_time">Check In</Label>
                                <Input
                                    type="time"
                                    id="check_in_time"
                                    value={data.check_in_time}
                                    onChange={(e) => setData('check_in_time', e.target.value)}
                                />
                                {errors.check_in_time && <div className="text-red-500 text-sm mt-1">{errors.check_in_time}</div>}
                            </div>
                            <div>
                                <Label htmlFor="check_out_time">Check Out</Label>
                                <Input
                                    type="time"
                                    id="check_out_time"
                                    value={data.check_out_time}
                                    onChange={(e) => setData('check_out_time', e.target.value)}
                                />
                                {errors.check_out_time && <div className="text-red-500 text-sm mt-1">{errors.check_out_time}</div>}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea
                                id="notes"
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                            />
                            {errors.notes && <div className="text-red-500 text-sm mt-1">{errors.notes}</div>}
                        </div>

                        <div className="flex justify-end space-x-2 mt-6">
                            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={processing}>Save</Button>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Edit Modal */}
            <Modal show={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} maxWidth="md">
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Edit Manual Attendance</h2>
                    <form onSubmit={handleEditSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="edit_user_id">Employee</Label>
                            <Select
                                value={data.user_id}
                                onValueChange={(value) => setData('user_id', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Employee" />
                                </SelectTrigger>
                                <SelectContent>
                                    {employees.map((emp) => (
                                        <SelectItem key={emp.id} value={emp.id.toString()}>
                                            {emp.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.user_id && <div className="text-red-500 text-sm mt-1">{errors.user_id}</div>}
                        </div>

                        <div>
                            <Label htmlFor="edit_date">Date</Label>
                            <Input
                                type="date"
                                id="edit_date"
                                value={data.date}
                                onChange={(e) => setData('date', e.target.value)}
                            />
                            {errors.date && <div className="text-red-500 text-sm mt-1">{errors.date}</div>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="edit_check_in_time">Check In</Label>
                                <Input
                                    type="time"
                                    id="edit_check_in_time"
                                    value={data.check_in_time}
                                    onChange={(e) => setData('check_in_time', e.target.value)}
                                />
                                {errors.check_in_time && <div className="text-red-500 text-sm mt-1">{errors.check_in_time}</div>}
                            </div>
                            <div>
                                <Label htmlFor="edit_check_out_time">Check Out</Label>
                                <Input
                                    type="time"
                                    id="edit_check_out_time"
                                    value={data.check_out_time}
                                    onChange={(e) => setData('check_out_time', e.target.value)}
                                />
                                {errors.check_out_time && <div className="text-red-500 text-sm mt-1">{errors.check_out_time}</div>}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="edit_notes">Notes</Label>
                            <Textarea
                                id="edit_notes"
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                            />
                            {errors.notes && <div className="text-red-500 text-sm mt-1">{errors.notes}</div>}
                        </div>

                        <div className="flex justify-end space-x-2 mt-6">
                            <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={processing}>Update</Button>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Delete Modal */}
            <Modal show={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} maxWidth="sm">
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Delete Attendance</h2>
                    <p className="text-gray-500 mb-6">Are you sure you want to delete this attendance record? This action cannot be undone.</p>
                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDeleteSubmit} disabled={processing}>Delete</Button>
                    </div>
                </div>
            </Modal>
        </AppLayout>
    );
}

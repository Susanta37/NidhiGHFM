"use client";

import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";

import KpiCard from "@/components/KpiCard";
import DynamicFilterBar from "@/components/DynamicFilterBar";
import Modal from "@/components/Modal";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Calendar, Plus, Edit3, Trash2 } from "lucide-react";

/**
 * Expects:
 * assignments (paginated) with relations shift, user
 * shifts list, users list, filters, kpi
 */
interface Props {
  assignments: any;
  shifts: any[];
  users: any[];
  filters: any;
  kpi: {
    total: number;
    today: number;
    distinctUsers: number;
  };
}

export default function ShiftAssignmentsIndex({ assignments, shifts = [], users = [], filters, kpi }: Props) {
  const [showAssign, setShowAssign] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [deleting, setDeleting] = useState<any | null>(null);

  const [filterValues, setFilterValues] = useState({
    shift_id: filters.shift_id || "",
    user_id: filters.user_id || "",
    date: filters.date || "",
  });

  const [assignForm, setAssignForm] = useState({
    shift_id: "",
    user_id: "",
    date: "",
    status: "assigned",
  });

  const handleFilter = (key: string, value: string) => {
    const next = { ...filterValues, [key]: value };
    setFilterValues(next);
    router.get("/super-admin/shift-assignments", next, { preserveScroll: true });
  };

  return (
    <AppLayout>
      <Head title="Shift Assignments" />
      <div className="p-6 min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Calendar className="h-6 w-6" /> Shift Assignments
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <KpiCard title="Total Assignments" value={kpi.total} icon={Calendar} color="from-blue-500 to-sky-600" />
          <KpiCard title="Today's Assignments" value={kpi.today} icon={Plus} color="from-green-500 to-emerald-600" />
          <KpiCard title="Distinct Users" value={kpi.distinctUsers} icon={Edit3} color="from-purple-500 to-indigo-600" />
        </div>

        <DynamicFilterBar
          filters={[
            { key: "shift_id", label: "Shift", type: "select", options: [{ label: "All", value: "" }, ...shifts.map(s => ({ label: s.name, value: s.id }))] },
            { key: "user_id", label: "User", type: "select", options: [{ label: "All", value: "" }, ...users.map(u => ({ label: u.name, value: u.id }))] },
            { key: "date", label: "Date", type: "date" },
          ]}
          values={filterValues}
          onChange={handleFilter}
        />

        <div className="flex justify-end mb-4">
          <Button className="bg-blue-600 text-white" onClick={() => setShowAssign(true)}>
            <Plus className="w-4 h-4 mr-1" /> Assign Shift
          </Button>
        </div>

        <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border dark:border-neutral-800">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Shift</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {assignments.data.map((a: any, idx: number) => (
                <TableRow key={a.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{a.user?.name ?? "—"}</TableCell>
                  <TableCell>{a.shift?.name ?? "—"}</TableCell>
                  <TableCell>{a.date}</TableCell>
                  <TableCell>{a.status}</TableCell>
                  <TableCell className="text-right flex justify-end gap-3">
                    <button onClick={() => setEditing(a)} className="text-blue-600 hover:underline flex items-center gap-1"><Edit3 className="h-4 w-4" /> Edit</button>
                    <button onClick={() => setDeleting(a)} className="text-red-600 hover:underline flex items-center gap-1"><Trash2 className="h-4 w-4" /> Delete</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="mt-6 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); if (assignments.prev_page_url) router.get(assignments.prev_page_url); }} />
                </PaginationItem>

                {Array.from({ length: assignments.last_page || 1 }, (_, i) => i + 1).map(page => (
                  <PaginationItem key={page}>
                    <PaginationLink isActive={page === assignments.current_page}>
                      <a href={`?page=${page}`} onClick={(e) => { e.preventDefault(); router.get(`/super-admin/shift-assignments?page=${page}`); }}>{page}</a>
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext href="#" onClick={(e) => { e.preventDefault(); if (assignments.next_page_url) router.get(assignments.next_page_url); }} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>

        {/* ASSIGN MODAL */}
        {showAssign && (
          <Modal show={showAssign} onClose={() => setShowAssign(false)} title="Assign Shift">
            <div className="grid gap-3">
              <select className="border rounded p-2" value={assignForm.shift_id} onChange={(e) => setAssignForm({ ...assignForm, shift_id: e.target.value })}>
                <option value="">Select Shift</option>
                {shifts.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>

              <select className="border rounded p-2" value={assignForm.user_id} onChange={(e) => setAssignForm({ ...assignForm, user_id: e.target.value })}>
                <option value="">Select User</option>
                {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>

              <Input type="date" value={assignForm.date} onChange={(e) => setAssignForm({ ...assignForm, date: e.target.value })} />
              <select className="border rounded p-2" value={assignForm.status} onChange={(e) => setAssignForm({ ...assignForm, status: e.target.value })}>
                <option value="assigned">Assigned</option>
                <option value="confirmed">Confirmed</option>
              </select>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAssign(false)}>Cancel</Button>
                <Button className="bg-blue-600 text-white" onClick={() => {
                  router.post("/super-admin/shift-assignments", assignForm, {
                    onSuccess: () => { setShowAssign(false); setAssignForm({ shift_id: "", user_id: "", date: "", status: "assigned" }); }
                  });
                }}>Assign</Button>
              </div>
            </div>
          </Modal>
        )}

        {/* EDIT ASSIGNMENT */}
        {editing && (
          <Modal show={!!editing} onClose={() => setEditing(null)} title="Edit Assignment">
            <div className="grid gap-3">
              <select className="border rounded p-2" value={editing.shift_id} onChange={(e) => setEditing({ ...editing, shift_id: e.target.value })}>
                {shifts.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>

              <select className="border rounded p-2" value={editing.user_id} onChange={(e) => setEditing({ ...editing, user_id: e.target.value })}>
                {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>

              <Input type="date" value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} />
              <select className="border rounded p-2" value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })}>
                <option value="assigned">Assigned</option>
                <option value="confirmed">Confirmed</option>
              </select>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
                <Button className="bg-blue-600 text-white" onClick={() =>
                  router.put(`/super-admin/shift-assignments/${editing.id}`, {
                    shift_id: editing.shift_id,
                    user_id: editing.user_id,
                    date: editing.date,
                    status: editing.status
                  }, { onSuccess: () => setEditing(null) })
                }>Save</Button>
              </div>
            </div>
          </Modal>
        )}

        {/* DELETE */}
        {deleting && (
          <Modal show={!!deleting} onClose={() => setDeleting(null)} title="Delete Assignment">
            <div>
              <p className="mb-4">Delete assignment for <strong>{deleting.user?.name}</strong> on <strong>{deleting.date}</strong>?</p>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDeleting(null)}>Cancel</Button>
                <Button className="bg-red-600 text-white" onClick={() => router.delete(`/super-admin/shift-assignments/${deleting.id}`, { onSuccess: () => setDeleting(null) })}>Delete</Button>
              </div>
            </div>
          </Modal>
        )}

      </div>
    </AppLayout>
  );
}

import AppLayout from "@/layouts/app-layout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "@/components/Modal";
import KpiCard from "@/components/KpiCard";
import DynamicFilterBar from "@/components/DynamicFilterBar";

import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

import {
  Pagination, PaginationContent, PaginationItem, PaginationLink,
  PaginationPrevious, PaginationNext,
} from "@/components/ui/pagination";

import { Users, ClipboardList, Calendar, Edit3, Trash2, Check } from "lucide-react";

interface Props {
  assignments: any;
  jobs: any[];
  users: any[];
  shifts: any[];
  filters: any;
  kpi: {
    total: number;
    today: number;
    users: number;
  };
}

export default function JobAssignmentsIndex({ assignments, jobs = [], users = [], shifts = [], filters, kpi }: Props) {
  const [showCreate, setShowCreate] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [deleting, setDeleting] = useState<any | null>(null);

  const [filterValues, setFilterValues] = useState({
    job_id: filters.job_id || "",
    user_id: filters.user_id || "",
    shift_id: filters.shift_id || "",
    assigned_date: filters.assigned_date || "",
  });

  const handleFilter = (key: string, value: string) => {
    const next = { ...filterValues, [key]: value };
    setFilterValues(next);
    router.get("/super-admin/job-assignments", next, { preserveScroll: true });
  };

  // Create form state
  const [form, setForm] = useState({
    job_id: "",
    user_id: "",
    shift_id: "",
    assigned_date: "",
    status: "assigned",
  });

  return (
    <AppLayout>
      <Head title="Job Assignments" />

      <div className="p-6 min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <ClipboardList className="h-6 w-6" /> Job Assignments
        </h1>

        {/* KPI */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <KpiCard title="Total Assignments" value={kpi.total} icon={ClipboardList} color="from-blue-500 to-sky-600" />
          <KpiCard title="Today's Assignments" value={kpi.today} icon={Calendar} color="from-green-500 to-emerald-600" />
          <KpiCard title="Assigned Users" value={kpi.users} icon={Users} color="from-purple-500 to-indigo-600" />
        </div>

        {/* Filters */}
        <DynamicFilterBar
          filters={[
            {
              key: "job_id",
              label: "Job",
              type: "select",
              options: [{ label: "All Jobs", value: "" }, ...jobs.map(j => ({ label: j.title, value: j.id }))],
            },
            {
              key: "user_id",
              label: "User",
              type: "select",
              options: [{ label: "All Users", value: "" }, ...users.map(u => ({ label: u.name, value: u.id }))],
            },
            {
              key: "shift_id",
              label: "Shift",
              type: "select",
              options: [{ label: "All Shifts", value: "" }, ...shifts.map(s => ({ label: s.name, value: s.id }))],
            },
            {
              key: "assigned_date",
              label: "Date",
              type: "date",
            },
          ]}
          values={filterValues}
          onChange={handleFilter}
        />

        <div className="flex justify-end mb-4 -mt-2">
          <Button className="bg-blue-600 text-white" onClick={() => setShowCreate(true)}>
            <Calendar className="w-4 h-4 mr-1" /> Assign Job
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border dark:border-neutral-800">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Job</TableHead>
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
                  <TableCell className="font-medium">{a.job?.title ?? "—"}</TableCell>
                  <TableCell>{a.user?.name ?? "—"}</TableCell>
                  <TableCell>{a.shift?.name ?? "—"}</TableCell>
                  <TableCell>{a.assigned_date}</TableCell>
                  <TableCell>
                    <span className={`inline-block px-2 py-1 text-xs rounded ${a.status === "completed" ? "bg-green-100 text-green-700" : a.status === "in_progress" ? "bg-yellow-100 text-yellow-700" : "bg-neutral-100 text-neutral-700"}`}>
                      {a.status}
                    </span>
                  </TableCell>

                  <TableCell className="text-right flex justify-end gap-3">
                    <button onClick={() => setEditing(a)} className="text-blue-600 flex items-center gap-1 hover:underline">
                      <Edit3 className="h-4 w-4" /> Edit
                    </button>

                    <button onClick={() => setDeleting(a)} className="text-red-600 flex items-center gap-1 hover:underline">
                      <Trash2 className="h-4 w-4" /> Delete
                    </button>
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
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (assignments.prev_page_url) router.get(assignments.prev_page_url);
                    }}
                  />
                </PaginationItem>

                {Array.from({ length: assignments.last_page || 1 }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink isActive={page === assignments.current_page}>
                      <a href={`?page=${page}`} onClick={(e) => { e.preventDefault(); router.get(`/super-admin/job-assignments?page=${page}`, { preserveState: true }); }}>
                        {page}
                      </a>
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (assignments.next_page_url) router.get(assignments.next_page_url);
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>

        {/* CREATE ASSIGNMENT MODAL */}
        {showCreate && (
          <Modal show={showCreate} onClose={() => setShowCreate(false)} title="Assign Job to User">
            <div className="grid gap-3">
              <select className="border rounded p-2 dark:bg-neutral-800" value={form.job_id} onChange={(e) => setForm({ ...form, job_id: e.target.value })}>
                <option value="">Select Job</option>
                {jobs.map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
              </select>

              <select className="border rounded p-2 dark:bg-neutral-800" value={form.user_id} onChange={(e) => setForm({ ...form, user_id: e.target.value })}>
                <option value="">Select User</option>
                {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>

              <select className="border rounded p-2 dark:bg-neutral-800" value={form.shift_id} onChange={(e) => setForm({ ...form, shift_id: e.target.value })}>
                <option value="">Select Shift</option>
                {shifts.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>

              <Input type="date" value={form.assigned_date} onChange={(e) => setForm({ ...form, assigned_date: e.target.value })} />
              <select className="border rounded p-2 dark:bg-neutral-800" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="assigned">assigned</option>
                <option value="in_progress">in_progress</option>
                <option value="completed">completed</option>
              </select>

              <div className="flex justify-end gap-2 mt-2">
                <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
                <Button className="bg-blue-600 text-white" onClick={() => {
                  router.post("/super-admin/job-assignments", form, {
                    onSuccess: () => {
                      setShowCreate(false);
                      setForm({ job_id: "", user_id: "", shift_id: "", assigned_date: "", status: "assigned" });
                    }
                  });
                }}>
                  Assign
                </Button>
              </div>
            </div>
          </Modal>
        )}

        {/* EDIT ASSIGNMENT MODAL */}
        {editing && (
          <Modal show={!!editing} onClose={() => setEditing(null)} title="Edit Assignment">
            <div className="grid gap-3">
              <select className="border rounded p-2 dark:bg-neutral-800" value={editing.job_id} onChange={(e) => setEditing({ ...editing, job_id: e.target.value })}>
                {jobs.map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
              </select>

              <select className="border rounded p-2 dark:bg-neutral-800" value={editing.user_id} onChange={(e) => setEditing({ ...editing, user_id: e.target.value })}>
                {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>

              <select className="border rounded p-2 dark:bg-neutral-800" value={editing.shift_id} onChange={(e) => setEditing({ ...editing, shift_id: e.target.value })}>
                {shifts.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>

              <Input type="date" value={editing.assigned_date} onChange={(e) => setEditing({ ...editing, assigned_date: e.target.value })} />

              <select className="border rounded p-2 dark:bg-neutral-800" value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })}>
                <option value="assigned">assigned</option>
                <option value="in_progress">in_progress</option>
                <option value="completed">completed</option>
              </select>

              <div className="flex justify-end gap-2 mt-2">
                <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
                <Button className="bg-blue-600 text-white" onClick={() => {
                  router.put(`/super-admin/job-assignments/${editing.id}`, editing, {
                    onSuccess: () => setEditing(null)
                  });
                }}>Save</Button>
              </div>
            </div>
          </Modal>
        )}

        {/* DELETE MODAL */}
        {deleting && (
          <Modal show={!!deleting} onClose={() => setDeleting(null)} title="Delete Assignment">
            <div>
              <p className="mb-4">Delete assignment for <strong>{deleting.user?.name}</strong> on <strong>{deleting.assigned_date}</strong>?</p>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDeleting(null)}>Cancel</Button>
                <Button className="bg-red-600 text-white" onClick={() => {
                  router.delete(`/super-admin/job-assignments/${deleting.id}`, { onSuccess: () => setDeleting(null) });
                }}>Delete</Button>
              </div>
            </div>
          </Modal>
        )}

      </div>
    </AppLayout>
  );
}

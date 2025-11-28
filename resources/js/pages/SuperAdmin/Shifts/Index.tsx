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

import { Clock, Plus, Edit3, Trash2 } from "lucide-react";

/**
 * Expects controller to return:
 * shifts (paginated), clients (array {id,name}), sites (array {id,site_name}), filters, kpi
 */
interface Props {
  shifts: any;
  clients: any[];
  sites: any[];
  filters: any;
  kpi: {
    total: number;
    byClients: number;
    bySites: number;
  };
}

export default function ShiftIndex({ shifts, clients = [], sites = [], filters, kpi }: Props) {
  // UI state
  const [showCreate, setShowCreate] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [deleting, setDeleting] = useState<any | null>(null);

  const [filterValues, setFilterValues] = useState({
    search: filters.search || "",
    client_id: filters.client_id || "",
    site_id: filters.site_id || "",
  });

  // Create form
  const [createForm, setCreateForm] = useState({
    client_id: "",
    site_id: "",
    name: "",
    start_time: "09:00",
    end_time: "18:00",
    break_minutes: 0,
    tasks: [] as string[],
    newTask: "",
    auto_assign_rules: {} as Record<string, any>,
  });

  // Edit form is bound to `editing`
  const startEdit = (s: any) => {
    setEditing(s);
  };

  const handleFilter = (key: string, value: string) => {
    const next = { ...filterValues, [key]: value };
    setFilterValues(next);
    router.get("/super-admin/shifts", next, { preserveScroll: true, replace: true });
  };

  return (
    <AppLayout>
      <Head title="Shift Management" />
      <div className="p-6 min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Clock className="h-6 w-6" /> Shift Management
        </h1>

        {/* KPI */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <KpiCard title="Total Shifts" value={kpi.total} icon={Clock} color="from-blue-500 to-sky-600" />
          <KpiCard title="Clients with Shifts" value={kpi.byClients} icon={Plus} color="from-green-500 to-emerald-600" />
          <KpiCard title="Sites with Shifts" value={kpi.bySites} icon={Edit3} color="from-purple-500 to-indigo-600" />
        </div>

        {/* Filter bar */}
        <DynamicFilterBar
          filters={[
            { key: "search", label: "Search", type: "text", icon: "search", placeholder: "Shift name..." },
            {
              key: "client_id",
              label: "Client",
              type: "select",
              options: [{ label: "All Clients", value: "" }, ...clients.map((c: any) => ({ label: c.name, value: c.id }))],
            },
            {
              key: "site_id",
              label: "Site",
              type: "select",
              options: [{ label: "All Sites", value: "" }, ...sites.map((s: any) => ({ label: s.site_name, value: s.id }))],
            },
          ]}
          values={filterValues}
          onChange={handleFilter}
        />

        <div className="flex justify-end mb-4">
          <Button className="bg-blue-600 text-white" onClick={() => setShowCreate(true)}>
            <Plus className="w-4 h-4 mr-1" /> New Shift
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border dark:border-neutral-800">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Shift Name</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Site</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Break (min)</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {shifts?.data?.map((s: any, idx: number) => (
                <TableRow key={s.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>{s.client?.name ?? "—"}</TableCell>
                  <TableCell>{s.site?.site_name ?? "—"}</TableCell>
                  <TableCell>{s.start_time} — {s.end_time}</TableCell>
                  <TableCell>{s.break_minutes ?? 0}</TableCell>
                  <TableCell className="text-right flex justify-end gap-3">
                    <button onClick={() => startEdit(s)} className="text-blue-600 flex items-center gap-1 hover:underline">
                      <Edit3 className="h-4 w-4" /> Edit
                    </button>
                    <button onClick={() => setDeleting(s)} className="text-red-600 flex items-center gap-1 hover:underline">
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
                      if (shifts.prev_page_url) router.get(shifts.prev_page_url);
                    }}
                  />
                </PaginationItem>

                {Array.from({ length: shifts.last_page || 1 }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink isActive={page === shifts.current_page}>
                      {/* preserve querystring */}
                      <a
                        href={`?page=${page}`}
                        onClick={(e) => {
                          e.preventDefault();
                          router.get(`/super-admin/shifts?page=${page}`, { preserveState: true });
                        }}
                      >
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
                      if (shifts.next_page_url) router.get(shifts.next_page_url);
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>

        {/* CREATE MODAL */}
        {showCreate && (
          <Modal show={showCreate} onClose={() => setShowCreate(false)} title="Create Shift">
            <div className="grid gap-3">
              <select
                className="border rounded p-2 dark:bg-neutral-800"
                value={createForm.client_id}
                onChange={(e) => setCreateForm({ ...createForm, client_id: e.target.value })}
              >
                <option value="">Select Client</option>
                {clients.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>

              <select
                className="border rounded p-2 dark:bg-neutral-800"
                value={createForm.site_id}
                onChange={(e) => setCreateForm({ ...createForm, site_id: e.target.value })}
              >
                <option value="">Select Site</option>
                {sites.map((s: any) => <option key={s.id} value={s.id}>{s.site_name}</option>)}
              </select>

              <Input placeholder="Shift name" value={createForm.name} onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })} />
              <div className="grid grid-cols-2 gap-2">
                <Input type="time" value={createForm.start_time} onChange={(e) => setCreateForm({ ...createForm, start_time: e.target.value })} />
                <Input type="time" value={createForm.end_time} onChange={(e) => setCreateForm({ ...createForm, end_time: e.target.value })} />
              </div>
              <Input type="number" placeholder="Break minutes" value={String(createForm.break_minutes)} onChange={(e) => setCreateForm({ ...createForm, break_minutes: Number(e.target.value) })} />

              {/* tasks simple builder */}
              <div>
                <label className="text-sm font-medium mb-2 block">Tasks</label>
                <div className="flex gap-2">
                  <Input placeholder="New task" value={createForm.newTask} onChange={(e) => setCreateForm({ ...createForm, newTask: e.target.value })} />
                  <Button onClick={() => {
                    if (!createForm.newTask) return;
                    setCreateForm({ ...createForm, tasks: [...createForm.tasks, createForm.newTask], newTask: "" });
                  }}>Add</Button>
                </div>
                <ul className="mt-2 list-disc ml-5">
                  {createForm.tasks.map((t, i) => <li key={i} className="flex items-center justify-between gap-3">
                    <span>{t}</span>
                    <button className="text-red-500" onClick={() => setCreateForm({ ...createForm, tasks: createForm.tasks.filter((_, idx) => idx !== i) })}>Remove</button>
                  </li>)}
                </ul>
              </div>

              <div className="flex justify-end gap-2 mt-3">
                <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
                <Button className="bg-blue-600 text-white" onClick={() => {
                  const payload = {
                    client_id: createForm.client_id,
                    site_id: createForm.site_id,
                    name: createForm.name,
                    start_time: createForm.start_time,
                    end_time: createForm.end_time,
                    break_minutes: createForm.break_minutes,
                    tasks: createForm.tasks,
                    auto_assign_rules: createForm.auto_assign_rules,
                  };
                  router.post("/super-admin/shifts", payload, {
                    onSuccess: () => {
                      setShowCreate(false);
                      setCreateForm({
                        client_id: "",
                        site_id: "",
                        name: "",
                        start_time: "09:00",
                        end_time: "18:00",
                        break_minutes: 0,
                        tasks: [],
                        newTask: "",
                        auto_assign_rules: {},
                      });
                    }
                  });
                }}>Save Shift</Button>
              </div>
            </div>
          </Modal>
        )}

        {/* EDIT MODAL */}
        {editing && (
          <Modal show={!!editing} onClose={() => setEditing(null)} title="Edit Shift">
            <div className="grid gap-3">
              <select className="border rounded p-2 dark:bg-neutral-800" value={editing.client_id} onChange={(e) => setEditing({ ...editing, client_id: e.target.value })}>
                <option value="">Select Client</option>
                {clients.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>

              <select className="border rounded p-2 dark:bg-neutral-800" value={editing.site_id} onChange={(e) => setEditing({ ...editing, site_id: e.target.value })}>
                <option value="">Select Site</option>
                {sites.map((s: any) => <option key={s.id} value={s.id}>{s.site_name}</option>)}
              </select>

              <Input placeholder="Shift name" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              <div className="grid grid-cols-2 gap-2">
                <Input type="time" value={editing.start_time} onChange={(e) => setEditing({ ...editing, start_time: e.target.value })} />
                <Input type="time" value={editing.end_time} onChange={(e) => setEditing({ ...editing, end_time: e.target.value })} />
              </div>
              <Input type="number" placeholder="Break minutes" value={String(editing.break_minutes ?? "")} onChange={(e) => setEditing({ ...editing, break_minutes: Number(e.target.value) })} />

              <div className="flex justify-end gap-2 mt-3">
                <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
                <Button className="bg-blue-600 text-white" onClick={() =>
                  router.put(`/super-admin/shifts/${editing.id}`, {
                    client_id: editing.client_id,
                    site_id: editing.site_id,
                    name: editing.name,
                    start_time: editing.start_time,
                    end_time: editing.end_time,
                    break_minutes: editing.break_minutes,
                    tasks: editing.tasks || [],
                    auto_assign_rules: editing.auto_assign_rules || {},
                  }, {
                    onSuccess: () => setEditing(null),
                  })
                }>Save Changes</Button>
              </div>
            </div>
          </Modal>
        )}

        {/* DELETE CONFIRM */}
        {deleting && (
          <Modal show={!!deleting} onClose={() => setDeleting(null)} title="Delete Shift">
            <div className="p-3">
              <p className="mb-4">Delete shift <strong>{deleting.name}</strong>?</p>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDeleting(null)}>Cancel</Button>
                <Button className="bg-red-600 text-white" onClick={() => router.delete(`/super-admin/shifts/${deleting.id}`, { onSuccess: () => setDeleting(null) })}>Delete</Button>
              </div>
            </div>
          </Modal>
        )}

      </div>
    </AppLayout>
  );
}

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

interface Shift {
  id: number;
  name: string;
  client_name: string;
  display_name: string;
}

interface User {
  id: number;
  name: string;
  role: string;
}

interface Assignment {
  id: number;
  shift_id: number;
  user_id: number;
  date: string;
  status: string;
  shift?: {
    name: string;
    client?: {
      name: string;
    };
  };
  user?: {
    name: string;
  };
}

interface Props {
  assignments: {
    data: Assignment[];
    current_page: number;
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
  };
  shifts: Shift[];
  users: User[];
  filters: any;
  kpi: {
    total: number;
    today: number;
    distinctUsers: number;
  };
  errors?: any;
}

const breadcrumbs = [
  { title: "Shift Assignments", href: "/super-admin/shifts/assignments" },
];

export default function ShiftAssignmentsIndex({
  assignments,
  shifts = [],
  users = [],
  filters,
  kpi,
  errors = {}
}: Props) {
  const [showAssign, setShowAssign] = useState(false);
  const [editing, setEditing] = useState<Assignment | null>(null);
  const [deleting, setDeleting] = useState<Assignment | null>(null);

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
    router.get("/super-admin/shifts/assignments", next, {
      preserveScroll: true,
    });
  };

  const handleAssignSubmit = () => {
    router.post("/super-admin/shifts/assignments", assignForm, {
      onSuccess: () => {
        setShowAssign(false);
        setAssignForm({
          shift_id: "",
          user_id: "",
          date: "",
          status: "assigned",
        });
      },
    });
  };

  const handleEditSubmit = () => {
    if (!editing) return;

    router.put(
      `/super-admin/shifts/assignments/${editing.id}`,
      {
        shift_id: editing.shift_id,
        user_id: editing.user_id,
        date: editing.date,
        status: editing.status,
      },
      {
        onSuccess: () => setEditing(null),
      }
    );
  };

  const handleDelete = () => {
    if (!deleting) return;

    router.delete(`/super-admin/shifts/assignments/${deleting.id}`, {
      onSuccess: () => setDeleting(null),
    });
  };

  const getShiftDisplay = (assignment: Assignment) => {
    if (assignment.shift?.client?.name) {
      return `${assignment.shift.name} - ${assignment.shift.client.name}`;
    }
    return assignment.shift?.name ?? "—";
  };

  return (
    <AppLayout
      title="Shift Assignments"
      breadcrumbs={breadcrumbs}
      renderHeader={() => (
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Shift Assignments
          </h2>
        </div>
      )}
    >
      <Head title="Shift Assignments" />

      <div className="py-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <KpiCard
              title="Total Assignments"
              value={kpi.total}
              icon={Calendar}
            />
            <KpiCard
              title="Today's Assignments"
              value={kpi.today}
              icon={Calendar}
            />
            <KpiCard
              title="Assigned Users"
              value={kpi.distinctUsers}
              icon={Calendar}
            />
          </div>

          <DynamicFilterBar
            filters={[
              {
                key: "shift_id",
                label: "Shift",
                type: "select",
                options: [
                  { label: "All Shifts", value: "" },
                  ...shifts.map((s) => ({
                    label: s.display_name,
                    value: s.id,
                  })),
                ],
              },
              {
                key: "user_id",
                label: "User",
                type: "select",
                options: [
                  { label: "All Users", value: "" },
                  ...users.map((u) => ({
                    label: `${u.name} (${u.role})`,
                    value: u.id,
                  })),
                ],
              },
              { key: "date", label: "Date", type: "date" },
            ]}
            values={filterValues}
            onChange={handleFilter}
            actionSlot={
              <>
                <Button
                  variant="outline"
                  onClick={() => router.get("/super-admin/shifts/assignments")}
                >
                  Reset Filters
                </Button>
                <Button className="bg-blue-600 text-white" onClick={() => setShowAssign(true)}>
                  <Plus className="w-4 h-4 mr-1" />
                  Assign Shift
                </Button>
              </>
            }
          />

          <div className="mt-6 bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Shift</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments.data.map((a, idx) => (
                  <TableRow key={a.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{a.user?.name ?? "—"}</TableCell>
                    <TableCell>{getShiftDisplay(a)}</TableCell>
                    <TableCell>{a.date}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          a.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : a.status === "completed"
                            ? "bg-blue-100 text-blue-800"
                            : a.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {a.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditing(a)}
                          className="text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <Edit3 className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleting(a)}
                          className="text-red-600 hover:underline flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <Pagination className="my-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (assignments.prev_page_url)
                        router.get(assignments.prev_page_url);
                    }}
                  />
                </PaginationItem>
                {Array.from(
                  { length: assignments.last_page || 1 },
                  (_, i) => i + 1
                ).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={page === assignments.current_page}
                      onClick={(e) => {
                        e.preventDefault();
                        router.get(
                          `/super-admin/shifts/assignments?page=${page}`
                        );
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (assignments.next_page_url)
                        router.get(assignments.next_page_url);
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>

      {/* ASSIGN MODAL */}
      {showAssign && (
        <Modal
          show={showAssign}
          onClose={() => setShowAssign(false)}
          title="Assign Shift"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Shift</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={assignForm.shift_id}
                onChange={(e) =>
                  setAssignForm({ ...assignForm, shift_id: e.target.value })
                }
              >
                <option value="">Select Shift</option>
                {shifts.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.display_name}
                  </option>
                ))}
              </select>
              {errors.shift_id && (
                <p className="text-red-500 text-sm mt-1">{errors.shift_id}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Field Staff
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                value={assignForm.user_id}
                onChange={(e) =>
                  setAssignForm({ ...assignForm, user_id: e.target.value })
                }
              >
                <option value="">Select Field Staff</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
              {errors.user_id && (
                <p className="text-red-500 text-sm mt-1">{errors.user_id}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <Input
                type="date"
                value={assignForm.date}
                onChange={(e) =>
                  setAssignForm({ ...assignForm, date: e.target.value })
                }
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={assignForm.status}
                onChange={(e) =>
                  setAssignForm({ ...assignForm, status: e.target.value })
                }
              >
                <option value="assigned">Assigned</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowAssign(false)}>
                Cancel
              </Button>
              <Button onClick={handleAssignSubmit}>Assign</Button>
            </div>
          </div>
        </Modal>
      )}

      {/* EDIT ASSIGNMENT */}
      {editing && (
        <Modal
          show={!!editing}
          onClose={() => setEditing(null)}
          title="Edit Assignment"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Shift</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={editing.shift_id}
                onChange={(e) =>
                  setEditing({ ...editing, shift_id: Number(e.target.value) })
                }
              >
                {shifts.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.display_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Field Staff
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                value={editing.user_id}
                onChange={(e) =>
                  setEditing({ ...editing, user_id: Number(e.target.value) })
                }
              >
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <Input
                type="date"
                value={editing.date}
                onChange={(e) =>
                  setEditing({ ...editing, date: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={editing.status}
                onChange={(e) =>
                  setEditing({ ...editing, status: e.target.value })
                }
              >
                <option value="assigned">Assigned</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setEditing(null)}>
                Cancel
              </Button>
              <Button onClick={handleEditSubmit}>Save</Button>
            </div>
          </div>
        </Modal>
      )}

      {/* DELETE */}
      {deleting && (
        <Modal
          show={!!deleting}
          onClose={() => setDeleting(null)}
          title="Delete Assignment"
        >
          <div className="space-y-4">
            <p>
              Delete assignment for <strong>{deleting.user?.name}</strong> on{" "}
              <strong>{deleting.date}</strong>?
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setDeleting(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </AppLayout>
  );
}

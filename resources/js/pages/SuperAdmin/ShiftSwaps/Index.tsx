"use client";

import AppLayout from "@/layouts/app-layout";
import { Head, router, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";

import KpiCard from "@/components/KpiCard";
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

import { Button } from "@/components/ui/button";
import { Repeat, CheckCircle, XCircle, Users } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  shift_assignments?: ShiftAssignment[];
}

interface ShiftAssignment {
  id: number;
  date: string;
  status: string;
  shift?: {
    id: number;
    name: string;
  };
}

interface SwapRequest {
  id: number;
  from_user_id: number;
  to_user_id: number | null;
  shift_assignment_id: number;
  status: string;
  from_user?: User;
  to_user?: User;
  assignment?: {
    id: number;
    date: string;
    shift?: {
      id: number;
      name: string;
    };
  };
}

interface Props {
  swaps: {
    data: SwapRequest[];
    current_page: number;
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
  };
  kpi: {
    total: number;
    pending: number;
    approved: number;
  };
  swap?: SwapRequest;
  fieldstaff?: User[];
}

const breadcrumbs = [
  { title: "Shift Swap Requests", href: "/super-admin/shifts/swaps" },
];

export default function ShiftSwapIndex({ swaps, kpi, swap, fieldstaff }: Props) {
  const [selected, setSelected] = useState<SwapRequest | null>(null);
  const [assignModal, setAssignModal] = useState(false);

  // Auto-open modal if swap and fieldstaff data are present
  useEffect(() => {
    if (swap && fieldstaff) {
      setAssignModal(true);
    }
  }, [swap, fieldstaff]);

  // Load fieldstaff list before approving
  function loadFieldstaff(id: number) {
    router.get(`/super-admin/shifts/swaps/${id}/approve`, {}, {
      preserveState: false,
      preserveScroll: false,
    });
  }

  function assignToFieldstaff(staffId: number) {
    if (!swap) return;

    router.post(
      `/super-admin/shifts/swaps/${swap.id}/assign`,
      { to_user_id: staffId },
      {
        onSuccess: () => {
          setAssignModal(false);
        },
      }
    );
  }

  function rejectSwap(id: number) {
    router.post(`/super-admin/shifts/swaps/${id}/reject`, {}, {
      preserveState: true,
      preserveScroll: true,
    });
  }

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      approved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };
    return badges[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <AppLayout
      title="Shift Swap Requests"
      breadcrumbs={breadcrumbs}
      renderHeader={() => (
        <div className="flex items-center gap-2">
          <Repeat className="h-6 w-6" />
          <h2 className="text-2xl font-semibold">Shift Swap Requests</h2>
        </div>
      )}
    >
      <Head title="Shift Swap Requests" />

      <div className="py-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <KpiCard
              title="Total Swaps"
              value={kpi.total}
              icon={Repeat}
            />
            <KpiCard
              title="Pending"
              value={kpi.pending}
              icon={XCircle}
            />
            <KpiCard
              title="Approved"
              value={kpi.approved}
              icon={CheckCircle}
            />
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>From User</TableHead>
                  <TableHead>Current Assignee</TableHead>
                  <TableHead>Shift Date</TableHead>
                  <TableHead>Shift</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {swaps.data.map((s, idx) => (
                  <TableRow key={s.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{s.from_user?.name ?? "—"}</TableCell>
                    <TableCell>{s.to_user?.name ?? "—"}</TableCell>
                    <TableCell>{s.assignment?.date ?? "—"}</TableCell>
                    <TableCell>{s.assignment?.shift?.name ?? "—"}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(
                          s.status
                        )}`}
                      >
                        {s.status}
                      </span>
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {s.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => loadFieldstaff(s.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>

                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => rejectSwap(s.id)}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelected(s)}
                        >
                          Details
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="mt-6 flex justify-center pb-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (swaps.prev_page_url) router.get(swaps.prev_page_url);
                      }}
                    />
                  </PaginationItem>

                  {Array.from(
                    { length: swaps.last_page || 1 },
                    (_, i) => i + 1
                  ).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        isActive={page === swaps.current_page}
                        onClick={(e) => {
                          e.preventDefault();
                          router.get(`/super-admin/shifts/swaps?page=${page}`);
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
                        if (swaps.next_page_url) router.get(swaps.next_page_url);
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>

      {/* DETAILS MODAL */}
      {selected && (
        <Modal
          show={!!selected}
          onClose={() => setSelected(null)}
          title="Swap Details"
        >
          <div className="space-y-3">
            <div>
              <strong>From User:</strong> {selected.from_user?.name}
            </div>
            <div>
              <strong>Current Assignee:</strong> {selected.to_user?.name ?? "Not assigned"}
            </div>
            <div>
              <strong>Shift Date:</strong> {selected.assignment?.date}
            </div>
            <div>
              <strong>Shift:</strong> {selected.assignment?.shift?.name}
            </div>
            <div>
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(
                  selected.status
                )}`}
              >
                {selected.status}
              </span>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setSelected(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* ASSIGN NEW FIELDSTAFF MODAL */}
      {assignModal && swap && fieldstaff && (
        <Modal
          show={assignModal}
          onClose={() => {
            setAssignModal(false);
            router.get('/super-admin/shifts/swaps');
          }}
          title="Assign Shift to New Field Staff"
        >
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
              <h3 className="font-semibold mb-2">Swap Details:</h3>
              <p className="text-sm">
                <strong>From:</strong> {swap.fromUser?.name}
              </p>
              <p className="text-sm">
                <strong>Date:</strong> {swap.assignment?.date}
              </p>
              <p className="text-sm">
                <strong>Shift:</strong> {swap.assignment?.shift?.name}
              </p>
            </div>

            <h3 className="font-semibold flex items-center gap-2">
              <Users className="w-4 h-4" />
              Available Field Staff:
            </h3>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {fieldstaff.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No field staff available
                </p>
              ) : (
                fieldstaff.map((staff) => (
                  <div
                    key={staff.id}
                    className="border dark:border-gray-700 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">{staff.name}</p>
                        <p className="text-xs text-gray-500">{staff.email}</p>
                      </div>
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => assignToFieldstaff(staff.id)}
                      >
                        Assign
                      </Button>
                    </div>

                    {staff.shift_assignments && staff.shift_assignments.length > 0 ? (
                      <div className="mt-2">
                        <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                          Upcoming Shifts:
                        </p>
                        <div className="space-y-1">
                          {staff.shift_assignments.slice(0, 3).map((sa) => (
                            <div
                              key={sa.id}
                              className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
                            >
                              {sa.date} → {sa.shift?.name ?? "Unknown"}
                            </div>
                          ))}
                          {staff.shift_assignments.length > 3 && (
                            <p className="text-xs text-gray-500">
                              +{staff.shift_assignments.length - 3} more
                            </p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500 mt-2">
                        No upcoming shifts
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-4 border-t dark:border-gray-700">
              <Button
                variant="outline"
                onClick={() => {
                  setAssignModal(false);
                  router.get('/super-admin/shifts/swaps');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </AppLayout>
  );
}

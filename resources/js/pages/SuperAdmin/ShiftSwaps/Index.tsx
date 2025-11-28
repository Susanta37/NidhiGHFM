"use client";

import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";

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
import { Repeat, CheckCircle, XCircle } from "lucide-react";

/**
 * Expects:
 * swaps (paginated) with related fromUser, toUser, assignment
 * kpi: total, pending, approved
 */
interface Props {
  swaps: any;
  filters?: any;
  kpi: { total: number; pending: number; approved: number; };
}

export default function ShiftSwapIndex({ swaps, kpi }: Props) {
  const [selected, setSelected] = useState<any | null>(null);

  return (
    <AppLayout>
      <Head title="Shift Swap Requests" />
      <div className="p-6 min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Repeat className="h-6 w-6" /> Shift Swap Requests
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <KpiCard title="Total Swaps" value={kpi.total} icon={Repeat} color="from-blue-500 to-sky-600" />
          <KpiCard title="Pending" value={kpi.pending} icon={XCircle} color="from-yellow-500 to-amber-600" />
          <KpiCard title="Approved" value={kpi.approved} icon={CheckCircle} color="from-green-500 to-emerald-600" />
        </div>

        <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border dark:border-neutral-800">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Shift Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {swaps.data.map((s: any, idx: number) => (
                <TableRow key={s.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{s.fromUser?.name ?? "—"}</TableCell>
                  <TableCell>{s.toUser?.name ?? "—"}</TableCell>
                  <TableCell>{s.assignment?.date ?? "—"}</TableCell>
                  <TableCell>{s.status}</TableCell>
                  <TableCell className="text-right flex justify-end gap-2">
                    {s.status === "pending" && (
                      <>
                        <Button className="bg-green-600" onClick={() => router.post(`/super-admin/shift-swaps/${s.id}/approve`)}>
                          <CheckCircle className="w-4 h-4 mr-1" /> Approve
                        </Button>
                        <Button className="bg-red-600" onClick={() => router.post(`/super-admin/shift-swaps/${s.id}/reject`)}>
                          <XCircle className="w-4 h-4 mr-1" /> Reject
                        </Button>
                      </>
                    )}
                    <Button variant="outline" onClick={() => setSelected(s)}>Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* pagination */}
          <div className="mt-6 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); if (swaps.prev_page_url) router.get(swaps.prev_page_url); }} />
                </PaginationItem>

                {Array.from({ length: swaps.last_page || 1 }, (_, i) => i + 1).map(page => (
                  <PaginationItem key={page}>
                    <PaginationLink isActive={page === swaps.current_page}>
                      <a href={`?page=${page}`} onClick={(e) => { e.preventDefault(); router.get(`/super-admin/shift-swaps?page=${page}`); }}>{page}</a>
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext href="#" onClick={(e) => { e.preventDefault(); if (swaps.next_page_url) router.get(swaps.next_page_url); }} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>

        {/* DETAILS MODAL */}
        {selected && (
          <Modal show={!!selected} onClose={() => setSelected(null)} title="Swap Details">
            <div className="grid gap-3">
              <p><strong>From:</strong> {selected.fromUser?.name}</p>
              <p><strong>To:</strong> {selected.toUser?.name}</p>
              <p><strong>Shift Date:</strong> {selected.assignment?.date}</p>
              <p><strong>Status:</strong> {selected.status}</p>
              <p><strong>Assignment Shift:</strong> {selected.assignment?.shift?.name}</p>

              <div className="flex justify-end gap-2 mt-3">
                <Button variant="outline" onClick={() => setSelected(null)}>Close</Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </AppLayout>
  );
}

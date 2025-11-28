"use client";

import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import KpiCard from "@/components/KpiCard";
import DynamicFilterBar from "@/components/DynamicFilterBar";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

import { ClipboardList, Users, Calendar } from "lucide-react";

interface Props {
  logs: any;
  jobs: any[];
  users: any[];
  filters: any;
  kpi: {
    total: number;
    today: number;
  };
}

export default function JobLogsIndex({ logs, jobs = [], users = [], filters, kpi }: Props) {
  const [filterValues, setFilterValues] = useState({
    job_id: filters.job_id || "",
    user_id: filters.user_id || "",
    date: filters.date || "",
  });

  const handleFilter = (key: string, value: string) => {
    const updated = { ...filterValues, [key]: value };
    setFilterValues(updated);
    router.get("/super-admin/job-logs", updated, { preserveScroll: true });
  };

  return (
    <AppLayout>
      <Head title="Job Logs" />

      <div className="p-6 min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <h1 className="text-2xl font-semibold flex items-center gap-2 mb-6">
          <ClipboardList className="h-6 w-6" /> Job Logs
        </h1>

        {/* KPI CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <KpiCard
            title="Total Logs"
            value={kpi.total}
            icon={ClipboardList}
            color="from-blue-500 to-purple-600"
          />
          <KpiCard
            title="Today's Logs"
            value={kpi.today}
            icon={Calendar}
            color="from-green-500 to-emerald-600"
          />
          <KpiCard
            title="Unique Users"
            value={logs.data.filter((v: any, i: number, arr: any[]) =>
              arr.findIndex(x => x.user?.id === v.user?.id) === i
            ).length}
            icon={Users}
            color="from-orange-500 to-amber-600"
          />
        </div>

        {/* FILTER BAR */}
        <DynamicFilterBar
          filters={[
            {
              key: "job_id",
              label: "Job",
              type: "select",
              options: [
                { label: "All Jobs", value: "" },
                ...jobs.map((j) => ({ label: j.title, value: j.id })),
              ],
            },
            {
              key: "user_id",
              label: "User",
              type: "select",
              options: [
                { label: "All Users", value: "" },
                ...users.map((u) => ({ label: u.name, value: u.id })),
              ],
            },
            {
              key: "date",
              label: "Date",
              type: "date",
            },
          ]}
          values={filterValues}
          onChange={handleFilter}
        />

        {/* TABLE */}
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border dark:border-neutral-800">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Job</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Log Time</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {logs.data.map((log: any, index: number) => (
                <TableRow key={log.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{log.job?.title ?? "—"}</TableCell>
                  <TableCell>{log.user?.name ?? "—"}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded ${
                        log.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : log.status === "failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-neutral-100 text-neutral-700"
                      }`}
                    >
                      {log.status}
                    </span>
                  </TableCell>
                  <TableCell>{log.note || "—"}</TableCell>
                  <TableCell>{log.log_time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* PAGINATION */}
          <div className="mt-6 flex justify-center">
            <Pagination>
              <PaginationContent>

                {/* Prev */}
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (logs.prev_page_url) router.get(logs.prev_page_url);
                    }}
                  />
                </PaginationItem>

                {/* Page Numbers */}
                {Array.from({ length: logs.last_page || 1 }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink isActive={page === logs.current_page}>
                      <a
                        href={`?page=${page}`}
                        onClick={(e) => {
                          e.preventDefault();
                          router.get(`/super-admin/job-logs?page=${page}`, {
                            preserveState: true,
                            preserveScroll: true,
                          });
                        }}
                      >
                        {page}
                      </a>
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {/* Next */}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (logs.next_page_url) router.get(logs.next_page_url);
                    }}
                  />
                </PaginationItem>

              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

import React, { useMemo, useState } from "react";
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import type { BreadcrumbItem, UserRecord } from '@/types';
import type { PageProps } from '@inertiajs/core';
import KpiCard from '@/components/KpiCard';
import Modal from '@/components/Modal';
import { Users, Activity, Settings, User as UserIcon, Upload, Edit, Trash2, Search } from 'lucide-react';
import DynamicFilterBar from "@/components/DynamicFilterBar";
import DocumentsModal from "./DocumentsModal";
import { router } from "@inertiajs/react";


// shadcn table components (your file at /components/ui/table.tsx)
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

// shadcn pagination components (your file at /components/ui/pagination.tsx)
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface Props extends PageProps {
  users: UserRecord[];
  kpi: {
    totalUsers: number;
    hr: number;
    sitemanager: number;
    supervisor: number;
    fieldstaff: number;
  };
}

/* --------------------------- BREADCRUMBS --------------------------- */

const breadcrumbs: BreadcrumbItem[] = [
  { title: "User Management", href: "/super-admin/users" },
];

const bloodGroups = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];

/* ===================================================================
   MAIN COMPONENT
=================================================================== */

export default function Index({ auth, users, kpi }: Props) {
  /* --------------------------- FILTER STATE --------------------------- */
  const [filtersState, setFiltersState] = useState({
    search: "",
    role: "",
    joining_date: "",
    blood_group: "",

  });

  const filterConfig = [
    {
      key: "search",
      label: "Search User",
      type: "text",
      placeholder: "Search by name or email...",
      icon: "search",
    },
    {
      key: "role",
      label: "Role",
      type: "select",
      options: [
        { label: "All Roles", value: "" },
        { label: "HR", value: "hr" },
        { label: "Supervisor", value: "supervisor" },
        { label: "Site Manager", value: "sitemanager" },
        { label: "Field Staff", value: "fieldstaff" },
        { label: "Accountant", value: "accountant" },
      ],
    },
    {
      key: "joining_date",
      label: "Joining Date",
      type: "date",
    },
    {
      key: "blood_group",
      label: "Blood Group",
      type: "select",
      options: [
        { label: "All", value: "" },
        ...bloodGroups.map((bg) => ({ label: bg, value: bg })),
      ],
    },
  ];

  const handleFilterChange = (key: string, value: string) => {
    setFiltersState((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // reset to first page on filter change
  };

  /* ---------------------------- MODAL STATES ---------------------------- */

  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showUploadDocs, setShowUploadDocs] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  /* --------------------------- FORMS --------------------------- */

  const createForm = useForm({
    name: "",
    email: "",
    password: "",
    role: "",
    joining_date: "",
    blood_group: "",
  });

  const editForm = useForm({
    name: "",
    email: "",
    role: "",
    address: "",
    emergency_contact: "",
    dob: "",
    bank_account_no: "",
    ifsc: "",
    pan_no: "",
    aadhaar_no: "",
    joining_date: "",
    blood_group: "",
  });

  const uploadForm = useForm({
    documents: [] as File[],
  });

  const deleteForm = useForm({});

  /* ---------------------------- HELPERS ---------------------------- */

  const openEditModal = (user: UserRecord) => {
    setSelectedUser(user);

    editForm.setData({
      name: user.name ?? "",
      email: user.email ?? "",
      role: user.role ?? "",
      address: user.profile?.address || "",
      emergency_contact: user.profile?.emergency_contact || "",
      dob: user.profile?.dob || "",
      bank_account_no: user.profile?.bank_account_no || "",
      ifsc: user.profile?.ifsc || "",
      pan_no: user.profile?.pan_no || "",
      aadhaar_no: user.profile?.aadhaar_no || "",
      joining_date: user.profile?.joining_date || "",
      blood_group: user.profile?.blood_group || "",
    });

    setShowEdit(true);
  };

  const openDeleteModal = (user: UserRecord) => {
    setSelectedUser(user);
    setShowDelete(true);
  };

  const openUploadDocsModal = (user: UserRecord) => {
    setSelectedUser(user);
    uploadForm.setData("documents", []);
    setShowUploadDocs(true);
  };

  /* ------------------------- FILTERING ------------------------- */

  const filteredUsers = useMemo(() => {
    const search = filtersState.search.toLowerCase().trim();

    return users.filter((u) => {
      const matchSearch =
        !search ||
        u.name.toLowerCase().includes(search) ||
        u.email.toLowerCase().includes(search);

      const matchRole = filtersState.role ? u.role === filtersState.role : true;

      const matchJoiningDate = filtersState.joining_date
        ? u.profile?.joining_date === filtersState.joining_date
        : true;

      const matchBloodGroup = filtersState.blood_group
        ? u.profile?.blood_group === filtersState.blood_group
        : true;

      return matchSearch && matchRole && matchJoiningDate && matchBloodGroup;
    });

  }, [users, filtersState]);

  /* --------------------------- PAGINATION --------------------------- */

  const rowsPerPage = 10; // per your choice
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalItems = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredUsers.slice(start, start + rowsPerPage);
  }, [filteredUsers, currentPage]);

  // helper to build a compact pages array with ellipsis if needed
  const pages = useMemo(() => {
    // For simplicity: show up to 7 slots: first, prev-1, current, next+1, last with ellipses
    const pagesArr: (number | "..." )[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pagesArr.push(i);
      return pagesArr;
    }

    // always include first
    pagesArr.push(1);

    const left = Math.max(2, currentPage - 1);
    const right = Math.min(totalPages - 1, currentPage + 1);

    if (left > 2) pagesArr.push("...");

    for (let i = left; i <= right; i++) pagesArr.push(i);

    if (right < totalPages - 1) pagesArr.push("...");

    pagesArr.push(totalPages);

    return pagesArr;
  }, [totalPages, currentPage]);

  const gotoPage = (n: number) => {
    setCurrentPage(Math.max(1, Math.min(n, totalPages)));
  };

  /* ===================================================================
     UI
  =================================================================== */

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="User Management" />

      <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6 bg-neutral-50 dark:bg-neutral-950">

        {/* ------------------- KPI CARDS ------------------- */}
       <div className="grid gap-6 md:grid-cols-4">
            {/* 1. Total Users: Theme - Primary Blue (High-level metric) */}
            <KpiCard
                title="Total Users"
                value={kpi.totalUsers.toString()}
                change="+12.5%"
                icon={Users}
                // Background: Light blue tint with a subtle border for white/dark contrast
                bgColorClass="bg-blue-500/10 dark:bg-blue-900/20 border-blue-500/50"
                // Icon: Solid blue
                iconColorClass="text-blue-600 dark:text-blue-400"
                // Hover: Smooth blue gradient
                color="from-blue-500 to-sky-600"
            />

            {/* 2. HR Employees: Theme - Teal/Cyan (Administrative/Support role) */}
            <KpiCard
                title="HR Employees"
                value={kpi.hr.toString()}
                change="+2%"
                icon={Activity}
                // Background: Light teal tint
                bgColorClass="bg-teal-500/20 dark:bg-teal-900/20 border-teal-500/50"
                // Icon: Solid teal
                iconColorClass="text-teal-600 dark:text-teal-400"
                // Hover: Teal/Cyan gradient
                color="from-teal-500 to-cyan-600"
            />

            {/* 3. Supervisors: Theme - Green (Management/Growth) */}
            <KpiCard
                title="Supervisors"
                value={kpi.supervisor.toString()}
                change="+1.2%"
                icon={Settings}
                // Background: Light green tint
                bgColorClass="bg-green-500/10 dark:bg-green-900/20 border-green-500/50"
                // Icon: Solid green
                iconColorClass="text-green-600 dark:text-green-400"
                // Hover: Green gradient
                color="from-green-500 to-emerald-600"
            />

            {/* 4. Field Staff: Theme - Amber/Orange (Operational/Field role) */}
            <KpiCard
                title="Field Staff"
                value={kpi.fieldstaff.toString()}
                change="+4%"
                icon={UserIcon}
                // Background: Light orange tint
                bgColorClass="bg-amber-500/10 dark:bg-amber-900/20 border-amber-500/50"
                // Icon: Solid orange
                iconColorClass="text-amber-600 dark:text-amber-400"
                // Hover: Orange/Amber gradient
                color="from-amber-500 to-orange-600"
            />
        </div>

        {/* ------------------- FILTER BAR ------------------- */}
       <DynamicFilterBar
        filters={filterConfig}
        values={filtersState}
        onChange={handleFilterChange}
        primaryColor="indigo" 
        actionSlot={
            <button
                onClick={() => setShowCreate(true)}
                // Ensure button height matches the input field height (py-2.5)
                className="bg-blue-600 text-white px-4 py-2.5 rounded-lg shadow-md hover:bg-blue-700 transition duration-150 w-full md:w-auto"
            >
                + Add User
            </button>
        }
        />

        {/* ------------------- TABLE ------------------- */}
        <div className="rounded-xl border dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm p-6">

          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joining Date</TableHead>
                <TableHead>D.O.B</TableHead>
                <TableHead>Blood Group</TableHead>
                <TableHead>Actions</TableHead>
                <TableHead>Address</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="px-4 py-3">{user.name}</TableCell>
                  <TableCell className="px-4 py-3">{user.email}</TableCell>
                  <TableCell className="px-4 py-3 capitalize">{user.role}</TableCell>
                  <TableCell className="px-4 py-3">{user.profile?.joining_date ?? "—"}</TableCell>
                  <TableCell className="px-4 py-3">{user.profile?.dob ?? "—"}</TableCell>
                  <TableCell className="px-4 py-3">{user.profile?.blood_group ?? "—"}</TableCell>
                  <TableCell className="px-4 py-3">{user.profile?.address ?? "—"}</TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(user)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-full flex items-center gap-1 hover:bg-blue-600"
                      >
                        <Edit size={14} /> Edit
                      </button>

                      <button
                        onClick={() => openUploadDocsModal(user)}
                        className="px-3 py-1 bg-purple-500 text-white rounded-full flex items-center gap-1 hover:bg-purple-600"
                      >
                        <Upload size={14} /> Docs
                      </button>

                      <button
                        onClick={() => openDeleteModal(user)}
                        className="px-3 py-1 bg-red-500 text-white rounded-full flex items-center gap-1 hover:bg-red-600"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {paginatedUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-neutral-500">
                    No matching users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Footer: showing rows info + pagination */}
          <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="text-sm text-neutral-600 dark:text-neutral-300">
              Showing{" "}
              <strong>
                {totalItems === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1}
              </strong>{" "}
              to{" "}
              <strong>
                {Math.min(currentPage * rowsPerPage, totalItems)}</strong>{" "}of <strong>{totalItems}</strong>
            </div>

            {/* shadcn pagination component */}
            <Pagination aria-label="Pagination" className="mt-2 md:mt-0">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={(e) => {
                      e.preventDefault();
                      gotoPage(currentPage - 1);
                    }}
                    href="#"
                    aria-disabled={currentPage <= 1}
                  />
                </PaginationItem>

                {pages.map((p, idx) =>
                  p === "..." ? (
                    <PaginationItem key={`ell-${idx}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={p}>
                      <PaginationLink
                        href="#"
                        isActive={p === currentPage}
                        onClick={(e) => {
                          e.preventDefault();
                          gotoPage(Number(p));
                        }}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={(e) => {
                      e.preventDefault();
                      gotoPage(currentPage + 1);
                    }}
                    href="#"
                    aria-disabled={currentPage >= totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>

        </div>
      </div>

      {/* ===================================================================
         CREATE MODAL
      =================================================================== */}
      <Modal show={showCreate} onClose={() => setShowCreate(false)}>
        <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-white">Add New User</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            createForm.post("/super-admin/users", {
              onSuccess: () => {
                setShowCreate(false);
                createForm.reset();
              },
            });
          }}
          className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter full name"
              className="border border-neutral-300 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white px-3 py-2 rounded-lg w-full"
              value={createForm.data.name}
              onChange={(e) => createForm.setData("name", e.target.value)}
            />
            {createForm.errors.name && (
              <p className="text-red-500 text-sm mt-1">{createForm.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter email address"
              className="border border-neutral-300 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white px-3 py-2 rounded-lg w-full"
              value={createForm.data.email}
              onChange={(e) => createForm.setData("email", e.target.value)}
            />
            {createForm.errors.email && (
              <p className="text-red-500 text-sm mt-1">{createForm.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="border border-neutral-300 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white px-3 py-2 rounded-lg w-full"
              value={createForm.data.password}
              onChange={(e) => createForm.setData("password", e.target.value)}
            />
            {createForm.errors.password && (
              <p className="text-red-500 text-sm mt-1">{createForm.errors.password}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              className="border border-neutral-300 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white px-3 py-2 rounded-lg w-full"
              value={createForm.data.role}
              onChange={(e) => createForm.setData("role", e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="hr">HR</option>
              <option value="supervisor">Supervisor</option>
              <option value="sitemanager">Site Manager</option>
              <option value="accountant">Accountant</option>
              <option value="fieldstaff">Field Staff</option>
            </select>
            {createForm.errors.role && (
              <p className="text-red-500 text-sm mt-1">{createForm.errors.role}</p>
            )}
          </div>

          {/* Joining Date */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Joining Date
            </label>
            <input
              type="date"
              className="border border-neutral-300 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white px-3 py-2 rounded-lg w-full"
              value={createForm.data.joining_date}
              onChange={(e) => createForm.setData("joining_date", e.target.value)}
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Blood Group
            </label>
            <select
              className="border border-neutral-300 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white px-3 py-2 rounded-lg w-full"
              value={createForm.data.blood_group}
              onChange={(e) => createForm.setData("blood_group", e.target.value)}
            >
              <option value="">Select Blood Group</option>
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 justify-start mt-6">
            <button
              type="button"
              onClick={() => setShowCreate(false)}
              className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createForm.processing}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {createForm.processing ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </Modal>

      {/* ===================================================================
         EDIT MODAL (FULL USER + PROFILE)
      =================================================================== */}
     <Modal
  show={showEdit}
  onClose={() => setShowEdit(false)}
  title="Edit User"
>
  <form
    onSubmit={(e) => {
      e.preventDefault();
      if (selectedUser) {
        // Assuming editForm is an inertiajs or similar form helper
        editForm.put(`/super-admin/users/${selectedUser.id}`, {
          onSuccess: () => setShowEdit(false),
        });
      }
    }}
    // Apply modern form grid layout with more explicit spacing
    className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
  >
    {/*
      1. USER FIELDS
      Applying a subtle grouping or just consistent, clean field styles.
    */}
    <div className="lg:col-span-full">
      <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">
        User Credentials
      </h3>
    </div>

    {/* Name Field */}
    <div>
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
        Name <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        // Modern, slightly softer input style
        className="border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-4 py-2.5 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
        placeholder="Name"
        value={editForm.data.name}
        onChange={(e) => editForm.setData("name", e.target.value)}
      />
      {editForm.errors.name && (
        <p className="text-red-500 text-sm mt-1">{editForm.errors.name}</p>
      )}
    </div>

    {/* Email Field */}
    <div>
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
        Email <span className="text-red-500">*</span>
      </label>
      <input
        type="email"
        className="border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-4 py-2.5 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
        placeholder="Email"
        value={editForm.data.email}
        onChange={(e) => editForm.setData("email", e.target.value)}
      />
      {editForm.errors.email && (
        <p className="text-red-500 text-sm mt-1">{editForm.errors.email}</p>
      )}
    </div>

    {/* Role Field (Select) */}
    <div>
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
        Role <span className="text-red-500">*</span>
      </label>
      <select
        // Ensure select matches input height and style
        className="border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-4 py-2.5 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
        value={editForm.data.role}
        onChange={(e) => editForm.setData("role", e.target.value)}
      >
        <option value="hr">HR</option>
        <option value="supervisor">Supervisor</option>
        <option value="sitemanager">Site Manager</option>
        <option value="accountant">Accountant</option>
        <option value="fieldstaff">Field Staff</option>
      </select>
      {editForm.errors.role && (
        <p className="text-red-500 text-sm mt-1">{editForm.errors.role}</p>
      )}
    </div>

    {/*
      2. PROFILE FIELDS
      Using a divider/heading for visual separation.
    */}
    <div className="lg:col-span-full pt-4">
      <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">
        Profile Details
      </h3>
    </div>

    {/* Address Field */}
    <div>
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
        Address
      </label>
      <input
        type="text"
        placeholder="Address"
        className="border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-4 py-2.5 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
        value={editForm.data.address}
        onChange={(e) => editForm.setData("address", e.target.value)}
      />
    </div>

    {/* Emergency Contact Field */}
    <div>
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
        Emergency Contact
      </label>
      <input
        type="text"
        placeholder="Emergency Contact"
        className="border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-4 py-2.5 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
        value={editForm.data.emergency_contact}
        onChange={(e) => editForm.setData("emergency_contact", e.target.value)}
      />
    </div>

    {/* Date of Birth Field */}
    <div>
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
        Date of Birth
      </label>
      <input
        type="date"
        placeholder="DOB"
        className="border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-4 py-2.5 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
        value={editForm.data.dob || ""}
        onChange={(e) => editForm.setData("dob", e.target.value)}
      />
    </div>

    {/* Bank Account No Field */}
    <div>
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
        Bank Account No
      </label>
      <input
        type="text"
        placeholder="Bank Account No"
        className="border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-4 py-2.5 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
        value={editForm.data.bank_account_no}
        onChange={(e) => editForm.setData("bank_account_no", e.target.value)}
      />
    </div>

    {/* IFSC Code Field */}
    <div>
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
        IFSC Code
      </label>
      <input
        type="text"
        placeholder="IFSC"
        className="border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-4 py-2.5 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
        value={editForm.data.ifsc}
        onChange={(e) => editForm.setData("ifsc", e.target.value)}
      />
    </div>

    {/* PAN No Field */}
    <div>
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
        PAN No
      </label>
      <input
        type="text"
        placeholder="PAN No"
        className="border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-4 py-2.5 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
        value={editForm.data.pan_no}
        onChange={(e) => editForm.setData("pan_no", e.target.value)}
      />
    </div>

    {/* Aadhaar No Field */}
    <div>
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
        Aadhaar No
      </label>
      <input
        type="text"
        placeholder="Aadhaar No"
        className="border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-4 py-2.5 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
        value={editForm.data.aadhaar_no}
        onChange={(e) => editForm.setData("aadhaar_no", e.target.value)}
      />
    </div>

    {/* Joining Date Field */}
    <div>
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
        Joining Date
      </label>
      <input
        type="date"
        placeholder="Joining Date"
        className="border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-4 py-2.5 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
        value={editForm.data.joining_date || ""}
        onChange={(e) => editForm.setData("joining_date", e.target.value)}
      />
    </div>

    {/* Blood Group Field (Select) */}
    <div>
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
        Blood Group
      </label>
      <select
        className="border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-4 py-2.5 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
        value={editForm.data.blood_group}
        onChange={(e) => editForm.setData("blood_group", e.target.value)}
      >
        <option value="">Select Blood Group</option>
        {/* Assuming bloodGroups is an array of strings */}
        {bloodGroups.map((bg) => (
          <option key={bg} value={bg}>{bg}</option>
        ))}
      </select>
    </div>

    {/*
      3. ACTION BUTTONS
      Using lg:col-span-full to make buttons take the full width below the grid
    */}
    <div className="lg:col-span-full flex gap-3 justify-end mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
      {/* Cancel Button - Subtle secondary style */}
      <button
        type="button"
        onClick={() => setShowEdit(false)}
        className="px-6 py-2.5 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition duration-150"
      >
        Cancel
      </button>

      {/* Update Button - Primary, professional look */}
      <button
        type="submit"
        disabled={editForm.processing}
        className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
      >
        {editForm.processing ? "Saving..." : "Update User"}
      </button>
    </div>
  </form>
</Modal>
      {/* ===================================================================
         UPLOAD DOCUMENTS MODAL
      =================================================================== */}

      <DocumentsModal
          show={showUploadDocs}
          onClose={() => setShowUploadDocs(false)}
          userId={selectedUser?.id}
          existingDocs={selectedUser?.documents ?? []}
          onSuccess={() => {
              router.reload({ only: ["users"] });
          }}
      />



      {/* ===================================================================
         DELETE MODAL
      =================================================================== */}
      <Modal show={showDelete} onClose={() => setShowDelete(false)} title="Delete User">
        {/* <h2 className="text-xl font-semibold mb-4 text-red-600">Delete User</h2> */}

        <p className="mb-6 text-neutral-700 dark:text-neutral-300">
          Are you sure you want to delete <strong>{selectedUser?.name}</strong>? This action cannot be undone.
        </p>

        <div className="flex gap-2 justify-end">
          <button
            onClick={() => setShowDelete(false)}
            className="px-4 py-2 bg-neutral-300 dark:bg-neutral-700 rounded-lg text-neutral-900 dark:text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (selectedUser) {
                deleteForm.delete(`/super-admin/users/${selectedUser.id}`, {
                  onSuccess: () => setShowDelete(false),
                });
              }
            }}
            disabled={deleteForm.processing}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            {deleteForm.processing ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Modal>

    </AppLayout>
  );
}

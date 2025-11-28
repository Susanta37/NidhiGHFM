import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
    children?: NavItem[];
}


export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; 
}

export interface Profile {
    address?: string;
    emergency_contact?: string;
    dob?: string;
    bank_account_no?: string;
    ifsc?: string;
    pan_no?: string;
    aadhaar_no?: string;
    joining_date?: string;
    blood_group?: string;
}

export interface UserRecord {
    id: number;
    name: string;
    email: string;
    role: string;
    profile?: Profile;
}

export interface FilterProps {
    search: string;
    setSearch: (v: string) => void;

    status: string;
    setStatus: (v: string) => void;

    type: string;
    setType: (v: string) => void;

    dateFrom: string;
    setDateFrom: (v: string) => void;

    dateTo: string;
    setDateTo: (v: string) => void;
    types: any[];
}

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface ComplianceRecord {
    id: number;
    user: User | null;
    certificate_type: string;
    file_path: string;
    expiry_date: string;
    status: string;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface Props {
    records: {
        data: ComplianceRecord[];
        total: number;
        links: PaginationLink[];
    };
    filters: {
        search?: string;
        status?: string;
        type?: string;
        from?: string;
        to?: string;
    };
    types: string[];
}


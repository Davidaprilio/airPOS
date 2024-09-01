import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    errors: {[k:string]: string[]}
    ziggy: Config & { location: string };
};

export type Paginate<T extends Record<string, unknown>> = {
    current_page: number
    data: T[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: {
        active: boolean
        label: string
        url: string
    }[]
    next_page_url: string
    path: string
    per_page: number
    prev_page_url: null
    to: number
    total: number
}
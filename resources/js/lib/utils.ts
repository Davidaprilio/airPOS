import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function arrFrom<T>(length: number, value: (index: number) => T): T[] {
    return Array.from({length}, (_,i) => value(i))
}
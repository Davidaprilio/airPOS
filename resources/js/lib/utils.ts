import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function arrFrom<T>(length: number, value: (index: number) => T): T[] {
    return Array.from({length}, (_,i) => value(i))
}

export function numberSparator(num: number, sparator: string = '.') {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sparator);
}

export function textEllipses(text: string, max: number, ellipses: string = '...') 
{
    return text.substring(0,max-1)+(text.length>max?ellipses:''); 
}
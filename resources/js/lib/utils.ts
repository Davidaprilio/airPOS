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

export function shortNum(num: number) 
{
    const formats = [
        {unit: 1_000_000_000, symbol: 'B'},
        {unit: 1_000_000, symbol: 'jt'},
        {unit: 1_000, symbol: 'k'},
        {unit: 1, symbol: ''},
    ]
    let n = 0
    let symbol = ''
    for (const format of formats) {
        if (num > format.unit) {
            n = num / format.unit
            symbol = format.symbol
            break
        }
    }

    let str = n.toFixed(2)
    if (str.includes('.0')) {
        str = str.split('.0')[0]
    }
    return str + symbol
}
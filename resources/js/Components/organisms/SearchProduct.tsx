import { useState } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/Components/ui/command"
import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"
import { TiArrowSortedDown } from "react-icons/ti"

export const products = [
    {
        category: "Makanan",
        products: [
            {
                img: null,
                name: "Burger Chesee",
                unit: "pcs",
                no: 34135346233
            },
            {
                img: null,
                name: "Burger Beef",
                unit: "pcs",
                no: 34135346233
            },
            {
                img: null,
                name: "Burger Beef Double",
                unit: "pcs",
                no: 34135346233
            },
        ]
    },
    {
        category: "Minuman",
        products: [
            {
                img: null,
                name: "Americano Coffee",
                unit: "cup",
                no: 34135346233
            },
            {
                img: null,
                name: "Expresso Coffee",
                unit: "cup",
                no: 34135346233
            },
            {
                img: null,
                name: "Double Shot Expresso Coffee",
                unit: "cup",
                no: 34135346233
            },
        ]
    }
]

export function SearchProduct() {
    const [open, setOpen] = useState(false)
    return (
        <div className="relative md:min-w-[450px] z-50">
            <Command
                onFocus={() => { setOpen(true) }}
                onBlur={() => { setOpen(false) }}
                className={cn("rounded-lg border w-full absolute h-fit !z-50", {
                    'shadow-md': open
                })}
            >
                <CommandInput placeholder="Search name or serial number ..." className="h-[2.4rem]" />
                {open && (
                    <CommandList className="border-t w-full bottom-10 bg-white z-50">
                        <CommandEmpty>No results found.</CommandEmpty>
                        {products.map(product => (
                            <>
                                <CommandGroup heading={product.category}>
                                    {product.products.map(item => (
                                        <CommandItem>
                                            <SearchProductItem 
                                                name={item.name} 
                                                serialNum={item.no.toString()} 
                                                unit={item.unit}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                                <CommandSeparator />
                            </>
                        ))}
                    </CommandList>
                )}
            </Command>
        </div>
    )
}

function SearchProductItem({name, serialNum, unit}: {
    name: string
    serialNum: string 
    unit: string
}) {
    return (
        <div className="flex gap-x-2 items-center w-full">
            <ProductPreviewImg />
            <div className="flex justify-between w-full items-center">
                <div className="flex flex-col -space-y-1">
                    <span>{name}</span>
                    <small className="text-gray-600">{serialNum}</small>
                </div>
                <Button variant='outline' className="h-7 py-0 pl-1 pr-2 text-xs">
                    <TiArrowSortedDown className="mr-1"/>
                    <span>{unit}</span>
                </Button>
            </div>
        </div>
    )
}

export function ProductPreviewImg() {
    return (
        <figure className="rounded overflow-hidden w-8 aspect-square">
            <img src="https://via.placeholder.com/50" alt="product image" />
        </figure>
    )
}
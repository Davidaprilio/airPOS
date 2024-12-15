import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/Components/ui/menubar"
import { Button } from "@/Components/ui/button"
import { useState } from "react"
import { FaMinus, FaPlus } from "react-icons/fa6"
import { IconType } from "react-icons"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { TopBar } from "@/Components/pos/templates/TobBar"
import SideBarCart from "@/Components/pos/templates/SideBarCart"
import { TooltipProvider } from "@/Components/ui/tooltip"
import ProductCard from "@/Components/pos/organisms/ProductCard"
import { products } from "@/states/store/dataPOS"
import DialogRemoveItemCart from "@/Components/pos/organisms/DialogRemoveItemCart"


export default function Main() {
    return (
        <TooltipProvider>
            <div className="relative h-screen">
                <TopBar />
                <div className="flex h-full pt-12 bg-zinc-50 max-w-screen-2xl mx-auto">
                    <div className="pt-2 overflow-hiddens w-full">
                        <div className="flex px-12">
                            <MenubarDemo />
                        </div>
                        <ScrollArea scrollHideDelay={200} className="h-[calc(100vh-96px)] px-5 md:px-10 pt-3 z-0">
                            <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-zinc-100 to-transparent from-70% to-100% w-full h-5 z-30"></div>
                            <DialogRemoveItemCart />

                            <div className="w-full mb-4 grid md:grid-cols-2 lg:grid-cols-3 md2: 2lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                                {products.map((product, i) => (
                                    <div className="p-2 col-span-1" key={i} >
                                        <ProductCard 
                                            id={product.id}
                                            name={product.name}
                                            price={product.price}
                                            unit='pcs'
                                            img={product.img}
                                        />
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                    <SideBarCart />
                </div>
            </div>
        </TooltipProvider>
    )
}

function MenubarDemo() {
    return (
        <Menubar>
            <MenubarMenu>
            <MenubarTrigger>Profiles</MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Edit</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                        Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarSub>
                        <MenubarSubTrigger>Find</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem>Search the web</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Find...</MenubarItem>
                            <MenubarItem>Find Next</MenubarItem>
                            <MenubarItem>Find Previous</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator />
                    <MenubarItem>Cut</MenubarItem>
                    <MenubarItem>Copy</MenubarItem>
                    <MenubarItem>Paste</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>View</MenubarTrigger>
                <MenubarContent>
                    <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
                    <MenubarCheckboxItem checked>
                        Always Show Full URLs
                    </MenubarCheckboxItem>
                    <MenubarSeparator />
                    <MenubarItem inset>
                        Reload <MenubarShortcut>⌘R</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem disabled inset>
                        Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem inset>Toggle Fullscreen</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem inset>Hide Sidebar</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Profiles</MenubarTrigger>
                <MenubarContent>
                    <MenubarRadioGroup value="benoit">
                        <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
                        <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                        <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
                    </MenubarRadioGroup>
                    <MenubarSeparator />
                    <MenubarItem inset>Edit...</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem inset>Add Profile...</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}

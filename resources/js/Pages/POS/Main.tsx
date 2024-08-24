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
import { arrFrom } from "@/lib/utils"
import { FaMinus, FaPlus } from "react-icons/fa6"
import { IconType } from "react-icons"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { TopBar } from "@/Components/pos/templates/TobBar"
import SideBarCart from "@/Components/pos/templates/SideBarCart"
import { TooltipProvider } from "@/Components/ui/tooltip"


export default function Main() {
    return (
        <TooltipProvider>
            <div className="relative h-screen">
                <TopBar />
                <div className="flex h-full pt-12 bg-zinc-50">
                    <div className="pt-2 overflow-hiddens">
                        <div className="flex px-12">
                            <MenubarDemo />
                        </div>
                        <ScrollArea className="h-[calc(100vh-96px)] px-10 pt-3 z-0">
                            <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-zinc-50 to-transparent from-70% to-100% w-full h-5 z-30"></div>

                            <div className="w-full flex flex-row flex-wrap mb-4">
                                {arrFrom(32, i => (
                                    <div className="p-2">
                                        <CardProduct key={i} />
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


function CardProduct() {
    return (
        <div className="p-2 rounded-xl shadow-md bg-white relative z-0 cursor-pointer">
            <img src="https://via.placeholder.com/150" alt="product image" className="aspect-[16/11] overflow-hidden w-full object-cover rounded-lg" />
            <figure >
            </figure>
            <div className="pt-2">
                <h3 className="text-sm text-center">Burger Double Beef</h3>
                <div className="text-xs py-2">
                    <sup className="mr-0.5 z-0">Rp</sup>
                    <span>15k</span>
                    <span className="ml-0.5">/pcs</span>
                </div>

                <Button className="h-7 w-full bg-primary">
                    Add to cart
                </Button>
            </div>
        </div>
    )
}

function MenubarDemo() {
    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                        New Window <MenubarShortcut>⌘N</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem disabled>New Incognito Window</MenubarItem>
                    <MenubarSeparator />
                    <MenubarSub>
                        <MenubarSubTrigger>Share</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem>Email link</MenubarItem>
                            <MenubarItem>Messages</MenubarItem>
                            <MenubarItem>Notes</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator />
                    <MenubarItem>
                        Print... <MenubarShortcut>⌘P</MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
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

function Counter() {
    const [count, setCount] = useState(1)
    return (
        <div className="flex items-center">
            <CounterBtn Icon={FaMinus} onClick={() => setCount(v => Math.max(0, v - 1))} />
            <div className="w-10 text-center">{count}</div>
            <CounterBtn Icon={FaPlus} onClick={() => setCount(v => v + 1)} />
        </div>
    )
}

function CounterBtn({ Icon, onClick }: { Icon: IconType, onClick: () => void }) {
    return (
        <Button variant='outline' className="w-6 h-6 p-0 text-gray-800" onClick={onClick}>
            <Icon />
        </Button>
    )
}
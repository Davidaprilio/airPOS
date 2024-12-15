import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import { FaMinus, FaPlus } from "react-icons/fa6";

export default function CounterBtn({ Icon, onClick, className}: { 
    Icon: IconType|'min'|'plus', 
    className?: string, 
    onClick?: () => void,
}) {
    return (
        <Button variant='outline' className={cn("w-7 h-7 p-0 text-gray-800 bg-primary text-primary-foreground hover:bg-primary/80 hover:text-white", className)} onClick={onClick}>
            {Icon === 'min' ? <FaMinus /> :
            Icon === 'plus' ? <FaPlus /> :
            <Icon />
            }
        </Button>
    )
}
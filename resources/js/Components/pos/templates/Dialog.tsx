import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/Components/ui/alert-dialog";
import { ReactElement, ReactNode } from "react";
import { BsCartX } from "react-icons/bs";
import { atom, useRecoilState } from "recoil";


export function DialogConfirmRemove() {
    const [open, setOpen] = useRecoilState(dialogState);

    return (
        <AlertDialog open={open}>
            <AlertDialogContent className="max-w-80">
                <AlertDialogHeader>
                    <BsCartX className="mx-auto text-4xl mb-3" />
                    <AlertDialogTitle className="text-center">
                        Drop from Cart?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                        drop this item from cart?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="justify-center sm:justify-center">
                    <AlertDialogCancel className="w-1/2" onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="w-1/2">Drop</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export const nodeDialogState = atom<ReactNode|null>({
    key: 'nodeDialogState', // unique ID (with respect to other atoms/selectors)
    default: <DialogConfirmRemove />, // default value (aka initial value)
});

export const dialogState = atom({
    key: 'dialogState', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
});

export function Dialog() {
    const [NodeDialog] = useRecoilState(nodeDialogState);
    return (
        <>
            {NodeDialog}
        </>
    )
}

export function useDialog() {
    const [_nodeDialog, setNodeDialog] = useRecoilState(nodeDialogState);
    const [_open, setOpen] = useRecoilState(dialogState);

    const dialog = (open: boolean = true, element: ReactElement|null = null) => {
        if (element) {
            setNodeDialog(element)
        }
        
        setOpen(open)
    }

    return {
        dialog
    }
}

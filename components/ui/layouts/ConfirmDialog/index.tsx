import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { FC } from "react";

type ConfirmDialogProps = {
    id: number; // 削除対象のデータのID
}

export const ConfirmDialog: FC<ConfirmDialogProps> = ({id}) => {
    const handleClick = async () => {
        console.log(id);
        try {
            await axios.post(`http://localhost:8000/todo/delete/${id}`); // IDに基づいてデータを削除
        } catch(e) {
          console.error(e)
        }
        
    };
    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account and
                    remove your data from our servers.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleClick}>Continue</AlertDialogAction>
            </AlertDialogFooter>

        </AlertDialogContent>
       
    );
}
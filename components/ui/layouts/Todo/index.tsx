"use client";

import { AlertDialogTrigger } from "@/components/ui/alert-dialog";

import { FC, useState } from "react";

import { Button } from "@/components/ui/button";

import { Checkbox } from "@/components/ui/checkbox";

import { TrashIcon } from "@/components/ui/icons/TrashIcon";
// ↓追記
import { ConfirmDialog } from "@/components/ui/layouts/ConfirmDialog";


type Props = {
    id: number;
    task: string;
    content: string;
};

export const Todo: FC<Props> = ({ id,task, content }) => {
    const [isDone, setIsDone] = useState<boolean>(false);

    const handleDone = () => {
        setIsDone(!isDone);
        
    };

    return (
        <div className="flex items-center gap-4 p-4">
            <Checkbox className="mx-auto" id="task1" onCheckedChange={handleDone} />
            <div className={`flex-1 min-w-0 ${isDone && "line-through"}`}>
                <h3 className="font-medium leading-none">{task}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{content}</p>
            </div>
            {/* ↓追記 */}
            <AlertDialogTrigger asChild>
                <Button className="rounded-full w-8 h-8" size="icon" variant="destructive">
                    <TrashIcon className="w-4 h-4"/>
                </Button>
            </AlertDialogTrigger>
            <ConfirmDialog id={id} />
        </div>
    );
};
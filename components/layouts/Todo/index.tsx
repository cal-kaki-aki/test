"use client"
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { FC, useState } from "react";

import { Button } from "@/components/ui/button";

import { TodoType } from "@/app/types/todo";
import { ConfirmDialog } from "@/components/layouts/ConfirmDialog";
import { TrashIcon } from "@/components/ui/icons/TrashIcon";
import { API_POST } from "@/env";
import { useRouter } from "next/navigation";

export const Todo: FC<TodoType> = ({id, task, content}) => {
	const [isDone, setIsDone] = useState<boolean>(false);
	const router = useRouter()

	const handleDone = () =>{
		setIsDone(!isDone);
	};

	const handleDelete = async () => {
		try{
			await fetch(API_POST, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ id }),
			})
			router.refresh();
		}catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="flex items-center gap-4 p-4">
			<Checkbox className="mx-auto" id="task1" onCheckedChange={handleDone} />
			<div className={`flex-1 min-w-0 ${isDone && "line-through"}`}>
				<h3 className="font-medium leading-none">{task}</h3>
				<p className="text-sm text-gray-500 dark:text-gray-400">{content}</p>
			</div>
			<AlertDialogTrigger asChild>
			<Button className="rounded-full w-8 h-8" size="icon" variant="destructive">
				<TrashIcon className="w-4 h-4" />
			</Button>
			</AlertDialogTrigger>
			<ConfirmDialog handleDelete={handleDelete} />
		</div>
	);
};
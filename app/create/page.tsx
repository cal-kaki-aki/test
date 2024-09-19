"use client"
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { API_POST } from "@/env";
import { useRouter } from "next/navigation";
import { useState } from 'react';

import Link from "next/link";

export default function PostTodo(){
	const [task, setTask] = useState('')
	const [content, setContent] = useState('')
	const [status, setStatus] = useState('')

	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			await fetch(API_POST, {
				method: "POST",
				headers: {
					"Content-Type":  "application/json",
				},
				body: JSON.stringify({task, content, status}),
			});
			router.push("/");
            router.refresh();
		}catch(error){
			console.log(error);
		}
		
	}

	return (
		<main className="flex justify-center min-h-[700px] items-center">
			<Card className="w-[700px]">
				<CardHeader>
					<CardTitle>Create Todo</CardTitle>
					<CardDescription>Create your niw Todo in one-click</CardDescription>
				</CardHeader>
				<CardContent>
					<form id="data" onSubmit={handleSubmit}>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="title">task</Label>
								<Input name="task" placeholder="Description of your Todo" onChange={(e) => setTask(e.target.value)}></Input>
							</div>
							<div>
								<Label>content</Label>
								<Textarea  name="content" onChange={(e) => setContent(e.target.value)} />
							</div>
							<div>
								<Label>status</Label>
								<Textarea name="status" onChange={(e) => setStatus(e.target.value)} />
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button variant="outline">
						<Link href="/">Cancel</Link>
					</Button>
					<div className="flex gap-4 items-center justify-start">
						<Button  type="submit" form="data">Create</Button>
					</div>
				</CardFooter>
			</Card>
		</main>
	)
}
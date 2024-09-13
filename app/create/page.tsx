"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useState } from 'react';
import axios from 'axios';

export default function CreateTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // ページリロードを防ぐ
        
        try {
            const response = await axios.post('http://localhost:8000/todo', {
                task: title,
                content: description,
                status: 'a'
              });
            
            // 成功した場合の処理
            console.log(response.data);
        } catch (error){
            // エラー処理
            console.error('Todo の作成中にエラーが発生しました:', error);
        }

        setTitle("");
        setDescription("");
    };

    return (
        <main className="flex justify-center min-h-[700px] items-center">
            <Card className="w-[700px]">
                <CardHeader>
                    <CardTitle>Create Todo</CardTitle>
                    <CardDescription>Create your new Todo in one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="title">Title</Label>
                                <Input 
                                    id="title" 
                                    placeholder="Title of your Todo" 
                                    value={title} // useStateで管理しているtitleの値を表示
                                    onChange={(e) => setTitle(e.target.value)} 
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="description">Description</Label>
                                <Textarea 
                                    id="description"
                                    placeholder="Description of your Todo"
                                    value={description} // useStateで管理しているdescriptionの値を表示
                                    onChange={(e) => setDescription(e.target.value)} // 入力時にdescriptionを更新
                                /> 
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">
                        <Link href="/">Cancel</Link>
                    </Button>
                    <Button onClick={handleSubmit}>Create</Button>
                </CardFooter>
            </Card>
        </main>
    );
}
"use client";  // クライアントコンポーネントとしてマーク

import { useState } from 'react';
import axios from 'axios';
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

export default function CreateTodo() {
  // Stateを追加
  const [task, settask] = useState('');
  const [content, setcontent] = useState('');

  // Saveボタン押下時の処理
  const onClickCreate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    axios.post('http://localhost:8000/todo', {
      task: task,
      content: content,
      status: 'testA'
    })
      .then((res) => {
        // 成功した場合の処理
        console.log('Todo created:', res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // テキストボックスの値が変更された時Stateを更新する
  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    settask(event.target.value);
  };

  const onChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setcontent(event.target.value);
  };

  return (
    <main className="flex justify-center min-h-[700px] items-center">
      <Card className="w-[700px]">
        <CardHeader>
          <CardTitle>Create Todo</CardTitle>
          <CardDescription>Create your new Todo in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={task}
                  onChange={onChangeTitle}
                  placeholder="Title of your Todo"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={content}
                  onChange={onChangeDescription}
                  placeholder="Description of your Todo"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            <Link href="/">Cancel</Link>
          </Button>
          <Button onClick={onClickCreate}>Create</Button>
        </CardFooter>
      </Card>
    </main>
  );
}

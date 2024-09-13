"use client"; // コードがクライアントサイド(ウェブブラウザ上)で実行されることを指定

import { Todo } from "@/components/ui/layouts/Todo";
import { AlertDialog } from "@/components/ui/alert-dialog";
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Home() {
  interface Todo{
    id: number
    task:string;
    content:string;
  }
  let [title, setTitle] = useState<Todo[]>([]);
  // const [description, setDescription] = useState<string>('');

  // useEffect(() => { console.log('Updated title:',title);},[title]);
  useEffect(() => {
    axios.get('http://localhost:8000/todo')
      .then(response => {
        // APIレスポンスからtitleとdescriptionを取得
        setTitle(response.data as Todo[]);
        // setDescription(response.data.content);
      })
      .catch(error => {
        console.error('エラーが発生しました', error);
      });
  }, []);

  return (
    <main className="flex-1 pt-[60px] grid max-w-[700px] min-h-[calc(100vh_-_1rem)] divide-y p-4 text-sm lg:min-h-[calc(100vh_-_1.5rem)]">
      <AlertDialog>
        <div className="flex-1 overflow-auto py-4 lg:py-6">
        {title.map(todo => (
          // eslint-disable-next-line prettier/prettier
          <Todo
            key = {todo.id}
            id={todo.id}
            task={todo.task}
            content={todo.content}
          />
        ))}{' '}
 
        </div>
      </AlertDialog>
    </main>
  );
}
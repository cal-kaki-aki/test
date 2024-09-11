"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Todo } from "@/components/layouts/Todo";
import { AlertDialog } from "@/components/ui/alert-dialog";

interface TodoItem {
  id: number;
  title: string;
  task: string;
  status: string;
}
export default function Home() {
  const [todos, setTodos] = useState<TodoItem[]>([]); // Todoリストを保存する状態

  // データをaxiosでフェッチする関数
  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8000/todo"); // axiosでGETリクエスト
      setTodos(response.data); // 取得したデータを状態に保存
      console.log(response.data)
    } catch (error) {
      console.error("Failed to fetch todos:", error); // エラーハンドリング
    }
  };

  // コンポーネントが最初にマウントされた時にデータを取得
  useEffect(() => {
    fetchTodos();
  }, []); // 依存配列が空であるため、最初のレンダリング時のみ実行
    return (
        <main className="flex-1 pt-[60px] grid max-w-[700px] min-h-[calc(100vh_-_1rem)] divide-y p-4 text-sm lg:min-h-[calc(100vh_-_1.5rem)]">
            <AlertDialog>
                <div className="flex-1 overflow-auto py-4 lg:py-6">
                {todos.map((todo) => (
                  <Todo
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    task={todo.task}
                    status={todo.status}
                  />
                ))}
            </div>
          </AlertDialog>
        </main>
    );
}
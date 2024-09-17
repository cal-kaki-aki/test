"use client";  // クライアントコンポーネントとしてマーク

import { Todo } from "@/components/layouts/Todo";
// ↓追記
import { AlertDialog } from "@/components/ui/alert-dialog";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Todo コンポーネントの定義
interface Todo {
  id: number;
  task: string;
  content: string;
  status: string;
}

export default function Home() {
  // Stateの定義はコンポーネント内部で行う必要がある
  const [info, setInfo] = useState([]);
  const [post, setPosts] = useState<TodoType[]>([]);  // 型を明示的に指定する

  useEffect(() => {
    axios.get("http://localhost:8000/todo")
      // レスポンス処理
      .then((res) => {  // レスポンスを受け取ったらthenを実行する
        setPosts(res.data);

        // GETで取得したデータをforEachでループしてStateにセットする
        res.data.forEach((item: TodoType) => {  // 'any' の代わりに 'item: TodoType'
          const data: TodoType = {
            id: item.id,  // itemの型がTodoTypeなので、直接プロパティにアクセスできる
            task: item.task,
            content: item.content,
            status: item.status,
          };
          //datad.push(data);  // dataをdatadに追加する
        });
      })
      .catch((error) => {  // エラーコードが返ってきた場合
        console.log(error);  // エラーコードを表示
      });
  }, []);

  return (
    <main className="flex-1 pt-[60px] grid max-w-[700px] min-h-[calc(100vh_-_1rem)] divide-y p-4 text-sm lg:min-h-[calc(100vh_-_1.5rem)]">
      {/* ↓追記 */}
      <AlertDialog>
        <div className="flex-1 overflow-auto py-4 lg:py-6">
          {/* リストを描画し、keyを設定 */}
          {post.map((item) => (
            <Todo
              key={item.id}  // 各Todoに一意のkeyを設定
              id={item.id}
              task={item.task}
              content={item.content}
              status={item.status}
            />
          ))}
        </div>
      </AlertDialog>
    </main>
  );
}
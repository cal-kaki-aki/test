import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,

} from "@/components/ui/alert-dialog";
import axios from 'axios';
import { FC, useState } from "react";

type Props = {
  id: number;  // TodoのIDをPropsに追加
  task: string;
  content: string;
  status: string;
};

export const ConfirmDialog: FC<Props> = ({ id }) => {

  const onClickDelete = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log(id); // ボタンがクリックされたか確認

    // 削除するTodoのIDを指定
    const todoId = 100; // ここで削除するTodoのIDを指定


    axios.post(`http://localhost:8000/todo/delete/${id}`)
      .then(res => {
        // 成功した場合の処理
        console.log('Todo deleted:', res.data);
        // データ削除後にリストを再取得
        //fetchTodos();
      })
      .catch((error) => {
        console.error('Error deleting todo:', error);
      });
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
        <AlertDialogAction onClick={onClickDelete}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
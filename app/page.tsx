import { AlertDialog } from "@/components/ui/alert-dialog";

import { TodoType } from "@/app/types/todo";
import { Todo } from "@/components/layouts/Todo";
import { API_POST } from "@/env";


async function getTodos() {
    const response = await fetch(API_POST, {
        cache: "no-store",
    });

    const todos: TodoType[] = await response.json();
    return todos;
}

export default async function Home() {
    const todos = await getTodos();
    return (
        <main className="flex-1 pt-[60px] grid max-w-[700px] min-h-[calc(100vh_-_1rem)] divide-y p-4 text-sm lg:min-h-[calc(100vh_-_1.5rem)]">
            <div className="flex-1 overflow-auto py-4 lg:py-6">
                {todos.map((todo: TodoType) => {
                    return (
                    <AlertDialog key={todo.id}>
                        <Todo id={todo.id} task={todo.task} content={todo.content} />
                    </AlertDialog>
                    );
                })}
            </div>
        </main>
    );
}
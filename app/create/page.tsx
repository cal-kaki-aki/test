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
                                <Input id="title" placeholder="Title of your Todo" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="description">Description</Label>
                                <Textarea placeholder="Description of your Todo" />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">
                        <Link href="/">Cancel</Link>
                    </Button>
                    <Button>Create</Button>
                </CardFooter>
            </Card>
        </main>
    );
}
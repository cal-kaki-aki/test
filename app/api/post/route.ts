import { API_ERROR_JSON, API_ERROR_MESSAGE } from "@/constants/constants";
import { CCK_BACK_API } from "@/env";
import axios from 'axios';
import { NextResponse } from "next/server";

const instance = axios.create({
	baseURL: CCK_BACK_API,
});


// todo一覧取得API
export async function GET(req: Request) {
	try {
		const response = await instance.get('/todo')
		return NextResponse.json(response.data)
	}catch(error){
		// エラー処理
		console.error(API_ERROR_MESSAGE, error);
		return NextResponse.json(API_ERROR_JSON)
	};
}

export async function POST(req: Request) {
	try {
		const request = await req.json();
		const post = await instance.post('/todo', request);
		return NextResponse.json(post.data)
	}catch(error){
		// エラー処理
		console.error(API_ERROR_MESSAGE, error);
		return NextResponse.json(API_ERROR_JSON)
	};
}

export async function DELETE(req: Request) {
	try {
		const {id} = await req.json();
		const deleteItem = await instance.post(`/todo/delete/${id}`);
		return NextResponse.json(deleteItem)
	}catch(error){
		// エラー処理
		console.error(API_ERROR_MESSAGE, error);
		return NextResponse.json(API_ERROR_JSON)
	};
}
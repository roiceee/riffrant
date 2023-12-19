import { connectMongoDB } from "@/app/lib/mongo";
import { PostModel } from "@/app/models/post";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  //get posts from database

  await connectMongoDB();
  const posts = await PostModel.find({}).sort({ createdAt: -1 });

  if (!posts) {
    return NextResponse.json(null, { status: 404 });
  }

  return NextResponse.json(posts, { status: 200 });
}

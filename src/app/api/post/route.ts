import { connectMongoDB } from "@/lib/mongo";
import { PostModel } from "@/models/post";
import { NextRequest, NextResponse } from "next/server";

//add post
export async function POST(req: NextRequest, res: NextResponse) {
  const { creatorId, creatorName, title, body, upvotes, createdAt } =
    await req.json();

  await connectMongoDB();

  const post = await PostModel.create({
    creatorId,
    creatorName,
    title,
    body,
    upvotes,
    createdAt,
  });

  if (!post) {
    return NextResponse.json(null, { status: 400 });
  }

  //return post alongside status code
  return NextResponse.json(
    {
      post,
    },
    { status: 201 }
  );
}

//get single post

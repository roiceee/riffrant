import { connectMongoDB } from "@/lib/mongo";
import { PostModel } from "@/models/post";
import { NextRequest, NextResponse } from "next/server";

//get single post
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  await connectMongoDB();

  const post = await PostModel.findOne({ _id: params.slug });

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

//delete single post
export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  await connectMongoDB();

  const post = await PostModel.deleteOne({ _id: params.slug });

  if (!post) {
    return NextResponse.json(null, { status: 204 });
  }

  //return post alongside status code
  return NextResponse.json(
    {
      post,
    },
    { status: 202 }
  );
}

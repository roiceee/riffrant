import { connectMongoDB } from "@/lib/mongo";
import { PostModel } from "@/models/post";
import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

//add post
export async function POST(req: NextRequest, res: NextResponse) {
  const { creatorId, creatorName, title, body, upvotes, createdAt } =
    await req.json();

  await connectMongoDB();

  const session = await getSession();

  if (creatorId !== session!.user.sub) {
    return NextResponse.json(null, { status: 401 });
  }

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

import { connectMongoDB } from "@/lib/mongo";
import { PostModel } from "@/models/post";
import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

//add post
export async function POST(req: NextRequest, res: NextResponse) {
  const { title, body } = await req.json();

  await connectMongoDB();

  const session = await getSession();

  const creatorId = session?.user.sub;

  const creatorName = session?.user.name;

  const post = await PostModel.create({
    creatorId,
    creatorName,
    title,
    body,
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

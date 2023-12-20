import { connectMongoDB } from "@/lib/mongo";
import { PostModel } from "@/models/post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  //get posts from database

  const query = req.nextUrl.searchParams.get("cursor");
  const userId = req.nextUrl.searchParams.get("id");

  if (!query) {
    return NextResponse.json(null, { status: 400 });
  }
  const skips: number = parseInt(query);

  const pageSize: number = 5;

  await connectMongoDB();

  let posts;

  if (!userId) {
    posts = await PostModel.find({})
      .sort({ createdAt: -1 })
      .skip(skips)
      .limit(pageSize);
  } else {
    posts = await PostModel.find({creatorId: userId})
      .sort({ createdAt: -1 })
      .skip(skips)
      .limit(pageSize);
  }

  if (!posts) {
    return NextResponse.json(null, { status: 404 });
  }

  if (posts.length === 0) {
    return NextResponse.json({ data: posts }, { status: 200 });
  }

  return NextResponse.json(
    { data: posts, nextCursor: skips + posts.length },
    { status: 200 }
  );
}

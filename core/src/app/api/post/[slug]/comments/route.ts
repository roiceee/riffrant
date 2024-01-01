import { connectMongoDB } from "@/lib/mongo";
import { CommentModel } from "@/models/comment";
import { NextRequest, NextResponse } from "next/server";

//get all comments in a single post
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const query = req.nextUrl.searchParams.get("cursor");

  if (!query) {
    return NextResponse.json(null, { status: 400 });
  }

  const skips: number = parseInt(query);

  const pageSize: number = 5;

  await connectMongoDB();

  const comments = await CommentModel.find({ postId: params.slug })
    .sort({ createdAt: "desc" })
    .skip(skips)
    .limit(pageSize);

  if (!comments) {
    return NextResponse.json(null, {
      status: 400,
    });
  }

  if (comments.length === 0) {
    return NextResponse.json(
      { data: comments },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json(
    {
      data: comments,
      nextCursor: skips + comments.length,
    },
    { status: 200 }
  );
}

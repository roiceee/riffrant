import { connectMongoDB } from "@/lib/mongo";
import { CommentModel } from "@/models/comment";
import { PostModel } from "@/models/post";
import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

//add comment to a post
export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({
      status: 401,
      body: {
        message: "Unauthorized",
      },
    });
  }

  const {body} = await req.json();

  await connectMongoDB();

  const post = await PostModel.findOne({ _id: params.slug });

  if (!post) {
    return NextResponse.json({
      status: 400,
      body: {
        message: "Post not found",
      },
    });
  }

  const comment = await CommentModel.create({
    postId: params.slug,
    body: body,
    creatorId: session.user.sub,
    creatorName: session.user.name,
  });

  if (comment) {
    await PostModel.findOneAndUpdate(
      { _id: params.slug },
      { $set: { comments: post.comments + 1 } }
    );
  }

  return NextResponse.json({
    status: 200,
    body: {
      comment,
    },
  });
}

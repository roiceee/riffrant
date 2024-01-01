import { connectMongoDB } from "@/lib/mongo";
import { CommentModel } from "@/models/comment";
import { PostModel } from "@/models/post";
import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";


//delete comment of a post
export async function DELETE(
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

  await connectMongoDB();

  //delete comment first

  const comment = await CommentModel.findOneAndDelete({
    _id: params.slug,
    creatorId: session!.user.sub,
  });

  if (!comment) {
    return NextResponse.json(null, { status: 404 });
  }

  //then update post comment count

  const post = await PostModel.findOneAndUpdate(
    { _id: comment.postId },
    { $inc: { comments: -1 } }
  );

  if (!post) {
    return NextResponse.json(null, { status: 204 });
  }

  return NextResponse.json(
    {
      comment,
    },
    { status: 202 }
  );
}

//update comment of a post
export async function PATCH(
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

  await connectMongoDB();

  const {body} = await req.json();

  //update comment
  const comment = await CommentModel.findOneAndUpdate(
    {
      _id: params.slug,
      creatorId: session!.user.sub,
    },
    {
      $set: {
        body: body,
      },
    },
    { new: true }
  );

  if (!comment) {
    return NextResponse.json(null, { status: 204 });
  }

  return NextResponse.json(
    {
      comment,
    },
    { status: 202 }
  );
}

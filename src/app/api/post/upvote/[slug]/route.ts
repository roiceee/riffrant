import { connectMongoDB } from "@/lib/mongo";
import { PostModel } from "@/models/post";
import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(null, { status: 401 });
  }

  await connectMongoDB();

  //check if user already upvoted, if yes, remove upvote

  //if already downvoted, remove downvote first

  const post = await PostModel.findOne({ _id: params.slug });

  if (post.downvotes.includes(session.user.sub)) {
    const result = await PostModel.findOneAndUpdate(
      { _id: params.slug },
      { $pull: { downvotes: session.user.sub } },
      { new: true }
    );
  }

  if (post.upvotes.includes(session.user.sub)) {
    const result = await PostModel.findOneAndUpdate(
      { _id: params.slug },
      { $pull: { upvotes: session.user.sub } },
      { new: true }
    );
    if (!result) {
      return NextResponse.json(null, { status: 500 });
    }
    return NextResponse.json(result, { status: 202 });
  }

  const result = await PostModel.findOneAndUpdate(
    { _id: params.slug },
    { $addToSet: { upvotes: session.user.sub } },
    { new: true }
  );

  if (!result) {
    return NextResponse.json(null, { status: 500 });
  }

  return NextResponse.json(result, { status: 202 });
}

import { connectMongoDB } from "@/lib/mongo";
import { checkVoteRateLimit } from "@/lib/server-actions";
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

  const limitData = await checkVoteRateLimit(session.user.sub);

  if (limitData) {
    if (limitData.status === 429) {
      return NextResponse.json(
        {
          message: limitData.message,
        },
        { status: 429 }
      );
    }
  }

  await connectMongoDB();

  //check if user already downvoted, if yes, remove downvote

  //if already upvoted, remove upvote first

  const post = await PostModel.findOne({ _id: params.slug });

  if (post.upvotes.includes(session.user.sub)) {
    const result = await PostModel.findOneAndUpdate(
      { _id: params.slug },
      { $pull: { upvotes: session.user.sub }, $inc: { score: -1 } },
      { new: true }
    );
  }

  if (post.downvotes.includes(session.user.sub)) {
    const result = await PostModel.findOneAndUpdate(
      { _id: params.slug },
      { $pull: { downvotes: session.user.sub }, $inc: { score: 1 } },
      { new: true }
    );
    if (!result) {
      return NextResponse.json(null, { status: 500 });
    }

    return NextResponse.json(result, { status: 202 });
  }

  const result = await PostModel.findOneAndUpdate(
    { _id: params.slug },
    { $addToSet: { downvotes: session.user.sub }, $inc: { score: -1 } },
    { new: true }
  );

  if (!result) {
    return NextResponse.json(null, { status: 500 });
  }

  return NextResponse.json(result, { status: 202 });
}

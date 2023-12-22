//get all post metadata

import { connectMongoDB } from "@/lib/mongo";
import { PostModel } from "@/models/post";
import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getSession();
  await connectMongoDB();

  if (!session) {
    return NextResponse.json(null, { status: 401 });
  }

  //get number of posts and total scores by creatorId, only for specific user

    const metadata = await PostModel.aggregate([
        {
        $match: {
            creatorId: session.user.sub,
        },
        },
        {
        $group: {
            _id: "$creatorId",
            totalPosts: { $sum: 1 },
            totalScore: { $sum: "$score" },
        },
        },
    ]);

  if (!metadata) {
    return NextResponse.json(null, { status: 400 });
  }

  //return post alongside status code
  return NextResponse.json(
    {
      metadata,
    },
    { status: 201 }
  );
}

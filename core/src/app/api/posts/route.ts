import { connectMongoDB } from "@/lib/mongo";
import { PostModel } from "@/models/post";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

//public, get all posts
export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("cursor");
  const sortBy = req.nextUrl.searchParams.get("sortBy");
  const userId = req.nextUrl.searchParams.get("id");

  if (!query) {
    return NextResponse.json(null, { status: 400 });
  }
  const skips: number = parseInt(query);

  const pageSize: number = 5;

  await connectMongoDB();

  let posts;

  if (sortBy === "recent") {
    if (!userId) {
      posts = await PostModel.find({})
        .sort({ createdAt: -1 })
        .skip(skips)
        .limit(pageSize);
    } else {
      posts = await PostModel.find({ creatorId: userId })
        .sort({ createdAt: -1 })
        .skip(skips)
        .limit(pageSize);
    }
  }

  if (sortBy === "popular") {
    //sort first by length of upvotes array, and then length of downvotes array
    //the top should be the post with most upvotes and least downvotes

    if (!userId) {
      posts = await PostModel.find({})
        .sort({ score: -1 })
        .skip(skips)
        .limit(pageSize);
    } else {
      posts = await PostModel.find({ creatorId: userId })
        .sort({ score: -1 })
        .skip(skips)
        .limit(pageSize);
    }
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

//private, deletes all posts of a user
export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(null, { status: 401 });
    }

    const userId = session.user.sub;

    await connectMongoDB();

    await PostModel.deleteMany({ creatorId: userId });

    return NextResponse.json({ msg: "Deleted" }, { status: 202 });
  } catch (e) {
    return NextResponse.json(null, { status: 500 });
  }
}

"use client";

import { timeFormatter } from "@/lib/util";
import Post from "@/types/post";
import NormalContainer from "./normal-container";
import Link from "next/link";
import PostControl from "../posts/post-control";

interface PostCardProps {
  post: Post;
  onDelete: () => void;
}

function PostCard({ post, onDelete }: PostCardProps) {
  return (
    <NormalContainer className="border-base-100 hover:border-base-content max-w-full shadow-md">
      <Link href={"/post/" + post._id} className=" no-underline">
        <div className="prose">
          <div className="font-semibold opacity-80 text-xs">
            {post.creatorName}
          </div>
          <h3 className="mb-0 mt-2 break-words">{post.title}</h3>
          <div className="font-semibold opacity-80 text-xs">
            {timeFormatter(post.createdAt!)}
          </div>
          <p
            className={
              "text-sm whitespace-nowrap overflow-hidden overflow-ellipsis"
            }
          >
            {post.body}
          </p>
        </div>
        <PostControl post={post} onDelete={onDelete} />
      </Link>
    </NormalContainer>
  );
}

export default PostCard;

"use client";

import { timeFormatter } from "@/lib/scripts/time-formatter";
import Post from "@/types/post";
import NormalContainer from "./normal-container";
import style from "./post-card.module.css";
import Link from "next/link";
import PostControl from "../posts/post-control";

interface PostCardProps {
  post: Post;
  onDelete: () => void;
}

function PostCard({ post, onDelete }: PostCardProps) {
  return (
    <NormalContainer className="hover:border-primary max-w-full shadow-md">
      <Link href={"/post/" + post._id}>
        <div className="prose">
          <div className="font-semibold opacity-80 text-xs">
            {post.creatorName}
          </div>
          <h3 className="mb-0 mt-2 break-words">{post.title}</h3>
          <div className="font-semibold opacity-80 text-xs">
            {timeFormatter(post.createdAt!)}
          </div>
          <p
            className={"text-sm break-words " + style.fadeOutBottom}
            style={{ maxHeight: "120px" }}
          >
            {post.body}
          </p>
        </div>
        <PostControl post={post} onDelete={onDelete}/>
      </Link>
    </NormalContainer>
  );
}

export default PostCard;

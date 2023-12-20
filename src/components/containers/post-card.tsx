"use client";
import DownvoteButton from "@/assets/downvote-icon";
import UpvoteIcon from "@/assets/upvote-icon";
import { timeFormatter } from "@/lib/scripts/time-formatter";
import Post from "@/types/post";
import NormalContainer from "./normal-container";
import style from "./post-card.module.css";
import Link from "next/link";

interface PostCardProps {
  post: Post;
}

function PostCard({ post }: PostCardProps) {
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
        <div className="flex items-center justify-end gap-2 mt-3">
          <div className="border flex items-center p-1 rounded-lg gap-2">
            <button className="btn btn-outline btn-success btn-sm px-2 ">
              <UpvoteIcon />
            </button>
            <span className=" text-sm">
              <b>{post.upvotes}</b>
            </span>
            <button className="btn btn-outline btn-error btn-sm px-2">
              <DownvoteButton />
            </button>
          </div>
        </div>
      </Link>
    </NormalContainer>
  );
}

export default PostCard;

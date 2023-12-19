import UpvoteIcon from "@/app/assets/upvote-icon";
import NormalContainer from "./normal-container";
import DownvoteButton from "@/app/assets/downvote-icon";
import style from "./post-card.module.css";
import _ from "lodash";
import Post from "@/types/post";

interface PostCardProps {
  onClick?: () => void;
  post: Post;
}

function PostCard({ post, onClick }: PostCardProps) {
  return (
    <NormalContainer className="hover:border-primary max-w-md">
      <div className="prose" onClick={onClick}>
        <div className="font-semibold opacity-80 text-xs">
          Posted by: {post.creatorName}
        </div>
        <h3 className="mb-0 mt-2">{post.title}</h3>

        <div className="font-semibold opacity-80 text-xs">{post.createdAt}</div>

        <p
          className={
            " overflow overflow-y-hidden text-sm " + style.fadeOutBottom
          }
          style={{ maxHeight: "120px" }}
        >
          {post.body}
        </p>
      </div>

      <div className="flex items-center justify-start gap-2 mt-3">
        <button className="btn btn-outline btn-success btn-sm">
          <UpvoteIcon />
        </button>
        <span className=" text-lg">
          <b>{post.upvotes}</b>
        </span>
        <button className="btn btn-outline btn-error btn-sm">
          <DownvoteButton />
        </button>
      </div>
    </NormalContainer>
  );
}

export default PostCard;

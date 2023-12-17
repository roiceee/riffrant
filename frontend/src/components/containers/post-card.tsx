import UpvoteIcon from "@/app/assets/upvote-icon";
import NormalContainer from "./normal-container";
import DownvoteButton from "@/app/assets/downvote-icon";
import style from "./post-card.module.css"
import _ from "lodash";

interface PostCardProps {
  title: string;
  displayName: string;
  body: string;
  upvotes: number;
}

function PostCard({ title, displayName, body, upvotes }: PostCardProps) {
  return (
    <NormalContainer className="hover:border-primary">
      <div className="prose">
        <h3 className="mb-1">{title}</h3>
        <div className="font-semibold opacity-80">{displayName}</div>
        <p
          className={" overflow overflow-y-hidden " + style.fadeOutBottom}
          style={{ maxHeight: "120px" }}
        >
          {body}
        </p>
      </div>

      <div className="flex items-center justify-start gap-2 mt-3">
        <button className="btn btn-outline btn-success btn-sm">
          <UpvoteIcon />
        </button>
        <span className=" text-lg">
          <b>{upvotes}</b>
        </span>
        <button className="btn btn-outline btn-error btn-sm">
          <DownvoteButton />
        </button>
      </div>
    </NormalContainer>
  );
}

export default PostCard;

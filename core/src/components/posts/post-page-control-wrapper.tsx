"use client";
import Post from "@/types/post";
import PostControl from "./post-control";
import { useRouter } from "next/navigation";

interface Props {
  post: Post;
  onAddComment?: () => void;
}

function PostPageControlWrapper({ post, onAddComment }: Props) {
  const router = useRouter();

  return (
    <PostControl
      onDelete={() => {
        router.back();
      }}
      onAddComment={onAddComment}
      post={post}
    />
  );
}

export default PostPageControlWrapper;

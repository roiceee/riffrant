"use client";
import Post from "@/types/post";
import PostControl from "./post-control";
import { useRouter } from "next/navigation";

interface Props {
  post: Post;
}

function PostPageControlWrapper({ post }: Props) {
  const router = useRouter();

  return (
    <PostControl
      onDelete={() => {
        router.back();
      }}
      post={post}
    />
  );
}

export default PostPageControlWrapper;

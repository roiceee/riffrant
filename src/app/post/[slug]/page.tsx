"use client";
import PostPageControlWrapper from "@/components/posts/post-page-control-wrapper";
import LoadingDiv from "@/components/util/loading";
import { getSinglePost } from "@/lib/actions-client";
import { timeFormatter } from "@/lib/util";
import Post from "@/types/post";
import { useQuery } from "react-query";

function PostPage({ params }: { params: { slug: string } }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["post-page", params],
    queryFn: () => getSinglePost({ params }),
    cacheTime: 0
  });

  if (isLoading) {
    return <LoadingDiv />;
  }

  if (!data) {
    return (
      <section>
        <div className="text-center">
          <h1 className="text-3xl">404</h1>
          <p className="text-sm">Post not found</p>
        </div>
      </section>
    );
  }

  const post: Post = data.post;

  return (
    <section>
      <section className="rounded-lg p-4 shadow-lg bg-base-100 break-words">
        <div className="prose">
          <div>
            <div className="font-semibold opacity-80 text-xs">
              Posted by: {post.creatorName}
            </div>
          </div>
          <h3 className="mb-0 mt-2 break-words">{post.title}</h3>
          <div className="font-semibold opacity-80 text-xs">
            {timeFormatter(post.createdAt!)}
          </div>
          <p className="mb-16">{post.body}</p>
        </div>
        <PostPageControlWrapper post={post} />
      </section>
    </section>
  );
}

export default PostPage;

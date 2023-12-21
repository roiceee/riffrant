import PostControl from "@/components/posts/post-control";
import PostPageControlWrapper from "@/components/posts/post-page-control-wrapper";
import BackButton from "@/components/util/back-button";
import { getSinglePost } from "@/lib/actions-server";
import { timeFormatter } from "@/lib/time-formatter";
import Post from "@/types/post";

async function PostPage({ params }: { params: { slug: string } }) {
  
  const data = await getSinglePost({ params });

  if (!data) {
    return (
      <section>
        <div className="mb-2">
          <BackButton />
        </div>

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
      <div className="mb-2">
        <BackButton />
      </div>
      {
        <section className="rounded-lg p-4 shadow-lg bg-neutral break-words">
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
      }
    </section>
  );
}

export default PostPage;

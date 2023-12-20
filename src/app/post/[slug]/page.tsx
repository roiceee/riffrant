import DownvoteButton from "@/assets/downvote-icon";
import UpvoteIcon from "@/assets/upvote-icon";
import BackButton from "@/components/util/back-button";
import { timeFormatter } from "@/lib/scripts/time-formatter";
import Post from "@/types/post";

async function PostPage({ params }: { params: { slug: string } }) {
  const getPost = async () => {
    const res = await fetch(
      `${process.env.AUTH0_BASE_URL}/api/post/${params.slug}`
    );

    const data = await res.json();

    return data.post;
  };

  const post: Post = await getPost();

  return (
    <section>
      <div className="mb-2">
        <BackButton />
      </div>
      <section className="border rounded-lg p-4 shadow-lg break-words">
        
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
          <p>{post.body}</p>
        </div>

        <hr className="my-1 opacity-50" />
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
      </section>
    </section>
  );
}

export default PostPage;

import EditPost from "@/components/posts/edit-post";
import { getSinglePost } from "@/lib/actions-server";
import Post from "@/types/post";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

async function EditPostPage({ params }: { params: { slug: string } }) {
  const session = await getSession();
  const { post }: { post: Post } = await getSinglePost({ params });

  if (!post) {
    redirect("/");
  }

  if (!session) {
    redirect("/api/auth/login");
  }

  if (post.creatorId !== session?.user.sub) {
    redirect(`/post/${post._id}`);
  }

  return (
    <main>
      <EditPost post={post} />
    </main>
  );
}

export default EditPostPage;

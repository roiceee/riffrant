import EditPost from "@/components/posts/edit-post";
import { getSinglePost } from "@/lib/actions-server";

async function EditPostPage({ params }: { params: { slug: string } }) {
  const { post } = await getSinglePost({ params });

  return (
    <main>
      <EditPost post={post} />
    </main>
  );
}

export default EditPostPage;

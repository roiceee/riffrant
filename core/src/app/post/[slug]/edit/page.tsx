"use client";
import EditPost from "@/components/posts/edit-post";
import LoadingDiv from "@/components/util/loading";
import { getSinglePost } from "@/lib/actions-client";
import Post from "@/types/post";
import { getSession } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "react-query";

function EditPostPage({ params }: { params: { slug: string } }) {
  const user = useUser();

  const [postId, setPostId] = useState<string>("");

  const postQuery = useQuery({
    queryKey: ["edit-post", postId],
    queryFn: () => getSinglePost({ params }),
    enabled: !!user.user,
  });

  if (user.isLoading) {
    return <LoadingDiv />;
  }

  if (!user.user) {
    redirect("/api/auth/login");
  }

  if (postQuery.isLoading) {
    return <LoadingDiv />;
  }

  if (!postQuery.data.post) {
    redirect("/");
  }

  if (postQuery.data.post.creatorId !== user.user.sub) {
    redirect(`/post/${postQuery.data.post._id}`);
  }

  return (
    <main>
      <EditPost post={postQuery.data.post} />
    </main>
  );
}

export default EditPostPage;

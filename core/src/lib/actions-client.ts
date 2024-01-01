import Comment from "@/types/comment";
import Post from "@/types/post";

export async function addPost(post: Post) {
  const res = await fetch("/api/post", {
    method: "POST",
    body: JSON.stringify({
      title: post.title,
      body: post.body,
    }),
  });

  if (res.status === 429) {
    throw new Error(
      "Draft saved. Post rate limit reached. Try again in a few minutes."
    );
  }

  const data = await res.json();

  return data;
}

export const getSinglePost = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const res = await fetch(`/api/post/${params.slug}`);

  const data = await res.json();

  return data;
};

export async function editPost(post: Post) {
  const res = await fetch(`/api/post`, {
    method: "PATCH",
    body: JSON.stringify({
      body: post.body,
      _id: post._id,
    }),
  });

  const data = await res.json();

  return data;
}

export async function getPosts({ pageParam = 0 }, sortBy: string) {
  const res = await fetch(
    `/api/posts?cursor=${pageParam}&sortBy=${sortBy ? sortBy : "recent"}`,
    {
      method: "GET",
    }
  );

  const data = await res.json();
  return data;
}

export async function getUserPosts(
  { pageParam = 0 },
  sortBy: string,
  id: string
) {
  const res = await fetch(
    `/api/posts?id=${id}&cursor=${pageParam}&sortBy=${
      sortBy ? sortBy : "recent"
    }`,
    {
      method: "GET",
    }
  );

  const data = await res.json();
  return data;
}

export async function deleteUserPost(postId: string) {
  const res = await fetch(`/api/post/${postId}`, {
    method: "DELETE",
  });

  const data = await res.json();

  return data;
}

export async function deleteAllPosts() {
  const res = await fetch(`/api/posts`, {
    method: "DELETE",
  });

  const data = await res.json();
  return data;
}

export async function upvotePost(postId: string) {
  const res = await fetch(`/api/post/upvote/${postId}`, {
    method: "POST",
  });

  if (res.status === 429) {
    throw new Error("Spam behavior detected. Try again in a few minutes.");
  }

  const data = res.json();

  return data;
}

export async function downvotePost(postId: string) {
  const res = await fetch(`/api/post/downvote/${postId}`, {
    method: "POST",
  });

  if (res.status === 429) {
    throw new Error("Spam behavior detected. Try again in a few minutes.");
  }

  const data = res.json();

  return data;
}

export async function getPostsMetadata() {
  const res = await fetch(`/api/posts/metadata`, {
    method: "GET",
  });

  const data = await res.json();

  return data;
}

export async function addPostComment(postId: string, comment: string) {
  const res = await fetch(`/api/post/${postId}/comment`, {
    method: "POST",
    body: JSON.stringify({
      body: comment,
    }),
  });

  if (res.status === 429) {
    throw new Error("Comment rate limit reached. Try again in a few minutes.");
  }

  const data = await res.json();

  return data;
}

export async function getComments({ pageParam = 0 }, postId: string) {
  const res = await fetch(`/api/post/${postId}/comments?cursor=${pageParam}`, {
    method: "GET",
  });

  const data = await res.json();
  return data;
}

export async function deletePostComment(commentId: string) {
  const res = await fetch(`/api/comment/${commentId}`, {
    method: "DELETE",
  });

  const data = await res.json();

  return data;
}

export async function editPostComment(comment: Comment) {
  const res = await fetch(`/api/comment/${comment._id}`, {
    method: "PATCH",
    body: JSON.stringify({
      body: comment.body,
    }),
  });

  const data = await res.json();

  return data;
}

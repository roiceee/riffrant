import Post from "@/types/post";

export async function addPost(post: Post) {
  const res = await fetch("/api/post", {
    method: "POST",
    body: JSON.stringify({
      title: post.title,
      body: post.body,
    }),
  });

  const data = await res.json();

  return data;
}

export async function editPost(post: Post) {
  const res = await fetch(`/api/post`, {
    method: "PUT",
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

  const data = res.json();

  return data;
}

export async function downvotePost(postId: string) {
  const res = await fetch(`/api/post/downvote/${postId}`, {
    method: "POST",
  });

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

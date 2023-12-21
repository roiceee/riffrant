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
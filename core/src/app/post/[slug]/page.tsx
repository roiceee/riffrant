"use client";
import Comments from "@/components/comments/comments";
import PostPageControlWrapper from "@/components/posts/post-page-control-wrapper";
import LoadingDiv from "@/components/util/loading";
import { GlobalAlertContext } from "@/context/global-alert";
import {
  deletePostComment,
  getComments,
  getSinglePost,
} from "@/lib/actions-client";
import { timeFormatter } from "@/lib/util";
import Post from "@/types/post";
import { useCallback, useContext, useState } from "react";
import { useInfiniteQuery, useMutation, useQuery } from "react-query";

function PostPage({ params }: { params: { slug: string } }) {
  const [commentIdToDelete, setCommentIdToDelete] = useState("");
  const { showAlert } = useContext(GlobalAlertContext);

  const deleteCommentAttemptHandler = useCallback((id: string) => {
    showModal();
    setCommentIdToDelete(id);
  }, []);

  const {
    data,
    isLoading,
    isError,
    refetch: refetchPage,
  } = useQuery({
    queryKey: ["post-page", params],
    queryFn: () => getSinglePost({ params }),
    cacheTime: 0,
  });

  const deleteMutation = useMutation({
    mutationKey: "delete-comment",
    mutationFn: (commentId: string) => {
      return deletePostComment(commentId);
    },
    onSuccess: () => {
      refetchPage();
      refetchComments();
      showAlert("Comment deleted!");
    },
    onError: () => {
      showAlert("Error deleting comment.");
    },
    onSettled: () => {
      closeModal();
    },
  });

  const {
    data: commentData,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch: refetchComments,
  } = useInfiniteQuery({
    queryKey: ["infinite-comments"],
    queryFn: ({ pageParam = 0 }) => getComments({ pageParam }, params.slug),
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    refetchOnMount: "always",
  });

  const handleDeleteComment = () => {
    deleteMutation.mutate(commentIdToDelete);
  };

  const showModal = () => {
    const elem: any = document.getElementById("delete-comment-modal");
    elem.showModal();
  };

  const closeModal = () => {
    const elem: any = document.getElementById("delete-comment-modal");
    elem.close();
  };

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
    <>
      <section className="rounded-lg p-4 md:p-8 shadow-lg bg-base-100 break-words">
        <div className="prose">
          <div>
            <div className="font-semibold opacity-80 text-xs">
              Posted by: {post.creatorName} • {timeFormatter(post.createdAt!)}
            </div>
          </div>
          <h3 className="mb-0 mt-2 break-words">{post.title}</h3>
          <p className="mb-16">{post.body}</p>
        </div>
        <PostPageControlWrapper
          post={post}
          onAddComment={() => {
            refetchPage();
            refetchComments();
          }}
        />
        <div className="mt-2">
          <Comments
            data={commentData}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            status={status}
            isFetchingNextPage={isFetchingNextPage}
            onDeleteAttempt={deleteCommentAttemptHandler}
          />
        </div>
      </section>

      <dialog id="delete-comment-modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Delete Comment</h3>
          <p className="py-2">Are you sure you want to delete your comment?</p>

          <div className="modal-action">
            <button
              className="btn btn-error btn-sm"
              onClick={handleDeleteComment}
            >
              Delete
            </button>
            <button className="btn btn-sm" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default PostPage;

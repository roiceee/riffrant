"use client";

import Post from "@/types/post";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useContext, useEffect, useState } from "react";
import LoadingDiv from "../util/loading";
import { GlobalAlertContext } from "@/context/global-alert";
import DownvoteButton from "../util/downvote-button";
import UpvoteButton from "../util/upvote-button";
import { deleteUserPost, downvotePost, upvotePost } from "@/lib/actions-client";
import Link from "next/link";
import PostControlContainer from "../containers/post-control-container";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "react-query";
import CommentButton from "../comments/comment-button";
import EditButton from "./edit-button";
import DeleteButton from "./delete-button";
import CommentTextarea from "../comments/comment-textarea";
import path from "path";
import KebabButton from "./kebab-button";
import AddComment from "../comments/add-comment";

interface Props {
  post: Post;
  onDelete: () => void;
  onAddComment?: () => void;
}

function PostControl({ post, onDelete, onAddComment }: Props) {
  const user = useUser();

  const router = useRouter();

  const pathname = usePathname();

  const { showAlert } = useContext(GlobalAlertContext);

  const [isDeleting, setIsDeleting] = useState(false);

  const [postState, setPostState] = useState(post);

  //i want to render upvote and downvote in advance so that the user can see the change in score immediately

  const toggleUpvoteState = () => {
    if (postState.downvotes!.includes(user.user!.sub!)) {
      setPostState({
        ...postState,
        downvotes: postState.downvotes!.filter(
          (downvote) => downvote !== user.user!.sub!
        ),
        score: postState.score! + 1,
      });
    }

    if (postState.upvotes!.includes(user.user!.sub!)) {
      setPostState({
        ...postState,
        upvotes: postState.upvotes!.filter(
          (upvote) => upvote !== user.user!.sub!
        ),
        score: postState.score! - 1,
      });
    } else {
      setPostState({
        ...postState,
        upvotes: [...postState.upvotes!, user.user!.sub!],
        score: postState.score! + 1,
      });
    }
  };

  const toggleDownvoteState = () => {
    if (postState.upvotes!.includes(user.user!.sub!)) {
      setPostState({
        ...postState,
        upvotes: postState.upvotes!.filter(
          (upvote) => upvote !== user.user!.sub!
        ),
        score: postState.score! - 1,
      });
    }

    if (postState.downvotes!.includes(user.user!.sub!)) {
      setPostState({
        ...postState,
        downvotes: postState.downvotes!.filter(
          (downvote) => downvote !== user.user!.sub!
        ),
        score: postState.score! + 1,
      });
    } else {
      setPostState({
        ...postState,
        downvotes: [...postState.downvotes!, user.user!.sub!],
        score: postState.score! - 1,
      });
    }
  };

  const handleUpvote = async () => {
    toggleUpvoteState();

    try {
      const data = await upvotePost(post._id!);
      if (data) {
        setPostState(data);
        return;
      }

      showAlert("Error Upvoting Post");
    } catch (error: any) {
      showAlert(error.message);
    }
  };

  const handleDownvote = async () => {
    toggleDownvoteState();

    try {
      const data = await downvotePost(post._id!);
      if (data) {
        setPostState(data);
        return;
      }
      showAlert("Error Downvoting Post");
    } catch (error: any) {
      showAlert(error.message);
    }
  };

  const handleDelete = async () => {
    const data = await deleteUserPost(post._id!);

    if (data) {
      onDelete();
      showAlert("Post Deleted");
      return;
    }
    showAlert("Error Deleting Post");
  };

  useEffect(() => {
    setPostState(post);
  }, [post]);

  if (user.isLoading) {
    return <LoadingDiv />;
  }

  if (!user.user) {
    return (
      <div>
        <p className="text-xs text-center mt-8 opacity-70">
          <a href="/api/auth/login">
            <button className="btn btn-sm btn-outline">Login</button>
          </a>{" "}
          to vote or comment.
        </p>
      </div>
    );
  }

  return (
    <PostControlContainer>
      {!isDeleting && (
        <div className="flex items-center gap-4">
          <div className="border border-base-200 flex items-center p-1 rounded-lg gap-2">
            <UpvoteButton
              onClick={handleUpvote}
              active={postState.upvotes!.includes(user.user.sub!)}
            />
            <span className=" text-sm">
              <b>{postState.score}</b>
            </span>
            <DownvoteButton
              onClick={handleDownvote}
              active={postState.downvotes!.includes(user.user.sub!)}
            />
          </div>
          <CommentButton comments={post.comments} />
          {user.user.sub === post.creatorId && (
            <div className="dropdown">
              <KebabButton />
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-fit border"
              >
                <li>
                  <EditButton
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      router.push(`/post/${post._id}/edit`);
                    }}
                  />
                </li>
                <li>
                  <DeleteButton
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsDeleting(true);
                    }}
                  />
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
      {isDeleting && (
        <div className="flex items-center justify-end gap-4 text-xs">
          <span>
            <b>Delete post?</b>{" "}
          </span>
          <button
            className="btn btn-sm text-xs"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDeleting(false);
            }}
          >
            Cancel
          </button>
          <button
            className="btn btn-sm btn-outline btn-error text-xs"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDelete();
            }}
          >
            Confirm
          </button>
        </div>
      )}
      {user && pathname.includes("/post") && (
        <AddComment postId={post._id!} onAddComment={onAddComment} />
      )}
    </PostControlContainer>
  );
}

export default PostControl;

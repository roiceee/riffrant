"use client";
import DownvoteButton from "@/app/assets/downvote-icon";
import UpvoteIcon from "@/app/assets/upvote-icon";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

interface ViewPostModalProps {
  title: string;
  body: string;
  upvotes: number;
  displayName: string;
  createdAt: string;
}

function ViewPostModal({
  title,
  body,
  upvotes,
  displayName,
  createdAt,
}: ViewPostModalProps) {
  const auth = useAuth0();

  const [isDeleting, setIsDeleting] = useState(false);

  const deletePost = () => {
    setIsDeleting(true);
  };

  const cancelDelete = () => {
    setIsDeleting(false);
  };

  const isOwner = true;

  return (
    <>
      <dialog id="modal-post-view" className="modal prose">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="modal-header">
            <div className="font-semibold opacity-80 text-xs">
              Posted by: {displayName}
            </div>
            <h3 className="mb-0 mt-2">{title}</h3>

            <div className="font-semibold opacity-80 text-xs">{createdAt}</div>
          </div>
          <p className="modal-body mt-12 mb-8">{body}</p>
          <div className="modal-footer flex justify-between">
            {!isDeleting && (
              <div className="flex items-center justify-start gap-2">
                <button className="btn btn-outline btn-success btn-sm">
                  <UpvoteIcon />
                </button>
                <span className=" text-lg">
                  <b>{upvotes}</b>
                </span>
                <button className="btn btn-outline btn-error btn-sm">
                  <DownvoteButton />
                </button>
              </div>
            )}
            {isOwner && !isDeleting && (
              <div>
                <button
                  className="btn btn-outline btn-error btn-sm"
                  onClick={deletePost}
                >
                  Delete
                </button>
              </div>
            )}
            {isDeleting && (
              <div className="flex items-center justify-end gap-2 w-full">
                <div>Delete post?</div>
                <button className="btn btn-outline btn-error btn-sm">
                  Confirm
                </button>
                <button
                  className="btn btn-outline btn-primary btn-sm"
                  onClick={cancelDelete}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </>
  );
}

export default ViewPostModal;

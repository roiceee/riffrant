"use client";
import { addPost } from "@/lib/actions-client";
import { isBodyLengthMax, isTitleLengthMax } from "@/lib/util";
import Post from "@/types/post";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

interface PostButtonProps {
  onPost: () => void;
}

function PostButton({ onPost }: PostButtonProps) {
  const user = useUser();

  const [postContent, setPostContent] = useState<Post>({
    title: "",
    body: "",
  });

  const resetPostContent = () => {
    setPostContent({ title: "", body: "" });
  };

  const { status, data, refetch } = useQuery({
    queryKey: ["posts", postContent.title, postContent.body],
    queryFn: () => addPost(postContent),
    enabled: false,
  });

  const handlePost = () => {
    if (postContent.title?.trim() === "") {
      return;
    }
    refetch();
  };

  const titleChange = (e: any) => {
    if (isTitleLengthMax(e.target.value)) {
      return;
    }
    setPostContent({ ...postContent, title: e.target.value });
  };

  const bodyChange = (e: any) => {
    if (isBodyLengthMax(e.target.value)) {
      return;
    }
    setPostContent({ ...postContent, body: e.target.value });
  };

  const clearBody = () => {
    setPostContent({ ...postContent, body: "" });
  };

  const closeModal = () => {
    const modal: any = document.getElementById("modal-post");
    modal.close();
  };

  const openModal = () => {
    const modal: any = document.getElementById("modal-post");
    modal.showModal();
  };

  useEffect(() => {
    if (status === "success") {
      closeModal();
      resetPostContent();
      onPost();
    }
  }, [status, onPost]);

  return (
    <div className="w-full">
      <button
        className="p-3 rounded-badge overflow-hidden overflow-ellipsis text-left font-semibold text-sm sm:text-md w-full bg-base-200 hover:bg-base-100 border border-base-100"
        onClick={openModal}
        contentEditable={false}
      >
        What&apos;s on your mind, {user.user?.name?.split(" ")[0]}?
      </button>
      <dialog id="modal-post" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">What&apos;s on your mind?</h3>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Title</span>
              <span className="label-text">
                {postContent.title ? postContent.title.length : 0}/40
              </span>
            </div>
            <input
              type="text"
              placeholder="Enter Title"
              className="input input-bordered w-full"
              onChange={titleChange}
              value={postContent.title}
              required
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Body</span>
              <span className="label-text">
                {postContent.body ? postContent.body.length : 0}/500
              </span>
            </div>
            <textarea
              placeholder="Enter Body"
              className="textarea textarea-bordered textarea-sm w-full"
              style={{ minHeight: "200px" }}
              onChange={bodyChange}
              value={postContent.body}
              required
            />
          </label>
          <div className="modal-action">
            <div className="flex w-full justify-between">
              <div>
                <button className="btn btn-sm" onClick={clearBody}>
                  Clear Body
                </button>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-accent btn-sm" onClick={handlePost}>
                  Post
                </button>
                <button className="btn btn-sm" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default PostButton;

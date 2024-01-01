"use client";
import { GlobalAlertContext } from "@/context/global-alert";
import { addPost } from "@/lib/actions-client";
import { isBodyLengthMax, isTitleLengthMax } from "@/lib/util";
import Post from "@/types/post";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

function PostButton() {
  const user = useUser();
  const { showAlert } = useContext(GlobalAlertContext);
  const router = useRouter();

  const [postContent, setPostContent] = useState<Post>({
    title: "",
    body: "",
  });

  const resetPostContent = () => {
    setPostContent({ title: "", body: "" });
  };

  const mutation = useMutation({
    mutationFn: (post: Post) => {
      return addPost(post);
    },
    onSuccess: (data) => {
      closeModal();
      resetPostContent();
      showAlert("Post Created!");
      router.push(`/post/${data.post._id}`);
    },
    onError: (error: Error) => {
      showAlert(error.message);
      closeModal();
    },
  });

  const handlePost = () => {
    if (postContent.title?.trim() === "") {
      return;
    }
    mutation.mutate(postContent);
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

  return (
    <div className="w-full">
      <button
        className="p-3 rounded-badge overflow-hidden overflow-ellipsis text-left font-semibold text-sm sm:text-md w-full bg-base-200 hover:bg-base-300 border-2 border-base-100"
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

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePost();
            }}
          >
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Title</span>
                <span className="label-text">
                  {postContent.title ? postContent.title.length : 0}/40
                </span>
              </div>
              <input
                type="text"
                placeholder="Enter Title (Required)"
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
                  <button
                    className="btn btn-sm"
                    onClick={clearBody}
                    type="button"
                  >
                    Clear Body
                  </button>
                </div>
                <div className="flex gap-2">
                  <button className="btn btn-accent btn-sm" type="submit">
                    Post
                  </button>
                  <button
                    className="btn btn-sm"
                    onClick={closeModal}
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default PostButton;

"use client";
import { useAuth0 } from "@auth0/auth0-react";
import Image from "next/image";
import placeholder from "/public/user-placeholder.jpg";
import { useState } from "react";
import ViewPostModal from "@/components/posts/view-post-modal";
import PostCard from "@/components/containers/post-card";
import PostCardContainer from "@/components/containers/post-card-containers";

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const auth = useAuth0();

  const [chosenPost, setChosenPost] = useState<{
    title: string;
    body: string;
    upvotes: number;
    displayName: string;
    createdAt: string;
  } | null>(null);

  const setChosenPostAndOpenModal = (
    title: string,
    body: string,
    upvotes: number,
    displayName: string,
    createdAt: string
  ) => {
    setChosenPost({ title, body, upvotes, displayName, createdAt });
    onPostClick();
  };

  const onPostClick = () => {
    const modal: any = document.getElementById("modal-post-view");
    if (modal) {
      modal.showModal();
    }
  };

  const editName = () => {
    setIsEditing(true);
  };

  const saveName = () => {
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const showModal = () => {
    const elem: any = document.getElementById("modal-delete")!;
    elem.showModal();
  };

  const closeModal = () => {
    const elem: any = document.getElementById("modal-delete")!;
    elem.close();
  };

  if (!auth.isAuthenticated) {
    return (
      <div className=" absolute start-1/2 bottom-1/2 -translate-x-1/2 -translate-y-1/2 prose">
        <h2>
          Please{" "}
          <button className="btn" onClick={() => auth.loginWithRedirect()}>
            Login
          </button>{" "}
          to configure profile.
        </h2>
      </div>
    );
  }

  return (
    <main className="prose mx-auto">
      <section>
        <h3>Profile</h3>
        <div className="sm:flex gap-14">
          <div className="">
            <Image
              src={auth.user!.picture ? auth.user!.picture : placeholder}
              alt="profile"
              height={70}
              width={70}
              className=" rounded-full my-0 border"
            />
          </div>
          <div>
            <div className="mb-3">
              {!isEditing && (
                <div className="flex items-center justify-between">
                  <h5>
                    <b>placeholderusername</b>
                  </h5>
                  <button className="btn btn-sm" onClick={editName}>
                    Edit
                  </button>
                </div>
              )}
              {isEditing && (
                <div className="flex gap-1">
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="placeholderusername"
                  />
                  <div className="flex flex-row flex-nowrap items-center justify-between gap-1">
                    <button
                      className="btn btn-sm btn-outline btn-success"
                      onClick={saveName}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </button>
                    <button
                      className="btn btn-sm btn-outline btn-error"
                      onClick={cancelEdit}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div>
              <b>Email: </b> {auth.user?.email}
            </div>
            <div>
              <b>Posts: </b>0
            </div>
            <div>
              <b>Upvotes: </b>0
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="flex items-center justify-between">
          <h3 className="my-0">Posts</h3>
          <button
            onClick={showModal}
            className="btn btn-outline btn-error btn-sm"
          >
            Delete all posts
          </button>
        </div>
        <hr className="my-6" />

        <div>
          <PostCardContainer>
            <PostCard
              title="TITLE GOES HERE"
              displayName="placeholderName"
              createdAt="Just now"
              body="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem veritatis nostrum, officia numquam aut mollitia in voluptates neque  reprehenderit nobis quia aliquid temporibus consectetur maxime odit vel sint atque ipsum"
              upvotes={0}
              onClick={() =>
                setChosenPostAndOpenModal(
                  "TITLE GOES HERE",
                  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem veritatis nostrum, officia numquam aut mollitia in voluptates neque  reprehenderit nobis quia aliquid temporibus consectetur maxime odit vel sint atque ipsum",
                  0,
                  "placeholderName",
                  "Just now"
                )
              }
            />
          </PostCardContainer>
        </div>
      </section>

      <dialog id="modal-delete" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Delete All Posts</h3>
          <p className="py-4">
            Are you sure you want to delete all your posts?
          </p>
          <div className="modal-action">
            <button className="btn btn-error">Delete</button>
            <button className="btn" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </dialog>

      <div>
        <ViewPostModal
          title={chosenPost?.title!}
          body={chosenPost?.body!}
          upvotes={chosenPost?.upvotes!}
          displayName={chosenPost?.displayName!}
          createdAt={chosenPost?.createdAt!}
        />
      </div>
    </main>
  );
}

export default ProfilePage;

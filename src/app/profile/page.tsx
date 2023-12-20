"use client";
import Image from "next/image";
import placeholder from "/public/user-placeholder.jpg";
import { useState } from "react";
import ViewPostModal from "@/components/posts/view-post-modal";
import PostCard from "@/components/containers/post-card";
import PostCardContainer from "@/components/containers/post-card-container";
import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

function ProfilePage() {
  const { user } = useUser();

  const onPostClick = () => {
    const modal: any = document.getElementById("modal-post-view");
    if (modal) {
      modal.showModal();
    }
  };

  const showModal = () => {
    const elem: any = document.getElementById("modal-delete")!;
    elem.showModal();
  };

  const closeModal = () => {
    const elem: any = document.getElementById("modal-delete")!;
    elem.close();
  };

  if (!user) {
    return (
      <div className=" absolute start-1/2 bottom-1/2 -translate-x-1/2 -translate-y-1/2 prose">
        <h2>
          Please{" "}
          <Link href={"api/auth/login"}>
            <button className="btn">Login</button>
          </Link>{" "}
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
              src={user.picture ? user.picture : placeholder}
              alt="profile"
              height={70}
              width={70}
              className=" rounded-full my-0 border"
            />
          </div>
          <div className="w-full">
            <div className="mb-3">
              <div className="flex items-center justify-between">
                <h5>
                  <b>{user.name}</b>
                </h5>
              </div>
            </div>
            <div>
              <b>Email: </b> {user.email}
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
          {/* <PostCardContainer>
           
          </PostCardContainer> */}
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
    </main>
  );
}

export default ProfilePage;

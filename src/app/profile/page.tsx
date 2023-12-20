"use client";
import PostCardContainer from "@/components/containers/post-card-container";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";
import placeholder from "/public/user-placeholder.jpg";
import { useInfiniteQuery } from "react-query";
import LoadingDiv from "@/components/util/loading";
import ErrorDiv from "@/components/util/error-div";
import React from "react";
import Post from "@/types/post";
import PostCard from "@/components/containers/post-card";
import ScrollButton from "@/components/posts/scroll-button";

function ProfilePage() {
  const { user } = useUser();

  const getPosts = async ({ pageParam = 0 }) => {
    const res = await fetch(`/api/posts?id=${user?.sub}&cursor=${pageParam}`, {
      method: "GET",
    });

    const data = await res.json();
    return data;
  };

  const showModal = () => {
    const elem: any = document.getElementById("modal-delete")!;
    elem.showModal();
  };

  const closeModal = () => {
    const elem: any = document.getElementById("modal-delete")!;
    elem.close();
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    enabled: !!user,
  });

  const renderPosts = () => {
    if (status === "loading") {
      return <LoadingDiv />;
    }

    if (status === "error") {
      return <ErrorDiv />;
    }

    if (status === "success") {
      return data.pages.map((group, i) => {
        return (
          <React.Fragment key={i}>
            {group.data.map((post: Post) => {
              return (
                <PostCard
                  key={`post-${post._id}`}
                  post={post}
                  onDelete={refetch}
                />
              );
            })}
          </React.Fragment>
        );
      });
    }
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
            className="btn btn-outline btn-error btn-sm"
            onClick={showModal}
          >
            Delete all posts
          </button>
        </div>
        <hr className="my-6" />

        <div>
          <PostCardContainer>
            {user && renderPosts()}
          </PostCardContainer>
        </div>

        <section>
          {status !== "loading" && status !== "error" && (
            <div className="mt-4">
              <div className="text-center">
                <ScrollButton
                  onClick={() => {
                    if (!hasNextPage || isFetchingNextPage) {
                      return;
                    }
                    fetchNextPage();
                  }}
                  disabled
                >
                  {isFetchingNextPage ? (
                    <LoadingDiv />
                  ) : (
                    "Oops! You've reached the end."
                  )}
                </ScrollButton>
              </div>
            </div>
          )}
        </section>
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

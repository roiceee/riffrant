"use client";
import PostCard from "@/components/containers/post-card";
import PostCardContainer from "@/components/containers/post-card-container";
import ScrollButton from "@/components/posts/scroll-button";
import ErrorDiv from "@/components/util/error-div";
import LoadingDiv from "@/components/util/loading";
import Post from "@/types/post";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import placeholder from "/public/user-placeholder.jpg";
import {
  deleteAllPosts,
  getPostsMetadata,
  getUserPosts,
} from "@/lib/actions-client";
import { useRouter } from "next/navigation";
import PostButton from "@/components/posts/post-button";
import NormalContainer from "@/components/containers/normal-container";

function ProfilePage() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [deleteCount, setDeleteCount] = React.useState(3);

  const deleteHandler = async () => {
    if (deleteCount > 1) {
      setDeleteCount(deleteCount - 1);
      setTimeout(() => {
        setDeleteCount(3);
      }, 3000);
      return;
    }

    await deleteAllPosts();
    closeModal();
    refetch();
    setDeleteCount(3);
  };

  const showModal = () => {
    const elem: any = document.getElementById("modal-delete")!;
    elem.showModal();
  };

  const closeModal = () => {
    const elem: any = document.getElementById("modal-delete")!;
    elem.close();
  };

  const metadataQuery = useQuery({
    queryKey: ["metadata"],
    queryFn: getPostsMetadata,
  });

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
    queryFn: ({ pageParam }) =>
      getUserPosts({ pageParam }, "recent", user?.sub!),
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

  if (isLoading) {
    return (
      <div className=" absolute start-1/2 bottom-1/2 -translate-x-1/2 -translate-y-1/2 prose">
        <LoadingDiv />
      </div>
    );
  }

  if (!user) {
    router.replace("/api/auth/login");
    return <></>;
  }

  return (
    <main className="prose mx-auto">
      <NormalContainer>
        <h3 className="mt-0">Profile</h3>
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
            {metadataQuery.isError && (
              <div className="text-red-500">Error fetching data</div>
            )}
            {!metadataQuery.isError && (
              <>
                <div>
                  <b>Posts: </b>
                  {metadataQuery.isLoading
                    ? "---"
                    : metadataQuery.data.metadata[0].totalPosts}
                </div>
                <div>
                  <b>Riff Score: </b>
                  {metadataQuery.isLoading
                    ? "---"
                    : metadataQuery.data.metadata[0].totalScore}
                </div>
              </>
            )}
          </div>
        </div>

        <div>
          <hr className="my-4" />
          <PostButton onPost={refetch} />
        </div>
      </NormalContainer>

      <div className="flex items-center justify-between px-4 mt-4">
        <h3 className="my-2">Posts</h3>
        <button
          className="btn btn-outline btn-error btn-sm"
          onClick={showModal}
        >
          Delete all posts
        </button>
      </div>
      
      <div>
        <PostCardContainer>{user && renderPosts()}</PostCardContainer>
      </div>

      <section>
        {status !== "loading" && status !== "error" && (
          <div>
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
      <dialog id="modal-delete" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Delete All Posts</h3>
          <p className="py-2">
            Are you sure you want to delete all your posts?
          </p>
          <div className="text-xs font-bold">Note: Press delete 3 times.</div>
          <div className="modal-action">
            <button className="btn btn-error btn-sm" onClick={deleteHandler}>
              Delete ({deleteCount})
            </button>
            <button className="btn btn-sm" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </main>
  );
}

export default ProfilePage;

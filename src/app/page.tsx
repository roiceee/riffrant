"use client";
import NormalContainer from "@/components/containers/normal-container";
import PostCard from "@/components/containers/post-card";
import PostCardContainer from "@/components/containers/post-card-containers";
import PostButton from "@/components/posts/post-button";
import ViewPostModal from "@/components/posts/view-post-modal";
import { useUser } from "@auth0/nextjs-auth0/client";
import _ from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ArrowDown from "./assets/arrow-down";
import FilterIcon from "./assets/filter";
import placeholder from "/public/user-placeholder.jpg";
import { useQuery } from "react-query";
import Post from "@/types/post";

export default function Home() {
  const { user } = useUser();

  const getPosts = async () => {
    const res = await fetch("/api/posts", {
      method: "GET",
    });

    const data = await res.json();

    return data;
  };

  const { status, data, refetch } = useQuery({
    queryKey: ["get-posts"],
    queryFn: getPosts,
  });

  const [filter, setFilter] = useState<"recent" | "popular">("recent");

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

  const changeFilter = (filter: "recent" | "popular") => {
    setFilter(filter);
    const elem: any = document.activeElement;
    if (elem) {
      elem.blur();
    }
  };

  const renderPosts = () => {
    if (status === "loading") {
      return <p>Loading...</p>;
    }

    if (status === "error") {
      return <p>Error!</p>;
    }

    if (status === "success") {
      return data.map((post: Post) => {
        return <PostCard key={`post-${post._id}`} post={post} />;
      });
    }
  };

  return (
    <main className="">
      <NormalContainer>
        {!user && (
          <b>
            <a href={"api/auth/login"}>
              <button className="btn btn-primary">Login</button>
            </a>{" "}
            to share your thoughts!
          </b>
        )}
        {user && (
          <div className="flex gap-1">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-12 rounded-full">
                <Link href={"/profile"}>
                  <Image
                    alt="profile"
                    src={user.picture ? user.picture : placeholder}
                    width={70}
                    height={70}
                  />
                </Link>
              </div>
            </div>
            <PostButton />
          </div>
        )}
      </NormalContainer>

      <section className="mt-4">
        <div className="ml-2 flex items-center justify-between my-1">
          <div className="flex items-center">
            <FilterIcon />
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-sm btn-ghost mx-1"
              >
                {_.capitalize(filter)}
                <ArrowDown />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52"
              >
                <li onClick={() => changeFilter("recent")}>
                  <a>Recent</a>
                </li>
                <li onClick={() => changeFilter("popular")}>
                  <a>Popular</a>
                </li>
              </ul>
            </div>
          </div>
          <button className="btn btn-sm" onClick={() => refetch()}>Refresh</button>
        </div>
        <hr />
      </section>
      <PostCardContainer>{renderPosts()}</PostCardContainer>
      <ViewPostModal
        title={chosenPost?.title!}
        body={chosenPost?.body!}
        upvotes={chosenPost?.upvotes!}
        displayName={chosenPost?.displayName!}
        createdAt={chosenPost?.createdAt!}
      />
    </main>
  );
}

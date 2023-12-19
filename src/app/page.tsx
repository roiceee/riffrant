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
import ArrowDown from "../assets/arrow-down";
import FilterIcon from "../assets/filter";
import placeholder from "/public/user-placeholder.jpg";
import { useInfiniteQuery, useQuery } from "react-query";
import Post from "@/types/post";
import Refresh from "@/assets/refresh";
import React from "react";
import ScrollButton from "@/components/posts/scroll-button";
import ErrorDiv from "@/components/util/error-div";
import LoadingDiv from "@/components/util/loading";
import SortDiv from "@/components/posts/sort-div";

export default function Home() {
  const { user } = useUser();

  const getPosts = async ({ pageParam = 0 }) => {
    const res = await fetch("/api/posts?cursor=" + pageParam, {
      method: "GET",
    });

    const data = await res.json();
    return data;
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
    queryKey: ["projects"],
    queryFn: getPosts,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  const [filter, setFilter] = useState<"recent" | "popular">("recent");

  const changeFilter = (filter: "recent" | "popular") => {
    setFilter(filter);
    const elem: any = document.activeElement;
    if (elem) {
      elem.blur();
    }
  };

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
              return <PostCard key={`post-${post._id}`} post={post} />;
            })}
          </React.Fragment>
        );
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
        <SortDiv
          filter={filter}
          changeFilter={changeFilter}
          refetch={() => refetch({ refetchPage: (page, index) => index === 0 })}
        />
        <hr />
      </section>

      <PostCardContainer>{renderPosts()}</PostCardContainer>

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
    </main>
  );
}
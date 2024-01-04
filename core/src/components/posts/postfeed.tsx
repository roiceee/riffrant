import { getPosts } from "@/lib/actions-client";
import Post from "@/types/post";
import React, { useCallback, useMemo, useState } from "react";
import { useInfiniteQuery } from "react-query";
import PostCard from "../containers/post-card";
import PostCardContainer from "../containers/post-card-container";
import ErrorDiv from "../util/error-div";
import InfiniteScrollTrigger from "../util/infinite-scroll-trigger";
import LoadingDiv from "../util/loading";
import SortDiv from "./sort-div";
import PostFilters from "@/types/post-filters";

interface Props {
  filter: PostFilters;
  changeFilter: (filter: PostFilters) => void;
  refetch: () => void;
  status: string;
  data: any;
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
}

export default function PostFeed({
  filter,
  changeFilter,
  refetch,
  status,
  data,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}: Props) {


  const renderPosts = useMemo(() => {
    if (status === "loading") {
      return <LoadingDiv />;
    }

    if (status === "error") {
      return <ErrorDiv />;
    }

    if (status === "success") {
      return data.pages.map((group: any, i: any) => {
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
  }, [data, refetch, status]);

  return (
    <section>
      <div className="mt-4">
        <SortDiv
          filter={filter}
          changeFilter={changeFilter}
          refetch={refetch}
        />
        <hr />
      </div>

      <PostCardContainer>{renderPosts}</PostCardContainer>

      <InfiniteScrollTrigger
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        status={status}
      />
    </section>
  );
}

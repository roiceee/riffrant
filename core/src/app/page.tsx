"use client";
import NormalContainer from "@/components/containers/normal-container";
import PostButton from "@/components/posts/post-button";
import PostFeed from "@/components/posts/postfeed";
import LoadingDiv from "@/components/util/loading";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";
import placeholder from "/public/user-placeholder.jpg";
import { useCallback, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { getPosts } from "@/lib/actions-client";
import PostFilters from "@/types/post-filters";

export default function Home() {
  const { user, isLoading } = useUser();

  const [filter, setFilter] = useState<PostFilters>("recent");

  const changeFilter = useCallback((filter: PostFilters) => {
    setFilter(filter);
    const elem: any = document.activeElement;
    if (elem) {
      elem.blur();
    }
  }, []);

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
    queryKey: ["infinite-posts", filter],
    queryFn: ({ pageParam = 0 }) => getPosts({ pageParam }, filter),
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    refetchOnMount: "always",
  });

  return (
    <main className="">
      <NormalContainer>
        {!user && !isLoading && (
          <b>
            <a href={"api/auth/login"}>
              <button className="btn btn-primary">Login</button>
            </a>{" "}
            to share your thoughts!
          </b>
        )}
        {isLoading && <LoadingDiv />}
        {user && (
          <div className="flex gap-1">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <Link href={"/profile"}>
                  <Image
                    alt="profile"
                    src={user.picture ? user.picture : placeholder}
                    width={60}
                    height={60}
                  />
                </Link>
              </div>
            </div>
            <PostButton />
          </div>
        )}
      </NormalContainer>

      <PostFeed
        filter={filter}
        changeFilter={changeFilter}
        refetch={refetch}
        status={status}
        data={data}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </main>
  );
}

import Comment from "@/types/comment";
import React, { useMemo } from "react";
import ErrorDiv from "../util/error-div";
import InfiniteScrollTrigger from "../util/infinite-scroll-trigger";
import LoadingDiv from "../util/loading";
import CommentCard from "./comment-card";

interface Props {
  status: string;
  data: any;
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
  onDeleteAttempt: (id: string) => void;
}

export default function PostFeed({
  status,
  data,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  onDeleteAttempt,
}: Props) {
  const renderComments = useMemo(() => {
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
            {group.data.map((comment: Comment) => {
              return (
                <CommentCard
                  key={`comment-${comment._id}`}
                  comment={comment}
                  onDeleteAttempt={onDeleteAttempt}
                />
              );
            })}
          </React.Fragment>
        );
      });
    }
  }, [data, status, onDeleteAttempt]);

  return (
    <section>
      <div>
        <h5 className="my-0">Comments</h5>
        <hr className="my-2" />
      </div>

      <div className=" flex flex-col">{renderComments}</div>

      <InfiniteScrollTrigger
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        status={status}
      />
    </section>
  );
}

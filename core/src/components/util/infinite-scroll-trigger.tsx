import ScrollButton from "../posts/scroll-button";
import LoadingDiv from "./loading";

interface Props {
    isFetchingNextPage: boolean;
    hasNextPage: boolean | undefined;
    fetchNextPage: () => void;
    status: string;
}

export default function InfiniteScrollTrigger({ isFetchingNextPage, hasNextPage, fetchNextPage, status }: Props) {
  return (
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
  );
}

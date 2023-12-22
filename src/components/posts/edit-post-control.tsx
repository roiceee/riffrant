import Link from "next/link";
import PostControlContainer from "../containers/post-control-container";
import Post from "@/types/post";

interface Props {
  postId: string;
  onSubmit: () => void;
  onClear: () => void;
  isLoading: boolean;
}

export default function EditPostControl({
  postId,
  onClear,
  onSubmit,
  isLoading,
}: Props) {
  return (
    <PostControlContainer>
      {isLoading && (
        <div className="text-center">
          <div className="spinner"></div>
        </div>
      )}
      {!isLoading && (
        <div className="flex justify-between">
          <button className="btn btn-sm" onClick={onClear}>
            Clear
          </button>
          <div className="flex gap-2">
            <button className="btn btn-accent btn-sm" onClick={onSubmit}>
              Save
            </button>
            <Link href={`/post/${postId}`}>
              <button className="btn btn-sm">Cancel</button>
            </Link>
          </div>
        </div>
      )}
    </PostControlContainer>
  );
}

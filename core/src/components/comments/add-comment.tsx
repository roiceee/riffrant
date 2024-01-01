import { GlobalAlertContext } from "@/context/global-alert";
import { addPostComment } from "@/lib/actions-client";
import { useRef, useContext, useState, useCallback, useEffect } from "react";
import { useQueryClient, useMutation } from "react-query";
import CommentTextarea from "./comment-textarea";

interface Props {
  postId: string;
  onAddComment?: () => void;
}
export default function AddComment({ postId, onAddComment }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const { showAlert } = useContext(GlobalAlertContext);

  const [value, setValue] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const mutation = useMutation({
    mutationFn: ({ postId, value }: { postId: string; value: string }) => {
      return addPostComment(postId, value);
    },
    onSuccess: () => {
      setValue("");
      showAlert("Comment added!");
      if (onAddComment) {
        onAddComment();
      }
    },
    onError: () => {
      showAlert("Something went wrong.");
    },
  });

  const onSubmit = () => {
    if (value.trim() === "") {
      return;
    }
    mutation.mutate({ postId, value });
  };

  const autoResize = useCallback(() => {
    if (!ref.current) {
      return;
    }
    ref.current.style.height = "auto"; // Reset height to auto
    ref.current.style.height = ref.current.scrollHeight + "px"; // Set the height to the scrollHeight
  }, []);

  useEffect(() => {
    autoResize();
  }, [ref, autoResize]);

  return (
    <div className="mt-8 text-sm w-full">
      <h6 className="mb-2">Comment</h6>
      <CommentTextarea onChange={onChange} value={value} />
      <div className="text-right">
        <button
          className="btn btn-outline btn-primary btn-sm mt-2"
          onClick={onSubmit}
        >
          {mutation.isLoading ? "Commenting..." : "Comment"}
        </button>
      </div>
    </div>
  );
}

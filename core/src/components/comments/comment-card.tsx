import { timeFormatter } from "@/lib/util";
import Comment from "@/types/comment";
import EditButton from "../posts/edit-button";
import KebabButton from "../posts/kebab-button";
import DeleteButton from "../posts/delete-button";
import { useCallback, useContext, useEffect, useState } from "react";
import CommentTextarea from "./comment-textarea";
import { useMutation } from "react-query";
import { editPostComment } from "@/lib/actions-client";
import { GlobalAlertContext } from "@/context/global-alert";

interface Props {
  comment: Comment;
  onDeleteAttempt: (id: string) => void;
}

export default function CommentCard({ comment, onDeleteAttempt }: Props) {
  const [commentState, setCommentState] = useState<Comment>(comment);
  const [isEditing, setIsEditing] = useState(false);

  const { showAlert } = useContext(GlobalAlertContext);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCommentState({
        ...commentState,
        body: e.target.value,
      });
    },
    [commentState]
  );

  const editMutation = useMutation({
    mutationKey: ["edit-comment", commentState.body],
    mutationFn: (comment: Comment) => {
      return editPostComment(comment);
    },
    onSuccess: (data) => {
      showAlert("Comment successfully updated!");
      comment.body = data.comment.body;
    },
    onError: () => {
      showAlert("Error updating comment.");
    },
    onSettled: () => {
      toggleEdit();
    },
  });

  const handleEdit = () => {
    if (commentState.body === comment.body) {
      toggleEdit();
      return;
    }
    editMutation.mutate(commentState);
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
    setCommentState(comment);
  };

  useEffect(() => {
    setCommentState(comment);
  }, [comment]);

  return (
    <div className="flex items-center justify-between border-base-300 border-b rounded-lg py-6">
      <div className="ml-4 w-full overflow break-words overflow-auto">
        <div className="text-xs opacity-80 font-semibold">
          {comment.creatorName} • {timeFormatter(comment.createdAt)}
        </div>
        {!isEditing && <div className="text-sm mt-2">{comment.body}</div>}
        {isEditing && (
          <div className="m-1">
            <CommentTextarea value={commentState.body} onChange={onChange} />

            <div className="flex items-center justify-end gap-4 text-xs">
              <button
                className="btn btn-sm text-xs"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleEdit();
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-sm btn-outline text-xs"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleEdit();
                }}
              >
                {editMutation.isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        )}
      </div>
      {!isEditing && (
        <div className="dropdown dropdown-end self-start">
          <KebabButton />
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-fit border"
          >
            <li>
              <EditButton
                onClick={(e) => {
                  e.preventDefault();
                  toggleEdit();
                }}
              />
            </li>
            <li>
              <DeleteButton
                onClick={(e) => {
                  e.preventDefault();
                  onDeleteAttempt(comment._id);
                }}
              />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

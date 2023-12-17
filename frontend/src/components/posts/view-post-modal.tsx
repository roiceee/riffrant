import DownvoteButton from "@/app/assets/downvote-icon";
import UpvoteIcon from "@/app/assets/upvote-icon";

interface ViewPostModalProps {
  title: string;
  body: string;
  upvotes: number;
  displayName: string;
  createdAt: string;
}

function ViewPostModal({
  title,
  body,
  upvotes,
  displayName,
  createdAt,
}: ViewPostModalProps) {
  const onClose = () => {
    const modal: any = document.getElementById("modal-post-view");
    if (modal) {
      modal.close();
    }
  };

  return (
    <dialog id="modal-post-view" className="modal prose">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="modal-header">
          <div className="font-semibold opacity-80 text-xs">
            Posted by: {displayName}
          </div>
          <h3 className="mb-0 mt-2">{title}</h3>

          <div className="font-semibold opacity-80 text-xs">{createdAt}</div>
        </div>
        <p className="modal-body">{body}</p>
        <div className="modal-footer flex items-center justify-between">
          <div className="flex items-center justify-start gap-2">
            <button className="btn btn-outline btn-success btn-sm">
              <UpvoteIcon />
            </button>
            <span className=" text-lg">
              <b>{upvotes}</b>
            </span>
            <button className="btn btn-outline btn-error btn-sm">
              <DownvoteButton />
            </button>
          </div>
          <div className="modal-action mt-0">
            <button className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default ViewPostModal;

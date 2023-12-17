interface ViewPostModalProps {
  onClose: () => void;
  title: string;
  body: string;
  upvotes: number;
  displayName: string;
  createdAt: string;
}

function ViewPostModal({ onClose }: ViewPostModalProps) {
  return (
    <dialog id="modal-post-view" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">What&apos;s on your mind?</h3>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Title</span>
            <span className="label-text">0/40</span>
          </div>
          <input
            type="text"
            placeholder="Enter Title"
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Body</span>
            <span className="label-text">0/300</span>
          </div>
          <textarea
            placeholder="Enter Body"
            className="textarea textarea-bordered textarea-sm w-full"
            style={{ minHeight: "200px" }}
          />
        </label>
        <div className="modal-action">
          <button className="btn btn-accent">Post</button>
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default ViewPostModal;

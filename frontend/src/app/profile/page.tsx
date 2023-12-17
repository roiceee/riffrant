"use client";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const auth = useAuth0();

  const editName = () => {
    setIsEditing(true);
  };

  const saveName = () => {
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const showModal = () => {
    const elem: any = document.getElementById("modal-delete")!;
    elem.showModal();
  };

  const closeModal = () => {
    const elem: any = document.getElementById("modal-delete")!;
    elem.close();
  };

  if (!auth.isAuthenticated) {
    return (
      <div className=" absolute start-1/2 bottom-1/2 -translate-x-1/2 -translate-y-1/2 prose">
        <h2>
          Please{" "}
          <button className="btn" onClick={() => auth.loginWithRedirect()}>
            Login
          </button>{" "}
          to configure profile.
        </h2>
      </div>
    );
  }

  return (
    <main className="prose mx-auto">
      <section>
        <h3>Profile</h3>
        <div>
          <b>Email: </b> {auth.user?.email}
        </div>
        <div>
          <b>Posts: </b>0
        </div>
      </section>

      <section>
        <h3>Profile Settings</h3>
        <hr className="mb-2" />

        {!isEditing && (
          <div>
            <div className="flex items-center justify-between">
              <span>
                <b>Display name: </b>
              </span>
              <button className="btn" onClick={editName}>
                Edit
              </button>
            </div>
            <div>PLACEHOLDER NAME</div>
          </div>
        )}

        {isEditing && (
          <div>
            <div className="flex items-center justify-between">
              <span>
                <b>Display name: </b>
              </span>
              <div className="mb-2">
                <button
                  className="btn btn-sm btn-outline btn-success mr-2"
                  onClick={saveName}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </button>
                <button
                  className="btn btn-sm btn-outline btn-error"
                  onClick={cancelEdit}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="PLACEHOLDER NAME WILL BE HERE"
            />
          </div>
        )}

        <button
          onClick={showModal}
          className="btn btn-outline btn-error w-full sm:w-fit mt-12"
        >
          Delete all posts
        </button>
      </section>

      <dialog id="modal-delete" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Delete All Posts!</h3>
          <p className="py-4">
            Are you sure you want to delete all your posts?
          </p>
          <div className="modal-action">
            <button className="btn btn-error">Delete</button>
            <button className="btn" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </main>
  );
}

export default ProfilePage;

"use client";
import { useAuth0 } from "@auth0/auth0-react";
import placeholder from "/public/user-placeholder.jpg";
import Image from "next/image";
import Link from "next/link";
import NormalContainer from "@/components/containers/normal-container";
import FilterIcon from "./assets/filter";
import ArrowDown from "./assets/arrow-down";
import PostCard from "@/components/containers/post-card";
import ScrollToTopButton from "@/components/scroll-to-top-button";
import { useState } from "react";
import _ from "lodash";

export default function Home() {
  const auth = useAuth0();

  const [filter, setFilter] = useState<"recent" | "popular">("recent");

  const changeFilter = (filter: "recent" | "popular") => {
    setFilter(filter);
    const elem: any = document.activeElement;
    if (elem) {
      elem.blur();
    }
  };

  const closeModal = () => {
    const modal: any = document.getElementById("modal-post");
    modal.close();
  };

  const openModal = () => {
    const modal: any = document.getElementById("modal-post");
    modal.showModal();
  };

  return (
    <main className="">
      <NormalContainer>
        {!auth.isAuthenticated && (
          <b>
            <button
              className="btn btn-primary"
              onClick={() => auth.loginWithRedirect()}
            >
              Login
            </button>{" "}
            to share your thoughts!
          </b>
        )}
        {auth.isAuthenticated && (
          <div className="flex gap-1">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-12 rounded-full">
                <Link href={"/profile"}>
                  <Image
                    alt="profile"
                    src={
                      auth.isAuthenticated ? auth.user!.picture! : placeholder
                    }
                    width={70}
                    height={70}
                  />
                </Link>
              </div>
            </div>
            <button
              className="p-3 rounded-badge 
              overflow-hidden overflow-ellipsis text-left 
              font-semibold text-sm sm:text-md 
              w-full hover:bg-base-200 border hover:border-accent"
              onClick={openModal}
              contentEditable={false}
            >
              What&apos;s on your mind, PLACEHOLDER?
            </button>
          </div>
        )}
      </NormalContainer>

      <section className="mt-4">
        <div className="ml-2 flex items-center">
          <FilterIcon />
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-sm btn-ghost m-1"
            >
              {_.capitalize(filter)}
              <ArrowDown />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52"
            >
              <li onClick={() => changeFilter("recent")}>
                <a>Recent</a>
              </li>
              <li onClick={() => changeFilter("popular")}>
                <a>Popular</a>
              </li>
            </ul>
          </div>
        </div>
        <hr />
      </section>
      <section className="mt-6 flex flex-col gap-3">
        <PostCard
          title="TITLE GOES HERE"
          displayName="placeholderName"
          body="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem veritatis nostrum, officia numquam aut mollitia in voluptates neque  reprehenderit nobis quia aliquid temporibus consectetur maxime odit vel sint atque ipsum"
          upvotes={0}
        />
        <PostCard
          title="TITLE GOES HERE"
          displayName="placeholderName"
          body="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem veritatis nostrum, officia numquam aut mollitia in voluptates neque  reprehenderit nobis quia aliquid temporibus consectetur maxime odit vel sint atque ipsum Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem veritatis nostrum, officia numquam aut mollitia in voluptates neque  reprehenderit nobis quia aliquid temporibus consectetur maxime odit vel sint atque ipsum"
          upvotes={0}
        />
        <PostCard
          title="TITLE GOES HERE"
          displayName="placeholderName"
          body="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem veritatis nostrum, officia numquam aut mollitia in voluptates neque  reprehenderit nobis quia aliquid temporibus consectetur maxime odit vel sint atque ipsum"
          upvotes={0}
        />
        <PostCard
          title="TITLE GOES HERE"
          displayName="placeholderName"
          body="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem veritatis nostrum, officia numquam aut mollitia in voluptates neque  reprehenderit nobis quia aliquid temporibus consectetur maxime odit vel sint atque ipsum"
          upvotes={0}
        />
        <PostCard
          title="TITLE GOES HERE"
          displayName="placeholderName"
          body="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem veritatis nostrum, officia numquam aut mollitia in voluptates neque  reprehenderit nobis quia aliquid temporibus consectetur maxime odit vel sint atque ipsum"
          upvotes={0}
        />
      </section>
      <ScrollToTopButton />
      <dialog id="modal-post" className="modal">
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
            <button className="btn" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </main>
  );
}

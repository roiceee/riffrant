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
            <input
              className="p-3 rounded-badge bg-base-200 overflow-hidden overflow-ellipsis font-semibold text-sm sm:text-md w-full"
              type="text"
              value={"What's on your mind, PLACEHOLDER?"}
              disabled
            ></input>
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
    </main>
  );
}

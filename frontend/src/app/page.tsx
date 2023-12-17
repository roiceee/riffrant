"use client";
import { useAuth0 } from "@auth0/auth0-react";
import placeholder from "/public/user-placeholder.jpg";
import Image from "next/image";
import Link from "next/link";
import NormalContainer from "@/components/containers/normal-container";

export default function Home() {
  const auth = useAuth0();

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
    </main>
  );
}

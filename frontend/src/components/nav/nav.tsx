"use client";

import Image from "next/image";
import placeholder from "/public/user-placeholder.jpg";
import MenuList from "./menulist";
import { useAuth0 } from "@auth0/auth0-react";
import Link from "next/link";

function Navbar() {
  const auth = useAuth0();

  return (
    <div className="navbar bg-base-100 border-b lg:px-20 mb-12">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">USePinion</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <ul className="menu menu-horizontal px-1">
            <MenuList />
          </ul>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <Image
                alt="Tailwind CSS Navbar component"
                src={auth.isAuthenticated ? auth.user!.picture! : placeholder}
                width={50}
                height={50}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {!auth.isAuthenticated && (
              <li
                onClick={() => {
                  auth.loginWithRedirect();
                }}
              >
                <a>Login</a>
              </li>
            )}
            {auth.isAuthenticated && (
              <>
                <li>
                  <Link href={"/profile"} className="justify-between">
                    Profile
                  </Link>
                </li>
                <li
                  onClick={() => {
                    auth.logout({
                      logoutParams: {
                        returnTo: process.env.NEXT_PUBLIC_REDIRECT_URI,
                      },
                    });
                  }}
                >
                  <a>Logout</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

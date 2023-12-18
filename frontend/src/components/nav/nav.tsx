"use client";

import Image from "next/image";
import placeholder from "/public/user-placeholder.jpg";
import logo from "/public/logo-100.png";
import MenuList from "./menulist";
import { useAuth0 } from "@auth0/auth0-react";
import Link from "next/link";

function Navbar() {
  const auth = useAuth0();

  const closeOnClick = () => {
    const elem: any = document.activeElement;
    if (elem) {
      elem.blur();
    }
  };

  return (
    <div className="navbar bg-base-100 border-b px-4 lg:px-20 mb-12">
      <div className="flex-1">
        <Image src={logo} height={50} width={50} alt="logo" />
        <div className="hidden sm:inline">
          <a className="btn btn-ghost text-xl">USePinion</a>
        </div>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <ul className="menu menu-horizontal px-1">
            <MenuList />
          </ul>
        </div>
        <div className="dropdown dropdown-end px-1">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-11 rounded-full">
              <Image
                alt="profile"
                src={auth.isAuthenticated ? auth.user!.picture! : placeholder}
                width={60}
                height={60}
                className="rounded-full border my-0"
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
                  <Link
                    href={"/profile"}
                    className="justify-between"
                    onClick={closeOnClick}
                  >
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

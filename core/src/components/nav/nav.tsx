"use client";
import Image from "next/image";
import placeholder from "/public/user-placeholder.jpg";
import logo from "/public/icon-100.png";
import MenuList from "./menulist";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import ThemeToggler from "./theme-toggler";

function Navbar() {
  const { user } = useUser();

  const closeOnClick = () => {
    const elem: any = document.activeElement;
    if (elem) {
      elem.blur();
    }
  };

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100 border-b px-4 lg:px-60 mb-4 sm:mb-6">
      <div className="flex-1 gap-2">
        <Link href={"/"}>
          <Image src={logo} height={50} width={50} alt="logo" />
        </Link>
        <div className="hidden sm:inline">
          <Link href={"/"} className="font-bold text-xl">
            RiffRant
          </Link>
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
            <div className="w-10 rounded-full">
              <Image
                alt="profile"
                src={user ? user.picture! : placeholder}
                width={60}
                height={60}
                className="rounded-full my-0"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {!user && (
              <>
                <li>
                  <Link href={"/api/auth/login"}>Login</Link>
                </li>
                <li>
                  <ThemeToggler />
                </li>
              </>
            )}
            {user && (
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
                <li>
                  <ThemeToggler />
                </li>
                <li>
                  <a
                    href={
                      "/api/auth/logout?returnTo=" +
                      process.env.NEXT_PUBLIC_LOGOUT_REDIRECT
                    }
                    onClick={closeOnClick}
                  >
                    Logout
                  </a>
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

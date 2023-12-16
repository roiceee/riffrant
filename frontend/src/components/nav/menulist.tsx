"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function MenuList() {

  const pathname = usePathname();

  const activePathHighlighter = (path: string) => {
    if (pathname === path) {
      return "text-accent";
    } else {
      return "";
    }
  };

  return (
    <>
      <li className={activePathHighlighter("/")}>
        <Link href={"/"}>App</Link>
      </li>
      <li className={activePathHighlighter("/about")}>
        <Link href={"/about"}>About</Link>
      </li>
    </>
  );
}

export default MenuList;

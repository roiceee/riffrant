"use client";
import Image from "next/image";
import black from "/public/nextjs1.png";
import white from "/public/nextjs2.png";
import { useContext } from "react";
import { ThemeContext } from "@/context/theme-context";

function NextImage() {
  const { theme } = useContext(ThemeContext);

  return (
    <Image
      className="m-0"
      src={theme === "dark" ? white : black}
      width={70}
      height={70}
      alt="NextJs"
    />
  );
}

export default NextImage;

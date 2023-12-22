"use client";
import BackButton from "@/components/util/back-button";
import { usePathname } from "next/navigation";

export default function PostTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <section>
      <div className="mb-2 flex">
        <div>
          <BackButton />
        </div>
        <div className="self-center mx-auto">
          {pathname.includes("edit") ? "Edit Post" : "View Post"}
        </div>
      </div>
      {children}
    </section>
  );
}

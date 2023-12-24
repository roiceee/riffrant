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
      <div>
        <BackButton />
      </div>

      <div className="mx-auto w-fit mb-2">
        {pathname.includes("edit") ? "Edit Post" : "View Post"}
      </div>
      {children}
    </section>
  );
}

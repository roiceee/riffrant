import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav/nav";
import ScrollToTopButton from "@/components/scroll-to-top-button";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import QueryProvider from "@/components/query-provider";

const font = Montserrat({ style: "normal", weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Usepinion",
  description: "A place where USepians can share their thoughts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <UserProvider>
        <QueryProvider>
          <body className={font.className + " mb-4"}>
            <Navbar />
            <div className="container mx-auto px-4 sm:px-16 md:px-24 lg:px-56">
              {children}
            </div>
            <ScrollToTopButton />
          </body>
        </QueryProvider>
      </UserProvider>
    </html>
  );
}
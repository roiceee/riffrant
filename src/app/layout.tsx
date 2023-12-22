import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav/nav";
import ScrollToTopButton from "@/components/scroll-to-top-button";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import QueryProvider from "@/components/query-provider";
import GlobalAlertModal from "@/components/util/global-alert";

const font = Montserrat({ style: "normal", weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RiffRant",
  description: "A place where people can share their thoughts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dim" className=" bg-base-200">
      <UserProvider>
        <QueryProvider>
          <body className={font.className + " mb-4"}>
            <GlobalAlertModal>
              <Navbar />
              <div className="container mx-auto px-4 sm:px-16 md:px-24 lg:px-60">
                {children}
              </div>

              <ScrollToTopButton />
            </GlobalAlertModal>
          </body>
        </QueryProvider>
      </UserProvider>
    </html>
  );
}

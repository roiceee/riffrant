import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav/nav";
import AuthProvider from "@/components/nav/authprovider";

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
      <body className={font.className}>
        <AuthProvider>
          <Navbar />
          <div className="container mx-auto px-4 sm:px-16 md:px-24">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}

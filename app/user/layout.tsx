import type { Metadata } from "next";
import "../globals.css";
import { Secondary } from "@/app/components/Buttons";
import Header from "@/app/components/Header-Nav/Header";
import UserNav from "@/app/components/Header-Nav/UserNav";

export const metadata: Metadata = {
  title: "Macstudio Nexus CMS User",
  description: "Official web app for Macstudio Nexus Content Management System",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <nav className=" hidden sm:block sticky top-0 h-screen w-55 md:w-70 bg-dark overflow-y-auto">
        <UserNav />
      </nav>
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-50 bg-primary">
          <Header title="User" button1={<Secondary label="Log Out" />} />
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

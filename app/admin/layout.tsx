import type { Metadata } from "next";
import "../globals.css";
import { Primary, Secondary } from "@/app/components/Buttons";
import Header from "@/app/components/Header-Nav/Header";
import Nav from "@/app/components/Header-Nav/Nav";

export const metadata: Metadata = {
  title: "Macstudio Nexus CMS",
  description: "Official web app for Macstudio Nexus Content Management System",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <nav className=" hidden sm:block sticky top-0 h-screen w-55 md:w-70 bg-dark overflow-y-auto">
        <Nav />
      </nav>
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-50 bg-primary">
          <Header title="Admin" button1={<Primary label="Log Out" />} />
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

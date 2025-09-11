import type { Metadata } from "next";
import "../globals.css";
import { Secondary } from "@/app/components/Buttons";
import Header from "@/app/components/Header-Nav/Header";
import AdminNav from "@/app/components/Header-Nav/AdminNav";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Macstudio Nexus CMS Admin",
  description: "Official web app for Macstudio Nexus Content Management System",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <nav className=" hidden sm:block sticky top-0 h-screen min-w-55 md:min-w-70 bg-dark overflow-y-auto">
        <AdminNav />
      </nav>
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-50 bg-primary">
          <Header title="Admin" button1={<Secondary label="Log Out" />} />
        </header>
        <main className="flex-1 overflow-auto min-w-0">{children}</main>
      <footer className="sticky bottom-0 w-full">
        <Footer />
      </footer>
      </div>
    </div>
  );
}

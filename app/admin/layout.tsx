import type { Metadata } from "next";
import "../globals.css";
import { Primary, Secondary } from "@/app/components/Buttons";
import Header from "@/app/components/Header-Nav/Header";

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
    <>
      <header>
        <Header title="Admin Dashboard" button1={<Primary label="Log Out" />} />
      </header>
      {children}
    </>
  );
}

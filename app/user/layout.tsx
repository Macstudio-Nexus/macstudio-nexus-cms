import type { Metadata } from "next";
import "../globals.css";
import { Primary, Secondary } from "@/app/components/Buttons";
import Header from "@/app/components/Header-Nav/Header";

export const metadata: Metadata = {
  title: "Macstudio Nexus CMS",
  description: "Official web app for Macstudio Nexus Content Management System",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}

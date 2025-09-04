import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Macstudio Nexus CMS",
  description: "Official web app for Macstudio Nexus Content Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

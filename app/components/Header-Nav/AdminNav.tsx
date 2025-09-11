"use client";

import { Primary } from "../Buttons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const adminMenuItems: { label: string; link: string; isDisabled: boolean }[] = [
  { label: "Dashboard", link: "/admin", isDisabled: false },
  { label: "Projects", link: "/admin/projects", isDisabled: false },
  { label: "Users", link: "/admin/users", isDisabled: false },
  { label: "Sites", link: "/admin/sites", isDisabled: false },
  { label: "Blog Posts", link: "/admin/blog", isDisabled: false },
  { label: "Contacts", link: "/admin/contacts", isDisabled: false },
  { label: "Media", link: "/admin/media", isDisabled: false },
  { label: "Settings", link: "/admin/settings", isDisabled: true },
];

export default function Nav({ onClickAction }: { onClickAction?: () => void }) {
  const pathname = usePathname();
  return (
    <>
      <div className="pl-15 pt-5 md:pl-20">
        <a
          href="https://macstudionexus.com"
          target="_blank"
          rel="noopener"
          className="self-start"
        >
          <Image
            src="/temp-logo.svg"
            alt="Logo"
            width={100}
            height={100}
            className="size-12 sm:size-16 md:size-24"
          />
        </a>
      </div>
      <nav className="p-4 sm:pt-8 font-jetbrains">
        <ul className="space-y-4 sm:space-y-8 text-2xl sm:text-3xl pl-1">
          {adminMenuItems.map((item) => (
            <li key={item.label}>
              {item.isDisabled ? (
                <span className="text-gray-400 cursor-not-allowed pl-2">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.link}
                  className={`${pathname === item.link ? "text-accent bg-gray-trans rounded py-1 pl-2 pr-5 lg:pr-10" : "text-white pl-2"} hover:underline`}
                  onClick={onClickAction}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="pl-4 fixed bottom-10 left-0 sm:hidden">
        <Primary label="Log Out" />
      </div>
    </>
  );
}

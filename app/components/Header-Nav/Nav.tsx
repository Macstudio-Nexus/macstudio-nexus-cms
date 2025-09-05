"use client";

import { Primary } from "../Buttons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const adminMenuItems: { label: string; link: string; isDisabled: boolean }[] = [
  { label: "Dashboard", link: "/admin", isDisabled: false },
  { label: "Projects", link: "/admin/client-projects", isDisabled: false },
  { label: "Users", link: "/admin/users", isDisabled: false },
  { label: "Portfolio", link: "/admin/portfolio", isDisabled: false },
  { label: "Blog", link: "/admin/blog", isDisabled: false },
  { label: "Contacts", link: "/admin/contacts", isDisabled: false },
  { label: "Media", link: "/admin/media", isDisabled: false },
  { label: "Settings", link: "/admin/settings", isDisabled: true },
];

export default function Nav({ onClickAction }: { onClickAction?: () => void }) {
  const pathname = usePathname();
  return (
    <>
      <nav className="p-4 sm:pt-8 font-jetbrains">
        <ul className="space-y-4 sm:space-y-8 text-lg sm:text-2xl pl-1">
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

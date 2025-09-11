"use client";
import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import AdminNav from "./AdminNav";
import UserNav from "./UserNav";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  title: string;
  button1?: React.ReactNode;
  button2?: React.ReactNode;
}

export default function Header({ button1 }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isAdminPage = pathname.startsWith("/admin");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header>
        <div className="flex justify-between items-center bg-dark h-auto py-4 shadow-md sticky top-0 z-40">
          <div className="flex sm:hidden">
            <button onClick={toggleMenu} className="pl-4">
              {isMenuOpen ? (
                <X color="white" size={40} />
              ) : (
                <Menu color="white" size={40} />
              )}
            </button>
          </div>
          <h1 className={`text-white font-bold ${isAdminPage ? 'text-xl sm:text-2xl md:text-5xl sm:pl-8' : 'text-sm sm:text-md md:text-lg lg:text-2xl'} font-jetbrains pr-8 sm:pr-0`}>
            {isAdminPage ? "Admin" : "Welcome back, client name"}
          </h1>
          <div className="hidden sm:flex pr-8">{button1}</div>
        </div>
      </header>
      {isMenuOpen && (
        <div className="sm:hidden bg-dark shadow-lg min-w-[14rem] h-full z-50">
          {isAdminPage ? <AdminNav onClickAction={toggleMenu} /> : <UserNav onClickAction={toggleMenu} />}
        </div>
      )}
    </>
  );
}

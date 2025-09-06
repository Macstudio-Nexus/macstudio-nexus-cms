"use client";
import { useState } from "react";
import Image from "next/image";
import Nav from "./Nav";

interface HeaderProps {
  title: string;
  button1?: React.ReactNode;
  button2?: React.ReactNode;
}

export default function Header({ button1, button2 }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header>
        <div className="flex justify-between items-center bg-dark h-auto py-4 shadow-md">
          <div className="flex sm:hidden">
            <button onClick={toggleMenu} className="pl-4">
              {isMenuOpen ? (
                <Image
                  src="/cross-menu-w.png"
                  alt="Close Menu"
                  width={100}
                  height={100}
                  className="cursor-pointer size-10"
                />
              ) : (
                <Image
                  src="/hamburger-menu.svg"
                  alt="Open Menu"
                  width={100}
                  height={100}
                  className="cursor-pointer size-10"
                />
              )}
            </button>
          </div>
          <h1 className="text-white font-bold text-xl sm:text-2xl md:text-5xl font-jetbrains pr-8 sm:pr-0 sm:pl-8">
            Admin
          </h1>
          <div className="hidden sm:flex pr-8">{button1}</div>
        </div>
      </header>
      {isMenuOpen && (
        <div className="sm:hidden bg-dark shadow-lg w-1/2 h-full fixed top-18 left-0 z-50">
          <Nav onClickAction={toggleMenu} />
        </div>
      )}
    </>
  );
}

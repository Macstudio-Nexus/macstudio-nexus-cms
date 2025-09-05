"use client";
import { useState } from "react";
import Image from "next/image";
import Nav from "./Nav";

interface HeaderProps {
  title: string;
  button1?: React.ReactNode;
  button2?: React.ReactNode;
}

export default function Header({ title, button1, button2 }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header>
        <div className="flex justify-between items-center bg-dark h-auto py-4 px-4 sm:px-14 border-b shadow-md">
          <div className="flex sm:hidden">
            <button onClick={toggleMenu}>
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
          <a
            href="https://macstudionexus.com"
            target="_blank"
            rel="noopener"
            className="self-start"
          >
            <Image src="/temp-logo.svg" alt="Logo" width={100} height={100} className="size-10 sm:size-16 md:size-18"/>
          </a>
          <h1 className="text-white font-bold text-lg sm:text-2xl md:text-4xl font-jetbrains">
            {title}
          </h1>
          <div className="hidden sm:flex">{button1}</div>
        </div>
      </header>
      {isMenuOpen && (
        <div className="sm:hidden bg-dark-accent shadow-lg w-1/2 h-full fixed top-18 border-t left-0 z-50">
          <Nav onClickAction={toggleMenu} />
        </div>
      )}
      <div className="hidden sm:flex bg-dark-accent shadow-lg w-1/4 h-full fixed top-24 md:top-26 border-t left-0">
        <Nav />
      </div>
    </>
  );
}

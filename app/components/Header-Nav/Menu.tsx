"use client";
import { useState } from "react";

import Image from "next/image";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleMenu}>
        {isOpen ? (
          <Image src="/cross-menu-w.png" alt="Logo" width={100} height={100} className="cursor-pointer size-10" />
        ) : (
          <Image src="/hamburger-menu.svg" alt="Logo" width={100} height={100} className="cursor-pointer size-10" />
        )}
      </button>
    </div>
  );
}

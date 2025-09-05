'use client';
import Image from "next/image";

interface ButtonProps {
  label: string;
  handleClick?: () => void;
}

export function Primary({ label, handleClick}: ButtonProps) {
  return (
    <button
      onClick={handleClick}
      className="buttonPrimary py-1 px-2 text-md sm:text-lg md:text-2xl cursor-pointer"
      >
      {label}
    </button>
  );
}

export function Secondary({ label, handleClick }: ButtonProps) {
  return (
    <button
      onClick={handleClick}
      className="buttonSecondary py-2 px-5 text-md sm:text-lg md:text-2xl cursor-pointer"
    >
      {label}
    </button>
  );
}

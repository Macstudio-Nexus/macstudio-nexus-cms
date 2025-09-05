import Image from "next/image";
import Menu from "./Menu";

interface HeaderProps {
  title: string;
  button1?: React.ReactNode;
  button2?: React.ReactNode;
}

export default function Header({ title, button1, button2 }: HeaderProps) {
  return (
    <header>
      <div className="flex justify-between items-center mb-4 bg-dark h-auto py-4 px-4">
        <div className="flex sm:hidden"><Menu /></div>
        <a
          href="https://macstudionexus.com"
          target="_blank"
          rel="noopener"
          className="self-start"
        >
          <Image src="/temp-logo.svg" alt="Logo" width={50} height={50} />
        </a>
        <h1 className="text-white font-bold text-lg font-jetbrains">{title}</h1>
        <div className="hidden sm:flex">{button1}</div>
      </div>
    </header>
  );
}

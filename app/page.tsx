import Image from "next/image";
import Login from "./components/Login";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <main className="page-container">
          <a
             href="https://macstudionexus.com"
            target="_blank"
            rel="noopener"
            className="self-start"
          >
            <Image
              src="/temp-logo.svg"
              alt="Logo"
              width={200}
              height={100}
              className="size-20 sm:size-25 md:size-30 pl-3 pt-3 md:pl-6 md:pt-6 self-start"
            />
          </a>
        <div className="flex flex-col justify-center items-center h-full sm:pb-30">
          <h1 className="font-source text-5xl sm:text-6xl md:text-7xl pb-8 pt-3 font-bold uppercase text-center">
            macstudio nexus cms
          </h1>
          <Login />
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 w-full">
        <Footer />
      </footer>
    </>
  );
}

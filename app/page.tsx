import Image from "next/image";
import Login from "./components/Login";
import Footer from "./components/Footer";

const Home = () => {
  return (
    <div className="flex flex-col justify-between items-center min-h-screen">
      <Image
        src="/temp-logo.svg"
        alt="Logo"
        width={200}
        height={100}
        className="size-20 self-start"
      />
      <h1 className="font-source text-5xl font-bold uppercase text-center">
        macstudio nexus cms
      </h1>
      <Login />
      <Footer />
    </div>
  );
};

export default Home;

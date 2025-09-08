"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Fake role check (replace with NextAuth later)
    if (email.includes("admin")) {
      router.push("/admin");
    } else {
      router.push("/user");
    }
  };

  return (
    <div className="flex flex-col justify-start items-center h-auto w-auto py-6 px-10 bg-black font-jetbrains text-white shadow-lg/45 rounded-lg">
      <h1 className="text-5xl pb-4">Log In</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-5 p-2 rounded-lg bg-gray-800 border border-gray-700"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-5 p-2 rounded-lg bg-gray-800 border border-gray-700"
        />
        <a href="#" className="text-sm text-gray-400 pl-1 hover:underline">
          Forgot Password?
        </a>
        <button type="submit" className="mt-5  p-2 rounded-lg bg-secondary text-black border border-transparent hover:bg-dark hover:text-white hover:border-accent transition-colors duration-300 cursor-pointer">
          Log In
        </button>
      </form>
    </div>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DarkModeToggle from "../components/DarkModeToggle";
export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("loggedIn", "true");
    router.push("/dashboard");
  };
  return (
  <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
    <main className="w-full max-w-md p-8 bg-white rounded shadow dark:bg-gray-800">
    <div className="flex justify-end mb-4">
      <DarkModeToggle />
    </div>
    <h1 className="text-2xl font-semibold mb-4 text-center text-black dark:text-white">
      Task Dashboard Login
    </h1>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    <input
       type="text"
       value={username}
       onChange={(e) => setUsername(e.target.value)}
       placeholder="Username"
       className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
      Log in
      </button>
    </form>
  </main>
</div>
  );
}

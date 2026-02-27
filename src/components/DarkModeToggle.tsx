"use client";
import { useEffect, useState } from "react";
export default function DarkModeToggle() {
const [dark, setDark] = useState(false);
useEffect(() => {
const saved = localStorage.getItem("dark");
    if (saved === "true") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);
const toggle = () => {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("dark", "false");
      setDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("dark", "true");
      setDark(true);
    }
  };
return (
    <button
      onClick={toggle}
      className="px-2 py-1 border rounded text-sm"
    >
      {dark ? "Light" : "Dark"}
    </button>
  );
}
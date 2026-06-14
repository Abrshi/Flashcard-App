'use client';
import { useEffect, useState } from "react";

export default function Navbar() {
  const [firstName, setFirstName] = useState("User");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);

      if (user?.name) {
        const first = user.name.split(" ")[0];
        setFirstName(first);
      }
    }
  }, []);

  return (
    <nav className="flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm">
      <h1 className="text-xl font-bold text-gray-900">
        StudyDeck
      </h1>

      <div className="text-sm font-medium text-gray-600">
        Hi {firstName}
      </div>
    </nav>
  );
}
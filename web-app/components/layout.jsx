"use client";

import React from "react";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white flex flex-col p-5">
        <h1 className="text-2xl font-bold mb-8">QuotePro</h1>
        <nav className="flex flex-col gap-4">
          <Link href="/dashboard" className="hover:text-gray-200">📊 Dashboard</Link>
          <Link href="/settings" className="hover:text-gray-200">⚙️ Settings</Link>
          <Link href="/inventory" className="hover:text-gray-200">🧾 Inventory</Link>
          <Link href="/emails" className="hover:text-gray-200">✉️ Emails</Link>
        </nav>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="mt-auto bg-red-500 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";
import { LayoutDashboard, Settings, LogOut } from "lucide-react";
import Link from "next/link";

export default function ClientLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white/10 backdrop-blur-xl border-r border-white/20 transition-all duration-300 flex flex-col p-4`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1
            className={`text-xl font-bold text-white tracking-tight ${
              !sidebarOpen && "hidden"
            }`}
          >
            QuotePro
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/20 rounded-lg text-white"
          >
            ☰
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2 hover:bg-white/20 rounded-lg transition"
          >
            <LayoutDashboard size={20} />
            {sidebarOpen && <span>Dashboard</span>}
          </Link>

          <Link
            href="/settings"
            className="flex items-center gap-3 px-3 py-2 hover:bg-white/20 rounded-lg transition"
          >
            <Settings size={20} />
            {sidebarOpen && <span>Settings</span>}
          </Link>
        </nav>

        {/* Logout */}
        <div className="mt-auto">
          <button className="flex items-center gap-3 px-3 py-2 hover:bg-white/20 rounded-lg w-full transition text-red-200">
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto relative">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-2xl -z-10"></div>

        <header className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center text-lg font-bold">
              J
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-3xl">
            <h3 className="font-semibold text-lg mb-2">Analytics</h3>
            <p className="text-gray-100 text-sm">
              Visualize and track performance over time.
            </p>
          </div>
          <div className="glass-card p-6 rounded-3xl">
            <h3 className="font-semibold text-lg mb-2">Tasks</h3>
            <p className="text-gray-100 text-sm">
              Manage your quotation tasks easily.
            </p>
          </div>
          <div className="glass-card p-6 rounded-3xl">
            <h3 className="font-semibold text-lg mb-2">Team</h3>
            <p className="text-gray-100 text-sm">
              Collaborate with your organization.
            </p>
          </div>
        </div>

        <div className="mt-10">{children}</div>
      </main>
    </div>
  );
}

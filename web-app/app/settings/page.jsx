"use client";
import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General Settings" },
    { id: "inventory", label: "Inventory Connection" },
    { id: "email", label: "Email Configuration" },
    { id: "payments", label: "Payment & Subscription" },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
          ⚙️ Settings Dashboard
        </h1>
        <p className="text-gray-200 mt-2">
          Customize your automation environment.
        </p>
      </header>

      {/* Tabs */}
      <div className="flex justify-center flex-wrap gap-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-neon
              ${
                activeTab === tab.id
                  ? "bg-accent text-white shadow-glow scale-105"
                  : "bg-white/20 text-gray-200 hover:bg-accent hover:text-white"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="glass-card p-8 text-white space-y-6 animate-fadeIn">
        {activeTab === "general" && (
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-accent">
              General Settings
            </h2>
            <p className="text-gray-100">
              Configure basic options such as app theme, notifications, and user
              preferences.
            </p>
          </section>
        )}

        {activeTab === "inventory" && (
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-accent">
              Inventory System Login
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Inventory API URL"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-accent"
              />
              <input
                type="text"
                placeholder="API Key / Token"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-accent"
              />
              <button className="btn-accent mt-4 w-full">
                Connect Inventory
              </button>
            </div>
          </section>
        )}

        {activeTab === "email" && (
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-accent">
              Email Configuration
            </h2>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Company Email"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-accent"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-accent"
              />
              <button className="btn-primary mt-4 w-full">Save Settings</button>
            </div>
          </section>
        )}

        {activeTab === "payments" && (
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-accent">
              Subscription & Payment
            </h2>
            <p className="text-gray-100 mb-4">
              Manage your plan and connect direct bank payments.
            </p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Bank Account / IBAN"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-accent"
              />
              <input
                type="text"
                placeholder="Bank Name"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-accent"
              />
              <button className="btn-primary w-full">Activate Subscription</button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

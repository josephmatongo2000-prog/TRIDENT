// components/ui/card.jsx
"use client";

import React from "react";
import clsx from "clsx";

export function Card({ className = "", children, ...props }) {
  return (
    <div
      className={clsx(
        "glass-card w-full rounded-3xl border border-white/20 shadow-lg p-6 transition-transform duration-300 hover:scale-[1.02]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ className = "", children, ...props }) {
  return (
    <div
      className={clsx("flex flex-col justify-between h-full", className)}
      {...props}
    >
      {children}
    </div>
  );
}

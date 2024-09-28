"use client"
// import type { Metadata } from "next";

import "./globals.css";

import { SessionProvider } from "next-auth/react";

// export const metadata: Metadata = {
//   title: "Auth",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SessionProvider>
        <body>{children}</body>
      </SessionProvider>
    </html>
  );
}
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "tech marketing club",
  description: "A home-base for the world's most creative tech marketers. Good conversation, regular meetups, real friends.",
  icons: {
    icon: "/brand/sparkle.svg",
    shortcut: "/brand/sparkle.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

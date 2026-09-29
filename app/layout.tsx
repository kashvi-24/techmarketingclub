import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tech Marketing Club — Find your people",
  description: "A global community for marketers in tech. Join the list for monthly meetups, real connections, and ideas worth sharing.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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

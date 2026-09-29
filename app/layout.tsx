import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "tech marketing club",
  description: "A community for marketers in tech. A group chat, a familiar face, somewhere to turn. Started by Kashvi.",
  icons: {
    icon: "/club-icon.png",
    shortcut: "/club-icon.png",
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

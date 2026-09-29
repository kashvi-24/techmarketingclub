import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tech Marketing Club",
  description: "A home-base for tech's most creative marketers.",
  metadataBase: new URL("https://techmarketing.club"),
  alternates: { canonical: "https://techmarketing.club/" },
  openGraph: {
    type: "website",
    url: "https://techmarketing.club/",
    siteName: "Tech Marketing Club",
    title: "Tech Marketing Club",
    description: "A home-base for tech's most creative marketers.",
    images: [{ url: "https://techmarketing.club/social/tmc-link-preview.jpg", width: 1200, height: 630, type: "image/jpeg", alt: "Tech Marketing Club — A home-base for tech's most creative marketers." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Marketing Club",
    description: "A home-base for tech's most creative marketers.",
    images: ["https://techmarketing.club/social/tmc-link-preview.jpg"],
  },
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

import type { Metadata } from "next";
import localFont from "next/font/local"
import "./globals.css";

const helvetica = localFont({
  src: "../public/fonts/Helvetica.ttf",
  variable: "--font-helvetica"
});

export const metadata: Metadata = {
  title: "Pu luong's paths",
  description: "Pu luong's paths ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${helvetica.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}</body>
    </html>
  );
}

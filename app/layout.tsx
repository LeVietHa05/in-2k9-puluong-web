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
        {children}
        <a
          href="tel:0867271607"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-main-bg text-white px-5 py-3 rounded-full shadow-lg hover:opacity-90 transition-opacity font-bold text-sm border-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
            <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
          </svg>
          0867271607
        </a>
      </body>
    </html>
  );
}

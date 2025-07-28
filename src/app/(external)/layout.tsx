import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

// import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Refhra-Web",
  description: "A balance and profuctivity platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <section>
        {children}

        </section>
      </div>
  );
}

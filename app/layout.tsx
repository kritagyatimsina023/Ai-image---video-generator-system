import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import ThemeRegistry from "@/lib/ThemeRegistry";
import QueryProvider from "@/lib/QueryProvider";
import ToastProvider from "@/lib/ToasterProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Studio",
  description: "AI Image and Video Generation Platform",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <QueryProvider>
          <ThemeRegistry>
            {children}
            <ToastProvider />
          </ThemeRegistry>
        </QueryProvider>
      </body>
    </html>
  );
}

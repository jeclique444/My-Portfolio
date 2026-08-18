// /app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jeric Lique | IT Enthusiast",
  description: "Jeric Lique - IT Professional Portfolio",
  icons: {
    icon: "/star.svg",
    apple: "/star.svg",
  },
  
  openGraph: {
    title: "Jeric Lique | IT Enthusiast",
    description: "Jeric Lique - IT Professional Portfolio",
    url: "https://jeric-liquee-portfolio.vercel.app",
    siteName: "Jeric Lique Portfolio",
    images: [
      {
        url: "/preview.png",       
        width: 1200,
        height: 630,
        alt: "Jeric Lique Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
 
  twitter: {
    card: "summary_large_image",
    title: "Jeric Lique | IT Enthusiast",
    description: "Jeric Lique - IT Professional Portfolio",
    images: ["/preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
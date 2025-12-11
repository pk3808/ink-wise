import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google"; // Import clean sans and serif fonts
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

// Configure fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: 'swap',
});

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Inkwise | Read, Write, Inspire",
  description: "A modern platform for thinkers and readers.",
  icons: {
    icon: '/inkwise.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${merriweather.variable}`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}


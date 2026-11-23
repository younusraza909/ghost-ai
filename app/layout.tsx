import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";
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
  title: "Ghost AI",
  description: "Real-time collaborative system design workspace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        theme: dark,
        variables: {
          colorPrimary: "var(--accent-primary)",
          colorPrimaryForeground: "#080809",
          colorBackground: "var(--bg-surface)",
          colorInput: "var(--bg-elevated)",
          colorInputForeground: "var(--text-primary)",
          colorForeground: "var(--text-primary)",
          colorNeutral: "var(--text-primary)",
          colorMuted: "var(--bg-subtle)",
          colorMutedForeground: "var(--text-muted)",
          colorDanger: "var(--state-error)",
          colorSuccess: "var(--state-success)",
          colorWarning: "var(--state-warning)",
          colorRing: "var(--accent-primary)",
          borderRadius: "var(--radius)",
          fontFamily: "var(--font-geist-sans), 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        },
      }}
    >
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} ${geistSans.className} dark h-full antialiased`}
      >
        <body className={`${geistSans.className} min-h-full flex flex-col font-sans`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}

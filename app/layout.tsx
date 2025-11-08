import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI QA Test Case Generator",
  description: "Generate comprehensive QA test cases from PRD documents using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

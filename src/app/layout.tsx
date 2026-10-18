import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { pretendard, notoSerifKr, playfairDisplay } from "./fonts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kimkkun.com"),
  title: "김꾼 — 필요한 건 AI로 직접 만드는 꾼.",
  description:
    "장사 꿀팁은 넘쳐난다. 도구가 없으면 현실은 그대로다. 그래서 AI로 직접 만든다. 김꾼 2막.",
  openGraph: {
    title: "김꾼 — 필요한 건 AI로 직접 만드는 꾼.",
    description:
      "장사 꿀팁은 넘쳐난다. 도구가 없으면 현실은 그대로다. 그래서 AI로 직접 만든다. 김꾼 2막.",
    url: "https://www.kimkkun.com",
    siteName: "김꾼",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`h-full antialiased ${pretendard.variable} ${notoSerifKr.variable} ${playfairDisplay.variable}`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

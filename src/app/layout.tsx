import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { pretendard, notoSerifKr, playfairDisplay } from "./fonts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kimkkun.com"),
  title: "김꾼 — 단골은 운이 아니다. 설계다.",
  description:
    "5년간 가게를 직접 운영하며 배운 것. 손님을 단골로, 단골을 팬으로 만드는 건 친절이 아니라 시스템이다. 자영업자를 위한 브랜딩·시스템 콘텐츠, 김꾼.",
  openGraph: {
    title: "김꾼 — 단골은 운이 아니다. 설계다.",
    description:
      "손님을 단골로, 단골을 팬으로 만드는 건 친절이 아니라 시스템이다. 자영업자를 위한 브랜딩·시스템 콘텐츠, 김꾼.",
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

import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import "../styles/v7.css";
import { brush, pretendard } from "./fonts";
import { HEADER, TABBAR } from "@/components/v7/markup";

const DESC = "AI는 누구나 쓴다. 그러나, 이기는 자영업자는 다르게 씁니다. 자영업자를 위한 AI 이야기 — 글·AI 질문 전부 무료.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kimkkun.com"),
  title: "김꾼 — 이기는 자영업자는 AI를 다르게 씁니다",
  description: DESC,
  openGraph: {
    title: "김꾼 — 이기는 자영업자는 AI를 다르게 씁니다",
    description: DESC,
    url: "https://www.kimkkun.com",
    siteName: "김꾼",
    locale: "ko_KR",
    type: "website",
  },
};

export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" as const };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${brush.variable}`}>
      <body>
        <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: HEADER }} />
        {children}
        <footer>
          <div className="wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/v7/logo-kk.png" alt="김꾼" />
            <span>릴스 조회수는 2026-11-02 인스타 공개 화면 기준 · 캐릭터는 김꾼 3D</span>
          </div>
        </footer>
        <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: TABBAR }} />
        <Script src="/v7/site.js?v=20261106m" strategy="afterInteractive" />
        <Analytics />
      </body>
    </html>
  );
}

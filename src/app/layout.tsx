import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "김건우 | 프론트엔드 개발자",
  description: "서비스의 목표를 이해하고 달성하는 개발자 김건우입니다.",
  openGraph: {
    images: [{ url: "/geonu-preview-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/geonu-preview-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <meta
          name="google-site-verification"
          content="PRXbUpwjHbIu-Fopc6kjUwnHKxe0DR_NzyXS112xYLY"
        />
        <link rel="preconnect" href="https://static.toss.im" />

        <link
          rel="stylesheet"
          href="https://static.toss.im/tps/main.css"
          media="print"
        />
        <link
          rel="stylesheet"
          href="https://static.toss.im/tps/others.css"
          media="print"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "X-HEC Founders",
    template: "%s | X-HEC Founders",
  },
  description: "The portfolio of X-HEC Founders - Showcasing unicorn startups and entrepreneurs from the HEC ecosystem",
  keywords: ["X-HEC", "Entrepreneurs", "Startups", "Founders", "HEC", "Portfolio", "Unicorns"],
  authors: [{ name: "X-HEC Entrepreneurs" }],
  creator: "X-HEC Entrepreneurs",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://xhec-founders.com",
    title: "X-HEC Founders",
    description: "The portfolio of X-HEC Founders",
    siteName: "X-HEC Founders",
  },
  twitter: {
    card: "summary_large_image",
    title: "X-HEC Founders",
    description: "The portfolio of X-HEC Founders",
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * Root layout component for the X-HEC Entrepreneurs platform
 * Provides global styles, fonts, and analytics setup
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-dataLayer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
              });
            `,
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtm.js?id=GTM-TS2W3D5W"
          strategy="afterInteractive"
        />
        {/* End Google Tag Manager */}
      </head>
      <body className="antialiased min-h-screen bg-white text-gray-900">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TS2W3D5W"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <div id="root" className="relative">
          {children}
        </div>

        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50"
        >
          Skip to main content
        </a>
      </body>
    </html>
  );
}

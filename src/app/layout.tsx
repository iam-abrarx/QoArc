import type { Metadata } from "next";
import { Noto_Serif, Manrope, Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PortfolioProvider } from "@/context/PortfolioContext";
import { LeadCaptureProvider } from "@/context/LeadCaptureContext";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import LoadingScreen from "@/components/LoadingScreen";
import ChatWidget from "@/components/ChatWidget";
import { ChatProvider } from "@/context/ChatContext";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.qoarc.com'),
  title: {
    default: "QOARC | Architecting Autonomous Intelligence",
    template: "%s | QOARC"
  },
  description: "A full-service AI product studio. We build intelligent SaaS, automate business operations, and ship end-to-end software products.",
  keywords: ["AI Studio", "Autonomous Intelligence", "SaaS Development", "Business Automation", "End-to-End Software"],
  authors: [{ name: "QOARC Team" }],
  creator: "QOARC",
  publisher: "QOARC",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.qoarc.com",
    title: "QOARC | Architecting Autonomous Intelligence",
    description: "A full-service AI product studio. We build intelligent SaaS and automate business operations.",
    siteName: "QOARC",
  },
  twitter: {
    card: "summary_large_image",
    title: "QOARC | Architecting Autonomous Intelligence",
    description: "A full-service AI product studio. We build intelligent SaaS and automate business operations.",
    creator: "@qoarc",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.svg",
  },
  verification: {
    google: "google02fe45cf459d4d4a",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${notoSerif.variable} ${manrope.variable} ${fraunces.variable}`}>
      <body className="bg-surface text-on-surface font-sans antialiased overflow-x-hidden">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <LoadingScreen />
        <PortfolioProvider>
          <LeadCaptureProvider>
            <ChatProvider>
              <Navbar />
              <main className="min-h-screen">
                {children}
              </main>
              <LeadCaptureModal />
              <ChatWidget />
              <Footer />
            </ChatProvider>
          </LeadCaptureProvider>
        </PortfolioProvider>
      </body>
    </html>
  );
}

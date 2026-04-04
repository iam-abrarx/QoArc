import type { Metadata } from "next";
import { Noto_Serif, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PortfolioProvider } from "@/context/PortfolioContext";
import { LeadCaptureProvider } from "@/context/LeadCaptureContext";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import LoadingScreen from "@/components/LoadingScreen";
import ChatWidget from "@/components/ChatWidget";
import { ChatProvider } from "@/context/ChatContext";

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
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "QOARC AI Studio",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "QOARC | Architecting Autonomous Intelligence",
    description: "A full-service AI product studio. We build intelligent SaaS and automate business operations.",
    images: ["/og-image.png"],
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
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${notoSerif.variable} ${manrope.variable}`}>
      <body className="bg-surface text-on-surface font-sans antialiased overflow-x-hidden">
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

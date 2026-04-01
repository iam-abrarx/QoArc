import type { Metadata } from "next";
import { Noto_Serif, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PortfolioProvider } from "@/context/PortfolioContext";
import { LeadCaptureProvider } from "@/context/LeadCaptureContext";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import LoadingScreen from "@/components/LoadingScreen";

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
  title: "QOARC | Architecting Autonomous Intelligence",
  description: "A full-service AI product studio. We build intelligent SaaS, automate business operations, and ship end-to-end software products.",
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
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <LeadCaptureModal />
            <Footer />
          </LeadCaptureProvider>
        </PortfolioProvider>
      </body>
    </html>
  );
}

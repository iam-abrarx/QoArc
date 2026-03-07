import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PortfolioProvider } from "@/context/PortfolioContext";

export const metadata: Metadata = {
  title: "QoArc Studio | Intelligent Digital Systems",
  description: "Expert AI automation, SaaS development, and pioneering PFAS research.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-bg-dark text-white font-sans antialiased overflow-x-hidden">
        <PortfolioProvider>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </PortfolioProvider>
      </body>
    </html>
  );
}

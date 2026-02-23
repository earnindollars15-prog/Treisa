import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { supabase } from "@/lib/supabase";

export async function generateMetadata(): Promise<Metadata> {
  let logoUrl = "/favicon.ico";

  if (supabase) {
    try {
      const { data } = await supabase
        .from('site_settings')
        .select('logo_url')
        .single();

      if (data?.logo_url) {
        logoUrl = data.logo_url;
      }
    } catch (err) {
      console.error("Error fetching favicon:", err);
    }
  }

  return {
    title: "TREISA™ | Quality Cleaning & Hygiene Products",
    description: "TREISA™ offers reliable, practical, and value-driven solutions designed for the needs of Indian households.",
    icons: {
      icon: logoUrl,
      shortcut: logoUrl,
      apple: logoUrl,
    }
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

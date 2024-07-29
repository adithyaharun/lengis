import "~/styles/globals.css";

import type { Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/components/providers/theme-provider"

export const metadata: Metadata = {
  title: "Lengis",
  description:
    "Ingin berpergian ke luar kota namun tidak tahu harga BBM di tiap kota? Yuk cari tahu harganya disini, kami sediakan juga kalkulator harga BBM beserta konsumsi BBM sesuai kebutuhanmu.",
  verification: {
    google: env.GOOGLE_SITE_VERIFICATION,
  }
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased tracking-tight">
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            {children}
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

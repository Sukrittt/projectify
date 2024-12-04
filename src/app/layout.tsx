import "~/styles/globals.css";

import { type Metadata } from "next";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Developer Competitions",
  description: "Find the best developer competitions",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const font = localFont({
  src: "../../public/fonts/virgil.woff2",
  variable: "--font-virgil",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${font.variable}`}>
        <body className="font-virgil">
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

import "~/styles/globals.css";

import { type Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { ClerkProvider } from "@clerk/nextjs";

import { TRPCReactProvider } from "~/trpc/react";
import Providers from "~/app/_components/providers";

export const metadata: Metadata = {
  title: "Developer Competitions",
  description: "Find the best developer competitions",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={GeistSans.className}>
        <body>
          <TRPCReactProvider>
            <Providers>{children}</Providers>
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

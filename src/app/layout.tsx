
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Layout } from "@/components/layout";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Acorn - Your Technical Documentation Solution",
  description: "Efficiently summarize technical documents with our advanced Next.js app. Enhance your productivity and streamline your workflow.",
  openGraph: {
    type: 'website',
    url: process.env.DOMAIN,
    title: 'Acorn',
    description: 'Efficiently summarize technical documents with our advanced Next.js app. Enhance your productivity and streamline your workflow.',
  },
  twitter: {
    card: 'summary',
    title: 'Acorn',
    description: 'Efficiently summarize technical documents with our advanced Next.js app. Enhance your productivity and streamline your workflow.',
  },
  metadataBase: new URL(process.env.DOMAIN || 'https://www.yourfallbackdomain.com/'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}


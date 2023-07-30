import localFont from "next/font/local"

import "@/styles/globals.css"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import Toaster from "@/components/ui/toaster"
import SiteFooter from "@/components/site-footer"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import ThemeProvider from "@/components/theme-provider"

const fontSans = localFont({
  src: "../assets/fonts/Satoshi-Regular.woff2",
  variable: "--font-sans",
}) as { variable: string }

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: "../assets/fonts/Satoshi-Bold.woff2",
  variable: "--font-heading",
})

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [
    {
      name: "elevenlabs",
      url: "https://elevenlabs.com",
    },
  ],
  creator: "elevenlabs",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@elevenlabs",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export default function Layout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <head /> */}
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* <header className="container z-40 bg-background">
            <div className="flex h-20 items-center justify-between py-6">
              <nav>
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "sm" }),
                    "px-4"
                  )}
                >
                  Login
                </Link>
              </nav>
            </div>
          </header> */}
          <main className="flex-1">
            {children}
            <Toaster />
            <TailwindIndicator />
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}

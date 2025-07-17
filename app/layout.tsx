import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: 'Jurnl - AI Research Assistant',
  description: 'Your personal AI research assistant. Track topics, get updates, and stay informed.',
  icons: {
    icon: '/favicon.svg',
    apple: '/jurnl-icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}

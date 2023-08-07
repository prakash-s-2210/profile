import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Navbar } from '@/components';
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Profile - Codedamn',
  description: `Welcome to my CodeDamnn profile! 🚀 I'm a dedicated coder on a mission to sharpen my programming skills and expand my tech horizons. Join me as I dive into the fascinating world of coding, tackling exciting projects and mastering new technologies. Let's collaborate, learn, and grow together in this incredible community of developers. #CodeDamnn #CodingPassion #TechEnthusiast`,
  icons: "/assets/icons/logo.svg"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}

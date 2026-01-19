import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// @ts-ignore: Importing CSS module for side effects
import './globals.css'
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Book Manager',
  description: 'Sistema de gerenciamento de livros',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

import '@/styles/globals.css'

import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
  title: 'CRUD',
  description: 'By Alex Girbescu',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-colors-dark-background text-colors-dark-foreground transition-colors duration-500 ease-out">
        <div className="mx-auto h-full max-w-7xl pt-5 font-medium ">
          {children}
        </div>
      </body>
    </html>
  )
}

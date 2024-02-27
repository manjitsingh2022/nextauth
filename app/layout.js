import { Inter } from 'next/font/google'
import Navbar from './[lang]/components/Navbar'
import AuthProvider from './context/AuthProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NextAuth Tutorial',
  description: 'Learn NextAuth.js by Dave Gray',
}
export default function RootLayout({
  children, params
}) {
  console.log(params,'paramdddd')
  const lang =params.lang
  return (
    <html lang={`${lang}`}>
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="flex justify-center items-start p-6 min-h-screen">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}

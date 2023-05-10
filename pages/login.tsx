import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Auth() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}
    >
      Login
    </main>
  )
}

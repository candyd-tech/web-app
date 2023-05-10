import Nav from '@/components/nav'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  return (
    <main
      className={`min-h-screen ${inter.className}`}
    >
      <Nav />
    </main>
  )
}

export default Home;

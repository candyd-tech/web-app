import { signInWithGoogle } from '@/components/firebase';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Auth() {
  return (
    <main
      className={`min-h-screen ${inter.className}`}
    >
      <button onClick={signInWithGoogle} className="p-10 bg-red-300">
        Sign In With Google
      </button>
    </main>
  );
}

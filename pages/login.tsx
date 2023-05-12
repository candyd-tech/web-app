import { signInWithGoogle } from '@/components/firebase';
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })

export default function Auth() {
  const router = useRouter()
  return (
    <main
      className={`min-h-screen ${inter.className}`}
    >
      <button onClick={
        () => {
          signInWithGoogle(); router.push("/profile")
        }
      } className="p-10 bg-red-300">
        Sign In With Google
      </button>
    </main>
  );
}

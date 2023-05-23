import { signInWithGoogle } from '@/components/firebase';
import { Poppins } from 'next/font/google'
import { useRouter } from 'next/router';
import { FaGoogle } from 'react-icons/fa';

const inter = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: [ 'latin' ]
});


export default function Auth() {
  const router = useRouter()
  return (
    <main
      className={`bg-[url(/login_bg.jpg)] bg-cover min-h-screen
      ${inter.className} flex items-center justify-center `}
    >
      <div className="p-5 flex flex-col h-full gap-10
        items-center justify-center bg-blue-100 bg-opacity-50 "
      >
        <h1 className={`font-bold text-center`}>Click here to begin capturing your crazy experiences and store them in unique ways! 
</h1>
        <button onClick={
          () => {
            signInWithGoogle(); router.push("/profile")
          }} className="px-5 bg-[#5c95e3]
            flex items-center gap-4 shadow-gray-700
            shadow-sm rounded-md"
        >
          <div className="h-full py-3">
            <p> <FaGoogle /> </p>
          </div>
          <p className="py-3">
            Sign In With Google
          </p>
        </button>
      </div>
    </main>
  );
}

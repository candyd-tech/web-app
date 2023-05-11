import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { auth } from "@/components/firebase"
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Provider, useDispatch } from 'react-redux'
import store from '@/components/redux/store'
import { setUid } from '@/components/redux/reducers/user'

export default function App({ Component, pageProps, router }: AppProps) {

  return (
    <Provider store={store}>
      <Main pageProps={pageProps} Component={Component} router={router} />
    </Provider>
  )
}

const Main  = ({Component, pageProps}: AppProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUid(user.uid));
        router.push("/profile")
      } else {
        router.push("/login")
      }
    })
  }, [])

  return (
    <Component {...pageProps} />
  )
}

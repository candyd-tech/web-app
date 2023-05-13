import '@/styles/globals.scss'

import axios from "axios"
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { onAuthStateChanged } from 'firebase/auth'
import { Provider, useDispatch, useSelector } from 'react-redux'

import store from '@/components/redux/store'
import { auth } from "@/components/firebase"
import { selectUser, setUser } from '@/components/redux/reducers/user'

export default function App({ Component, pageProps, router }: AppProps) {

  return (
    <Provider store={store}>
      <Main pageProps={pageProps} Component={Component} router={router} />
    </Provider>
  )
}

const Main  = ({Component, pageProps}: AppProps) => {
  console.log(process.env.NEXT_PUBLIC_DB_URL)
  const router = useRouter();
  const dispatch = useDispatch();
  const userObj = useSelector(selectUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        axios.get(`${process.env.NEXT_PUBLIC_DB_URL}/v1/user/${user.uid}`)
          .then(resp => {
            const resp_data = resp.data;
            console.log("resp_data", resp_data)
            if (resp_data) {
              dispatch(setUser({
                ...userObj,
                id: resp_data.id !== '' ? resp_data.id : '',
                fullname: resp_data.fullname !== '' ? resp_data.fullname : '',
                email: resp_data.email !== '' ? resp_data.email : '',
                photo_url: resp_data.photo_url !== '' ? resp_data.photo_url : '',
                username: resp_data.username !== '' ? resp_data.username : '',
                posts: resp_data.posts !== '' ? resp_data.posts : '',
                bio: resp_data.bio !== '' ? resp_data.bio : '',
              }))
              console.log(userObj)
            } else {
              router.push("/create-user")
            }
          }).catch(err => console.error(err))
      } else {
        router.push("/login")
      }
    })
  }, [])

  return (
    <Component {...pageProps} />
  )
}

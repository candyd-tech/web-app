import styles from "@/styles/createUser.module.scss"
import { Poppins } from 'next/font/google'

import { auth, logOut } from '@/components/firebase';
import { selectUid, selectUser, setUser } from '@/components/redux/reducers/user'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";

const inter = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: [ 'latin' ]
})

interface userFormValuesType {
  name: string
  email: string
  bio: string
  photoURL: string
  username: string
}

const submitUser = ({id, name, username, email, bio, photoURL}: {
    id: string | undefined,
    name: string | undefined,
    username: string | undefined,
    email: string | undefined,
    bio: string | undefined,
    photoURL: string | undefined
  }): boolean => { 
  const checkIfArgumentsUndefined = [id, name, username, email, bio, photoURL]
    .some(e => e === undefined || e === null || e === '')
  if (checkIfArgumentsUndefined) {
    console.log("Some var not filled", [id, name, username, email, bio, photoURL])
    return false
  }
  axios.post(`${process.env.NEXT_PUBLIC_DB_URL}/v1/user/profile`, {
    id,
    username,
    email,
    bio,
    photo_url: photoURL,
    posts: [],
    dedications_sent: [],
    dedications_received: [],
    fullname: name,
  }).then(resp => {
    // console.log(resp);
    return true
  }).catch(err => {
    console.error(err.response);
    return false
  })

  return true;
}

const CreateUser = () => {
  const uid = useSelector(selectUid);
  const user = useSelector(selectUser);
  const router = useRouter();

  const dispatch = useDispatch();
  const [userFormValues, setUserFormValues] = useState<userFormValuesType>({
    name: "",
    email: "",
    bio: "",
    photoURL: "",
    username: ""
  })

  useEffect(() => {
    if (uid !== '') {
      axios.get(`${process.env.NEXT_PUBLIC_DB_URL}/v1/user/${uid}`)
        .then(resp => {
          console.log("something", resp.data)

          if (resp.data !== null) {
            router.push("/profile")
          }
        })
    }
  }, [uid, user])

  useEffect(() => {
    onAuthStateChanged(auth, userAuth => {
      if (userAuth) {
        setUserFormValues({
          ...userFormValues,
          name: userAuth.displayName ?? "",
          email: userAuth.email ?? "",
          photoURL: userAuth.photoURL ?? "",
        })

        dispatch(setUser({
          ...user,
          id: userAuth.uid
        }))
      } else {
        router.push("/login")
      }
    })
  }, [])

  return (
    <main className={`${styles.container} ${inter.className}`}>
      <div className={`${styles.form_main}`}>
        <h1 className={`text-xl font-extrabold`}>Create Your Profile</h1>

        <form className={`${styles.form}`}>
          <div>
            <label htmlFor="name"> Your Name </label>
            <input
              className={`text-[#5c95e3]`}
              disabled={userFormValues.name ? true : false}
              onChange={e => setUserFormValues({...userFormValues, name: e.target.value})}
              id="name"
              type="text"
              value={userFormValues.name}
            />
          </div>

          <div>
            <label htmlFor="name"> Username </label>
            <input
              className={`text-[#5c95e3]`}
              onChange={e => setUserFormValues({...userFormValues, username: e.target.value})}
              id="name"
              type="text"
              value={userFormValues.username}
            />
          </div>

          <div>
            <label htmlFor="email"> Email </label>
            <input
              className={`text-[#5c95e3]`}
              disabled={userFormValues.email ? true : false}
              onChange={e => setUserFormValues({...userFormValues, email: e.target.value})}
              id="email"
              type="email"
              value={userFormValues.email}
            />
          </div>

          <div>
            <label htmlFor="bio"> Bio </label>
            <input 
              className={`text-[#5c95e3]`}
              id="bio"
              type="text"
              value={userFormValues.bio}
              onChange={e => setUserFormValues({...userFormValues, bio: e.target.value})}
            />
          </div>
        </form>
      </div>

      <div className={`${styles.form_buttons}`}>
        <button onClick={() => {logOut(); dispatch(setUser({...user, id: ""}))}}>Sign Out</button>
        <button onClick={() => {
          if ( submitUser({
            id: uid,
            name: userFormValues.name,
            email: userFormValues.email,
            username: userFormValues.username,
            bio: userFormValues.bio,
            photoURL: userFormValues.photoURL
          })) {
            console.log("submit user")
            dispatch(setUser({
              id: uid,
              fullname: userFormValues.name,
              email: userFormValues.email,
              username: userFormValues.username,
              bio: userFormValues.bio,
              photo_url:  userFormValues.photoURL,
              posts: []
            }))
            console.log("dispatched")
            router.push("/profile")
          } else {
            console.log("something went wrong")
          }
        }}>Done</button>
      </div>
    </main>
  )
}

export default CreateUser;

import Nav from '@/components/nav'
import ProfileFeed from '@/components/profile/profileFeed'
import ProfileInfo from '@/components/profile/profileInfo'

import general_styles from "@/styles/general.module.scss"
import profile_styles from "@/styles/profile.module.scss"

import { logOut } from '@/components/firebase'
import { selectUser, setUser } from '@/components/redux/reducers/user'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'

const Profile = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser);

  useEffect(() => {
    user.id !== '' && axios.get(`${process.env.NEXT_PUBLIC_DB_URL}/v1/user/${user.id}`)
      .then(resp => {
        // console.log(resp.data)
        dispatch(setUser({
          ...user,
          fullname: resp.data.fullname,
          username: resp.data.username,
          email: resp.data.email,
          photo_url: resp.data.photo_url,
          bio: resp.data.bio,
          posts: resp.data.posts
        }))
      }).catch(err => console.error(err));
  }, [setUser, dispatch])

  return (
    <>{
      user.id !== '' &&
      <main
        className={`
          min-h-screen
          ${profile_styles.profile_container}
          ${general_styles.page_container}`
      }>
        <div>
        <button
          onClick={() => {logOut(); dispatch(setUser({...user, id: ""}))}}
        >
          Sign Out
        </button></div>
        <Nav />
        <ProfileInfo />
        <ProfileFeed />
      </main>
    }</>
  )
}

export default Profile;

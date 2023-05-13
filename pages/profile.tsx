import Nav from '@/components/nav'
import ProfileFeed from '@/components/profile/profileFeed'
import ProfileInfo from '@/components/profile/profileInfo'

import general_styles from "@/styles/general.module.scss"
import profile_styles from "@/styles/profile.module.scss"

import { logOut } from '@/components/firebase'
import { selectUser, setUser } from '@/components/redux/reducers/user'
import { useDispatch, useSelector } from 'react-redux'

const Profile = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser);

  return (
    <>{
      user.id !== '' &&
      <main
        className={`min-h-screen ${profile_styles.profile_container} ${general_styles.page_container}`}
      >
        <button onClick={() => {logOut(); dispatch(setUser({...user, id: ""}))}}>sign out</button>
        <Nav />
        <ProfileInfo />
        <ProfileFeed />
      </main>
    }</>
  )
}

export default Profile;

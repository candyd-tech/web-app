import Nav from '@/components/nav'
import ProfileFeed from '@/components/profile/profileFeed'
import ProfileInfo from '@/components/profile/profileInfo'

import general_styles from "@/styles/general.module.scss"
import profile_styles from "@/styles/profile.module.scss"

import { logOut } from '@/components/firebase'
import { selectUid } from '@/components/redux/reducers/user'
import { useSelector } from 'react-redux'

const Profile = () => {
  const uid = useSelector(selectUid);

  return (
    <>{
      uid !== '' &&
      <main
        className={`min-h-screen ${profile_styles.profile_container} ${general_styles.page_container}`}
      >
        <button onClick={logOut}>sign out</button>
        <Nav />
        <ProfileInfo />
        <ProfileFeed />
      </main>
    }</>
  )
}

export default Profile;

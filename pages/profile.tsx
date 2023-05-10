import Nav from '@/components/nav'
import ProfileFeed from '@/components/profile/profileFeed'
import ProfileInfo from '@/components/profile/profileInfo'
import { Inter } from 'next/font/google'
import general_styles from "@/styles/general.module.scss"
import profile_styles from "@/styles/profile.module.scss"

const inter = Inter({ subsets: ['latin'] })

const Profile = () => {
  return (
    <main
      className={`min-h-screen ${profile_styles.profile_container} ${general_styles.page_container} ${inter.className}`}
    >
      <Nav />
      <ProfileInfo />
      <ProfileFeed />
    </main>
  )
}

export default Profile;

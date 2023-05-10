import { Inter } from 'next/font/google'
import { FaCarAlt, FaMapMarkerAlt, FaMouse } from "react-icons/fa";
import profile_styles from "@/styles/profile.module.scss"

const inter = Inter({ subsets: ['latin'] })

const FeedIcons = ({icon}: {icon: JSX.Element}) => {
  return (
    <div className="p-2 bg-[#5c95e3] rounded-md">
      {icon}
    </div>
  )
}

const GalleryPhotos = () => {
  return (
    <div className={`${profile_styles.gallery_images}`}></div>
  )
}

const ProfileFeed = () => {
  return (
    <section
      className={`
        ${profile_styles.feed}
        ${inter.className}
      `}
    >
      {/* Experiences */}
      <div className={`${profile_styles.experiences}`}>
        <h3 className={`text-base font-extrabold`}>Experiences</h3>

        <div>
          <FeedIcons icon={<FaMapMarkerAlt color={"white"} size={"1.5rem"}/>} />
          <FeedIcons icon={<FaCarAlt color={"white"} size={"1.5rem"}/>}/>
          <FeedIcons icon={<FaMouse color={"white"} size={"1.5rem"}/>} />
        </div>
      </div>

      <div className={`${profile_styles.gallery_section}`}>
        <h3 className={`font-extrabold`}>Gallery</h3>

        <div className={`${profile_styles.gallery}`}>
          <GalleryPhotos />
          <GalleryPhotos />
          <GalleryPhotos />
          <GalleryPhotos />
          <GalleryPhotos />
          <GalleryPhotos />
          <GalleryPhotos />
          <GalleryPhotos />
          <GalleryPhotos />
          <GalleryPhotos />
        </div>
      </div>
    </section>
  )
}

export default ProfileFeed;

import { Poppins } from 'next/font/google'
import { FaCarAlt, FaMapMarkerAlt, FaMouse } from "react-icons/fa";
import profile_styles from "@/styles/profile.module.scss"
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/reducers/user';
import { useEffect, useState } from 'react';
import axios from 'axios';

const inter = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: [ 'latin' ]
})

const FeedIcons = ({icon}: {icon: JSX.Element}) => {
  return (
    <div className="p-2 bg-[#5c95e3] rounded-md">
      {icon}
    </div>
  )
}

const GalleryPhotos = ({post_id}: {post_id: string}) => {
  const [post, setPost] = useState<any>(undefined);
  const [media, setMedia] = useState<any>(undefined);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.NEXT_PUBLIC_DB_URL}/v1/post/${post_id}`)
      .then(res => {
        setPost(res.data)
        axios.get(`${process.env.NEXT_PUBLIC_DB_URL}/v1/media/${res.data.medias[0]}`)
          .then(r => {
            setMedia(r.data);
            setLoading(false)
          }).catch(err => console.error(err))
      }).catch(err => console.error(err))
  }, [])

  return (
    <div className={`${profile_styles.gallery_images}`}>
      {!loading && media &&
      <img src={media.compressed_url} alt={post.caption} />}
    </div>
  )
}

const ProfileFeed = () => {
  const user = useSelector(selectUser);

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
        {
          user.posts.map(post => {
            return (
              <GalleryPhotos key={post} post_id={post}/>
            )
          })
        }
        </div>
      </div>
    </section>
  )
}

export default ProfileFeed;

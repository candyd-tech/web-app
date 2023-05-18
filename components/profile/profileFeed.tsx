import axios from 'axios';
import Link from 'next/link';
import { Poppins } from 'next/font/google'
import { selectUser } from '../redux/reducers/user';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FaCarAlt, FaMapMarkerAlt, FaMouse } from "react-icons/fa";

import profile_styles from "@/styles/profile.module.scss"
import { resize } from '../resize';

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
        // console.log(res.data)
        res.data.medias && axios.get(`${process.env.NEXT_PUBLIC_DB_URL}/v1/media/${res.data.medias[0]}`)
          .then(r => {
            setMedia(r.data);
            setLoading(false)
          }).catch(err => console.error(err))
      }).catch(err => console.error(err))
  }, [post_id])

  return (
    <div className={`${profile_styles.gallery_images}`}>
      {!loading && media &&
        <Link href={ `/${post_id}` }> 
          <img src={resize(media.compressed_url, 'w_300')} alt={post.caption} />
        </Link>
      }
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
        <h3 className={`text-base font-extrabold hidden`}>Experiences</h3>

        <div>
          <FeedIcons icon={<FaMapMarkerAlt color={"white"} size={"1.5rem"}/>} />
          <FeedIcons icon={<FaCarAlt color={"white"} size={"1.5rem"}/>}/>
          <FeedIcons icon={<FaMouse color={"white"} size={"1.5rem"}/>} />
        </div>
      </div>

      <div className={`${profile_styles.gallery_section}`}>
        <h3 className={`font-extrabold`}>Gallery</h3>

        <div className={`${ user.posts.length !== 0 ? profile_styles.gallery : profile_styles.empty_gallery}`}>
        {
          user.posts.length !== 0 ? user.posts.map(post => {
              return (
                <GalleryPhotos key={post} post_id={post}/>
              )
            }) : <p>Add some pictures!</p>
        }
        </div>
      </div>
    </section>
  )
}

export default ProfileFeed;

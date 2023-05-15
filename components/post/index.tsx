import Image from 'next/image';
import styles from '@/styles/imageView.module.scss'
import Tag from '../tag';
import { useEffect, useState } from 'react';
import axios from 'axios';

const UserInfo = ({userId}: {userId: string}) => {
  const [postUser, setPostUser] = useState<any>({});
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_DB_URL}/v1/user/${userId}`)
      .then(resp => {
        console.log("user", resp.data)
        setPostUser(resp.data)
      })
      .catch(err => console.error(err))
  }, [userId])

  return (
    <>{postUser &&
      <div className={`${styles.user_info}`}>
        <div className={`${styles.user_image} relative`}>
          <div> {/* <Image
              src={"/profile.png"}
              alt={"Profile Photo"}
              fill={true}
              style={{
                objectFit: "fill"
              }}
            /> */}</div>
        </div>

        <div className={`text-sm leading-[0.95rem]`}>
          <p className={`font-bold`}>@{postUser.username}</p>
          <p>{postUser.fullname}</p>
        </div>
      </div>
    }</>
  )
}

const Media = ({mediaId}: {mediaId: string}) => {
  const [url, setUrl] = useState("")

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_DB_URL}/v1/media/${mediaId}`)
      .then(resp => { console.log(resp.data); setUrl(resp.data.compressed_url) })
      .catch(err => console.error(err))
  }, [mediaId])

  return (
    <div className={`${styles.media}`}>
      <div className={`${styles.post_image}`}>
        <div className="relative">
          <img
            src={url}
            alt="Post Image"
            style={{
              objectFit: "contain"
            }}
          />
        </div>
      </div>
    </div>
  )
}

const Tags = ({tagsId}: {tagsId: string[]}) => {
  return (
    <div className={`${styles.tag_container}`}>
      <Tag tag={"tag1"} />
      <Tag tag={"tag1"} />
      <Tag tag={"tag1"} />
    </div>
  )
}

export {
  Tags,
  Media,
  UserInfo,
};

import { Poppins } from 'next/font/google'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Nav from '@/components/nav';
import TopBar from '@/components/topBar';
import { Media, Tags, UserInfo } from '@/components/post/';

import Modal from "react-modal";
import styles from '@/styles/imageView.module.scss';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUid } from '@/components/redux/reducers/user';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import CollectionsModal from '@/components/order/collectionsModal';

const inter = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: [ 'latin' ]
})

const ImageView = () => {
  const router = useRouter()
  const [caption, setCaption] = useState("");
  const [user, setUser] = useState("");
  const [media, setMedia] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isPublic, setIsPublic] = useState(true);

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const toggleVisibility = () => {
    axios.put(
      `${process.env.NEXT_PUBLIC_DB_URL}/v1/post/toggle-visibility`,
      {
        "id": router.query.post
      }
    )
      .then(res => {
        console.log(res)
        setIsPublic(res.data.is_public)
      })
      .catch(err => console.error(err))
  }

  const uid = useSelector(selectUid)

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_DB_URL}/v1/post/${router.query.post}`)
      .then(resp => {
        console.log(resp.data);
        setCaption(resp.data.caption);
        setMedia(resp.data.medias[0]);
        setUser(resp.data.user_id);
        setTags(resp.data.tags);
        setIsPublic(resp.data.is_public);
      })
      .catch(err => console.error(err))
  }, [router, isPublic])

  const truncateCaption = (caption: string): string => {
    if ( caption.length > 20 ) {
      return `${ caption.substring(0, 20) }...`
    } else return caption
  }

  return (
    <main className={`${styles.container} ${inter.className}`}>
      <Nav />
      <TopBar title={"Image"}/>

      <div className={`w-full ${styles.image_view_container}`}>
        <div className={`${styles.post}`}>
          {/* @ts-ignore */}
          <UserInfo userId={user} />

          {/* @ts-ignore */}
          <Media mediaId={media} />

          <div className={`${styles.caption_tag} text-sm`}>
            <p className={`overflow-ellipsis`}>
              {truncateCaption(caption)}
            </p>

            {/* @ts-ignore 
            <Tags tagsId={tags} />*/}
          </div>
        </div>

        <div className={`w-full text-white ${styles.buttons}`}>
          {
            uid === user ? isPublic ?
            <button onClick={toggleVisibility}>
              <FaEye size="1.5rem" />
            </button> : <button onClick={toggleVisibility}>
              <FaEyeSlash size="1.5rem" />
            </button> : <></>
          }
          <div>
            <button onClick={() => setModalIsOpen(true)}>Order</button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              contentLabel='Place Order'
              style={{content: {height: "50%"} }}
            >
              <h2 className={ `${inter.className} pb-8 text-lg font-semibold` }>Add Post to Collection: </h2>
              {/* @ts-ignore */}
              <CollectionsModal post_id={router.query.post} />
            </Modal>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ImageView;

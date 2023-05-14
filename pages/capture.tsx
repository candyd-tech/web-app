import { selectUid } from '@/components/redux/reducers/user'
import { Poppins } from 'next/font/google'

import capture_styles from "@/styles/capture.module.scss"
import image_styles from '@/styles/imageView.module.scss'
import Tag from '@/components/tag';
import Nav from '@/components/nav';
import { ChangeEvent, useEffect, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';

const inter = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: [ 'latin' ]
});


const CreateUser = () => {
  const uid = useSelector(selectUid);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter()

  const [caption, setCaption] = useState<string>("")

  const mediaPost = () => {
    return axios.postForm(
      `${process.env.NEXT_PUBLIC_DB_URL}/v1/media/`,
      {
      image: selectedFile
      }
    )
  }

  const postPost = (
    {
    caption,
    is_public,
    user_id
    }: {
      caption: string,
      is_public: boolean
      user_id: string}
  ) => {
    setLoading(true)
    mediaPost().then(res => {
      axios.post(`${process.env.NEXT_PUBLIC_DB_URL}/v1/post/`, {
        caption, user_id, tags: [], medias: [res.data.id], is_public,
      }).then(_res => {console.log(_res); setLoading(false); router.push("/profile")})
        .catch(err => console.error(err))
      }).catch(err => console.error(err))
  }

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null); return;
    }

    setSelectedFile(file)

    if (file) {
      const fileReader = new FileReader()
      fileReader.onload = () => {
        const out = fileReader.result;
        setImgSrc(out)
      }
      fileReader.readAsDataURL(file);
    }
  }

  useEffect(() => {
    if (!selectedFile) {
      setImgSrc(null)
      return
    }

    const url = URL.createObjectURL(selectedFile)
    setImgSrc(url)

    return () => URL.revokeObjectURL(url)
  }, [selectedFile])

  return (
    <>{
      uid !== '' &&
      <main className={`min-h-screen ${capture_styles.container} ${inter.className}`}>
        <Nav />

        <div className={`w-full ${capture_styles.capture_container}`}>
          <h1 className={`text-xl font-bold`}>Post a Memory</h1>
          <div className={`${capture_styles.post}`}>
            <div className={`${image_styles.media}`}>
              <div className={`pb-2 text-sm`}>
                Share your favorite place and memory on campus!⬇️
              </div>
              <div className={`${capture_styles.post_image}`}>
                {
                  selectedFile ?
                  <>
                    <img style={{objectFit: "fill"}} src={imgSrc} /> 
                    <button onClick={() => {setSelectedFile(null); setImgSrc(null)}}>change</button>
                  </>
                    : 
                  <>
                    <label className={`${capture_styles.input_camera}`}>
                      <FaCamera size={"3.5rem"} />
                      <input type="file"
                        onChange={e => onChangeFile(e)}
                        name="picture"
                        accept="image/*"
                        multiple={false}
                        capture="user"
                      />
                    </label>

                    <p>or</p>

                    <label className={`${capture_styles.input_camera} ${capture_styles.file_picker}`}>
                      Choose a file
                      <input type="file"
                        onChange={e => onChangeFile(e)}
                        name="picture"
                        accept="image/*"
                        multiple={false}
                      />
                    </label>
                  </>
                }

              </div>
            </div>

            <div className={`${capture_styles.caption_tag} text-sm`}>
              <label htmlFor="caption">Enter a caption
                <p className={`overflow-ellipsis`}>
                  <textarea
                    onChange={(e) => {setCaption(e.target.value)}}
                    value={caption}
                    id="caption"
                  />
                </p>
              </label>
              <div className={`${capture_styles.tag_container}`}>
                <Tag tag={"add a location"}/>
              </div>
            </div>
          </div>

          <div className={`w-full text-white ${capture_styles.buttons}`}>
            <button onClick={() => postPost({
              is_public: true,
              user_id: uid,
              caption: caption
            })}>Post</button>
          </div>
        </div>
      </main>
    }</>
  )
}

export default CreateUser;

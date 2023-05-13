import { selectUid } from '@/components/redux/reducers/user'
import { useSelector } from 'react-redux'

import capture_styles from "@/styles/capture.module.scss"
import image_styles from '@/styles/imageView.module.scss'
import Tag from '@/components/tag';
import Nav from '@/components/nav';

const CreateUser = () => {
  const uid = useSelector(selectUid);

  return (
    <>{
      uid !== '' &&
      <main className={`min-h-screen ${capture_styles.container}`}>
        <Nav />

        <div className={`w-full ${capture_styles.capture_container}`}>
          <div className={`${capture_styles.post}`}>
            <div className={`${image_styles.media}`}>
              <div className={`${image_styles.post_image}`}>
                <input type="file"
                  name="picture"
                  accept="image/*"
                  capture="user"
                />
              </div>
            </div>

            <div className={`${capture_styles.caption_tag} text-sm`}>
              <p className={`overflow-ellipsis`}>
                <textarea />
              </p>

              <div className={`${capture_styles.tag_container}`}>
                <Tag tag={"tag1"}/>
                <Tag tag={"tag1"}/>
                <Tag tag={"tag1"}/>
              </div>
            </div>
          </div>

          <div className={`w-full text-white ${capture_styles.buttons}`}>
            <button>Post</button>
          </div>
        </div>
      </main>
    }</>
  )
}

export default CreateUser;

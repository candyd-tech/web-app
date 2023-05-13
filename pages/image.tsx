import Nav from '@/components/nav';
import Tag from '@/components/tag';
import TopBar from '@/components/topBar';
import styles from '@/styles/imageView.module.scss'
import { Poppins } from 'next/font/google'
import Image from 'next/image';

const inter = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: [ 'latin' ]
})

const ImageView = () => {
  const caption = "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."

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
          <div className={`${styles.user_info}`}>
            <div className={`${styles.user_image} relative`}>
              <div> <Image
                  src={"/profile.png"}
                  alt={"Profile Photo"}
                  fill={true}
                  style={{
                    objectFit: "fill"
                  }}
                /> </div>
            </div>

            <div className={`text-sm leading-[0.85rem]`}>
              <p className={`font-bold`}>@AryaJ</p>
              <p>Arya Jhaveri</p>
            </div>
          </div>

          <div className={`${styles.media}`}>
            <div className={`${styles.post_image}`}>
              <div className="relative">
                <Image
                  src={"/sample.jpg"}
                  alt="Post Image"
                  fill={true}
                  style={{
                    objectFit: "fill"
                  }}
                />
              </div>
            </div>
          </div>

          <div className={`${styles.caption_tag} text-sm`}>
            <p className={`overflow-ellipsis`}>
              {truncateCaption(caption)}
            </p>

            <div className={`${styles.tag_container}`}>
              <Tag tag={"tag1"}/>
              <Tag tag={"tag1"}/>
              <Tag tag={"tag1"}/>
            </div>
          </div>
        </div>

        <div className={`w-full text-white ${styles.buttons}`}>
          <button>Order</button>
          <button>Dedicate</button>
        </div>
      </div>
    </main>
  )
}

export default ImageView;

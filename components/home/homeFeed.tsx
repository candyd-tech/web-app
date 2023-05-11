import { Poppins } from 'next/font/google'
import styles from "@/styles/feed.module.scss"

const inter = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: [ 'latin' ]
})

const FeedButton = ({title, onclick}: {title: string, onclick: () => void}) => {
  return (
    <button onClick={onclick} className={`text-sm ${styles.feed_button}`}>
      {title}
    </button>
  )
}

const FeedImages = () => {
  return (
    <div className={`${styles.feed_images}`}>
      <div></div>
    </div>
  )
}


const HomeFeed = () => {
  return (
    <section>
      <div
        className={`${inter.className} ${styles.feed_container}`}
      >
        <div className={`${styles.feed_buttons}`}>
          <FeedButton title={"Exp 1"} onclick={() => { }}/>
          <FeedButton title={"Exp 2"} onclick={() => { }}/>
          <FeedButton title={"Exp 3"} onclick={() => { }}/>
        </div>

      </div>


      <div>
        <div className={`${styles.seperator}`}></div>

        <div className={`${styles.feed_image_container}`}>
          <FeedImages />
          <FeedImages />
          <FeedImages />
          <FeedImages />
          <FeedImages />
          <FeedImages />
          <FeedImages />
        </div>
      </div>
    </section>
  )
}

export default HomeFeed;


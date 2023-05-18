import { Poppins } from 'next/font/google'

import styles from "@/styles/feed.module.scss"
import { useEffect, useState } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios'

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

const FeedImages = ({post}: {post: any}) => {
  return (
    <div className={`${styles.feed_images}`}>
      <div>
        <img
          src={post.media_url}
        />
      </div>
    </div>
  )
}

const HomeFeed = () => {
  const [posts, setPosts] = useState<any>({});
  const [page, setPage] = useState('first');
  const [listEnd, setListEnd] = useState(false)

  const fetchData = async () => {
    try {
      const resp = await axios.get(`${process.env.NEXT_PUBLIC_DB_URL}/v1/feed/${page}`)
      if (resp.data) {
        const _f = resp.data.feed

        _f.map((p: any) => {
          setPosts(( prev: any ) => ( { ...prev, [p.id]: p} ))
        });

        console.log(_f[_f.length - 1])
        if (_f[_f.length - 1]) {
          setPage(_f[_f.length - 1]['timestamp'])
        }
        else {
          setListEnd(true)
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

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
        <InfiniteScroll
          dataLength={Object.values(posts).length}
          next={fetchData}
          hasMore={!listEnd}
          loader={<p className="flex items-center justify-center">loading</p>}
          endMessage={<p></p>}
        >
          <div className={`${styles.feed_image_container}`}>
            { /* @ts-ignore */ }
            {Object.values(posts).map(( post, index ) => <FeedImages key={post.id ?? index} post={post} />)}
          </div>
        </InfiniteScroll>
      </div>
    </section>
  )
}

export default HomeFeed;


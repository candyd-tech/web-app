import { Poppins } from 'next/font/google'

import HomeFeed from '@/components/home/homeFeed'
import Nav from '@/components/nav'
import TopBar from '@/components/topBar'

import { selectUid } from '@/components/redux/reducers/user'
import { useSelector } from 'react-redux'

const inter = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: [ 'latin' ]
});

const Home = () => {
  const uid = useSelector(selectUid);

  return (
    <>
      {
        uid !== '' &&
        <main
          className={`min-h-screen pb-12 ${inter.className}`}
        >
          <Nav />
          <TopBar  title={"Feed"}/>
          { 
            // 1 === 1 ? <ComingSoon title={"Feed Feature: Coming Soon! "} content={"View and dedicate photos uploaded by individuals on various prompts, and even order them for physical redemption. Gain a categorized perspective on college memories, witnessing diverse experiences within shared spaces."} />
            // : <HomeFeed />
          }
          <HomeFeed />
        </main>
      } 
    </>
  )
}

export default Home;

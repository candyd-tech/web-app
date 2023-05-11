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
          className={`min-h-screen ${inter.className}`}
        >
          <Nav />
          <TopBar  title={"Feed"}/>
          <HomeFeed />
        </main>
      } 
    </>
  )
}

export default Home;

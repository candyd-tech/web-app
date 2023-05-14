import { Poppins } from 'next/font/google'
import { FaCamera } from 'react-icons/fa'
import { IoArrowBack } from 'react-icons/io5'
import Link from 'next/link'

import styles from "@/styles/tobBar.module.scss"
import { useRouter } from 'next/router'

const inter = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: [ 'latin' ]
})

const TopBar = ({title}: {title: string}) => {
  const router = useRouter()

  return (
    <section
      className={`${inter.className} ${styles.topbar} font-extrabold`}
    >
      <div onClick={() => router.back()}>
        <IoArrowBack size={"1.25rem"}/>
      </div>

      <div>
        <p>{title}</p>
      </div>

      <Link href="/capture">
        <FaCamera size={"1.25rem"} />
      </Link>
    </section>
  )
}

export default TopBar;



import { Poppins } from 'next/font/google'
import styles from "@/styles/tobBar.module.scss"
import { FaBell, FaCamera } from 'react-icons/fa'

const inter = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: [ 'latin' ]
})

const TopBar = ({title}: {title: string}) => {
  return (
    <section
      className={`${inter.className} ${styles.topbar} font-extrabold`}
    >
      <div>
        <FaCamera size={"1.25rem"} />
      </div>

      <div>
        <p>{title}</p>
      </div>

      <div>
        <FaBell size={"1.25rem"} />
      </div>
    </section>
  )
}

export default TopBar;



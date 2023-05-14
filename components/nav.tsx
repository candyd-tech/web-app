import Link from 'next/link';
import { FaBell, FaHome, FaPlus, FaUserAlt } from 'react-icons/fa';

import nav_styles from '@/styles/nav.module.scss'


const Nav = () => {
  return (
    <nav
      className={`${nav_styles.container}`}
    >
    <div>
      <Link className={`flex items-center justify-center`} href="/">
        <FaHome color="white" size="1.25rem" />
      </Link>

      <Link className={`flex items-center justify-center`} href="/">
        <FaHome color="white" size="1.25rem" />
      </Link>

    <div className={`${nav_styles.add_image}`}>
      <Link href="/capture">
        <FaPlus size="1.5rem" color='white' />
      </Link>
    </div>

      <Link className={`flex items-center justify-center`} href="/profile">
        <FaUserAlt color="white" size="1.25rem" />
      </Link>

      <Link className={`flex items-center justify-center`} href="/">
        <FaBell color="white" size="1.25rem" />
      </Link>
    </div>
    </nav>
  )
}

export default Nav;

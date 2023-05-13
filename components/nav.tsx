import nav_styles from '@/styles/nav.module.scss'
import Link from 'next/link';
import { FaBell, FaHome, FaPlus, FaUserAlt } from 'react-icons/fa';


const Nav = () => {
  return (
    <nav
      className={`${nav_styles.container}`}
    >
    <div>
      <Link href="/">
        <FaHome color="white" size="1.25rem" />
      </Link>

      <Link href="/">
        <FaHome color="white" size="1.25rem" />
      </Link>
    </div>

    <div className={`${nav_styles.add_image}`}>
      <Link href="/capture">
        <FaPlus size="1.5rem" color='white' />
      </Link>
    </div>

    <div>
      <Link href="/profile">
        <FaUserAlt color="white" size="1.25rem" />
      </Link>

      <Link href="/">
        <FaBell color="white" size="1.25rem" />
      </Link>
    </div>
    </nav>
  )
}

export default Nav;

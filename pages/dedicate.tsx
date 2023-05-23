import Nav from "@/components/nav";
import TopBar from "@/components/topBar";

import styles from "@/styles/dedicate.module.scss";
import { FaSearch } from "react-icons/fa";
import { Poppins } from 'next/font/google'
import ComingSoon from "@/components/soon";

const inter = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: [ 'latin' ]
})

const UserSelection = () => {
  return (
    <div>
      <div></div>
      <p className="font-semibold">Argha Chakrabarty</p>
    </div>
  )

}

const Dedicate = () => {
  return (
    <div className={`${inter.className} ${ styles.container }`}>

      <Nav />
      <TopBar title={"Dedicate"}/>
      <ComingSoon
        title="Dedications: Coming Soon!"
        content="Want to share a funny picture with your friend? Add them here! Tag your friends and finish challenges together to win fun prizes and get more prompts!<br>Coming soon!" />
    </div>
  )
}

export default Dedicate;

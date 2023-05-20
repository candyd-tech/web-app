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
      <TopBar title={"Dedicate Send"}/>
      <ComingSoon title={"Dedications: Coming Soon! "} content={"Upload and dedicate memories to friends, or explore and dedicate memories from others on the feed to preserve cherished moments forever."} />
      {/*
      <div className={styles.content}>
        <div className={`${ styles.post_content }`}>
          <div>
          </div>

          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem quae reiciendis ducimus alias nisi, magni possimus!</p>
        </div>

        <div className={`${ styles.dedicate_to }`}>
          <div>
            <div className={ `${styles.input_box}` }>
              <label className="text-lg font-semibold" htmlFor="userName">Dedicate To</label>
              <div>
                <p><FaSearch /></p>
                <input type="text" id="userName" />
              </div>
            </div>

            <div className={`${ styles.user_names }`}>
              <UserSelection />
              <UserSelection />
              <UserSelection />
              <UserSelection />
            </div>
          </div>
        </div>

      </div>*/}
    </div>
  )
}

export default Dedicate;

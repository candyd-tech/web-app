import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { useSelector } from 'react-redux'

import { selectUser } from '../redux/reducers/user'

import profile_styles from "@/styles/profile.module.scss"

const inter = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: [ 'latin' ]
})

const ProfileNumbers = ({title, amount}: {title: string, amount: number}) => {
  return (
    <div className={`${profile_styles.numbers}`}>
      <h3 className={`text-base font-bold`}>{amount}</h3>
      <p className={`text-xs`}>{title}</p>
    </div>
  )
}

const ProfileInfo = () => {
  const user = useSelector(selectUser);

  return (
    <section
      className={`${profile_styles.info} ${inter.className}`}
    >
      <div className={`${profile_styles.image_and_numbers}`}>
        <ProfileNumbers title={"Posts"} amount={user.posts.length} />

        <div className={`${profile_styles.image}`}>
          <div className={`relative`}>
            <Image
              src={"/profile.png"}
              alt={"Profile Photo"}
              fill={true}
              style={{
                objectFit: "fill",
              }}
            />
          </div>
        </div>

        <ProfileNumbers title={"Dedications"} amount={0} />
      </div>

      <div className={`${profile_styles.username_and_bio}`}>
        <h3 className={`font-extrabold`}>{user.username}</h3>
        <div className={`text-xs text-[#6C7A9C]`}>
          <p>{user.fullname}</p>
          <p>{user.bio}</p>
        </div>
      </div>
    </section>
  )
}

export default ProfileInfo;

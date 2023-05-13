import { selectUid } from '@/components/redux/reducers/user'
import { useSelector } from 'react-redux'

import styles from "@/styles/capture.module.scss"

const CreateUser = () => {
  const uid = useSelector(selectUid);
  return (
    <>{
      uid !== '' &&
      <main className={`min-h-screen ${styles.container}`}>
        {/*
          <div className={`flex`}>
            <label className={ `${styles.input_camera}` }>
              <FaCamera size="5rem" color='#5c95e3' />
              <input accept="image/*" type="file" capture="environment" />
            </label>
          </div>
      */}
      </main>
    }</>
  )
}

export default CreateUser;

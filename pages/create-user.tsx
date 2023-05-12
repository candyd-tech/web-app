import { logOut } from '@/components/firebase';
import { selectUid } from '@/components/redux/reducers/user'
import { useSelector } from 'react-redux'

const CreateUser = () => {
  const uid = useSelector(selectUid);
  return (
    <>{
      uid !== '' && <form>
      </form>
    }
    <div>profile creation</div>
    <button onClick={logOut}>sign out</button>
    </>
  )
}

export default CreateUser;

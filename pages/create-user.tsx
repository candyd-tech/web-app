import { selectUid } from '@/components/redux/reducers/user'
import { useSelector } from 'react-redux'

const CreateUser = () => {
  const uid = useSelector(selectUid);
  return (
    <>{
      uid !== '' && <form>
      </form>
    }</>
  )
}

export default CreateUser;

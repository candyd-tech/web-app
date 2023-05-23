import { Poppins } from 'next/font/google'
import { selectUid } from "@/components/redux/reducers/user";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

const inter = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: [ 'latin' ]
})

const CollectionsModal = ({post_id}: {post_id: string}) => {
  const uid = useSelector(selectUid);
  const [collections, setCollections] = useState<any[]>([]);
  const [selections, setSelections] = useState<any>({});

  const handleOnChange = (id: any) => {
    if (selections[id]) {
      setSelections(( prev: any ) => { return { ...prev, [ id ]: false }});
    } else {
      let _selec = {...selections, [id]: true}
      setSelections(_selec);
    }
  }

  const addToCollection = () => {
    Object.keys(selections).forEach(( selec: any ) => {
      if ( selections[selec] ) {
        axios.post(`${process.env.NEXT_PUBLIC_DB_URL}/v1/order/add-post`, {
          id: selec ,
          post: post_id,
          user_id: uid
        }).then((resp) => console.log(resp.data))
        .catch(err => console.error(err))
      }
    })
  }

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_DB_URL}/v1/order/collection/${uid}`)
      .then(res => setCollections(res.data.orders))
      .catch(err => console.error(err))
  }, [uid])

  return (
    <form className={ `${inter.className} flex flex-col gap-4` }>
      {
        collections.length > 0 && collections.map((col: any) => {
          return (
            <div
              onClick={e => { e.preventDefault(); handleOnChange(col.id) }}
              key={col.id}
              className="flex gap-2 items-center"
            >
              <div className={ `
                border-[1px] border-black w-[15px] h-[15px]
                ${selections[col.id] ? 'bg-blue-600' : 'bg-transparent'}` }>
              </div>
              <p className="text-xs">{col.name}</p>
            </div>
          )
        })
      }

      <button onClick={e => {
        e.preventDefault();
        console.log(selections);
        addToCollection();
      }}>Add to Collection</button>
    </form>
  )
}

export default CollectionsModal;

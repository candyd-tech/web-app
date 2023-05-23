import Nav from "@/components/nav";
import OrderForm from "@/components/order/form";
import { selectUid } from "@/components/redux/reducers/user";
import TopBar from "@/components/topBar";
import axios from "axios";
import { Poppins } from 'next/font/google'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "@/styles/order.module.scss"
import Link from "next/link";


const inter = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: [ 'latin' ]
})

export const MAX = {
  doodle: 10,
  polaroid: 1,
  book: 20,
  box_polaroid: 30
}

export const PRICES = {
  doodle: 600,
  polaroid: 300,
  book: 500,
  box_polaroid: 400
}

const IndiOrder = ({collection}: {collection: any}) => {
  return (
    <Link href={`/order/${collection.id}`} className={ `flex min-h-[10rem] border-[1px] rounded-md border-black gap-2` }
    >
      <div className="flex-1 flex flex-col items-start justify-between p-4">
        <div>
          <h3 className="font-bold text-[#5c95e3]">{collection.name}</h3>
          <p className="text-sm">Type: {collection.type}</p>
          {/* @ts-ignore */}
          <p className="text-sm">Items: {collection.posts.length} / {MAX[collection.type]} </p>
        </div>

        <div className="flex justify-between items-center w-full">
          {/* @ts-ignore */}
          <p className="text-sm">Price: ₹{PRICES[collection.type]}</p>
        </div>
      </div>
    </Link>
  )
}

const Order = () => {
  const uid = useSelector(selectUid);
  const [collections, setCollections] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_DB_URL}/v1/order/collection/${uid}`)
      .then(res => setCollections(res.data.orders))
      .catch(err => console.error(err))
    console.log(collections)
  }, [uid])

  return (
    <div className="min-h-screen mb-20">
      <Nav />
      <TopBar title={"Your Orders"}/>


      <div className={ `${inter.className} px-4 py-4 flex flex-col gap-4` }>
        <OrderForm
          uid={uid}
          collections={collections}
          setCollections={setCollections} />

        <div className={`${styles.collections}`}>
        { uid !== '' &&
          <>
            {collections.length > 0 ?  collections.map(col => {
              return (
                <IndiOrder key={col.id} collection={col} />
              )
            }) : <div>Add some orders!</div>
            }
          </>
        }</div>
      </div>
    </div>
  )
}

export default Order;

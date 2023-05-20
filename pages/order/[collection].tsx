import { Poppins } from 'next/font/google'
import Nav from "@/components/nav";
import { resize } from "@/components/resize";
import TopBar from "@/components/topBar";
import axios from "axios";
import { useRouter } from "next/router";
import { Dispatch, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

const inter = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: [ 'latin' ]
});

const CollectionPost = ({post_id, collection_id, setCollection}: {setCollection: Dispatch<any>, post_id: string, collection_id: string}) => {
  const [post, setPost] = useState<any>({});
  const [media, setMedia] = useState<any>(undefined);

  const deleteOrder = () => {
    console.log(post.id, post.user_id, collection_id)
    axios.post(`${process.env.NEXT_PUBLIC_DB_URL}/v1/order/delete-post`, {
      post: post.id,
      user_id: post.user_id,
      id: collection_id
    })
      .then(res => {
        console.log(res)
        axios.get(`${process.env.NEXT_PUBLIC_DB_URL}/v1/order/order/${collection_id}`)
          .then(r => setCollection(r.data))
          .catch(err => console.error(err))
      })
        .catch(err => console.error(err))
  }

  useEffect(() => {
    post_id && axios.get(`${process.env.NEXT_PUBLIC_DB_URL}/v1/post/${post_id}`)
      .then(res => {
        setPost(res.data);
        axios.get(`${process.env.NEXT_PUBLIC_DB_URL}/v1/media/${res.data.medias[0]}`)
          .then(r => { setMedia(r.data); console.log(media, r.data) })
          .catch(err => console.error(err))
      })
      .catch(err => console.error(err))
  }, [post_id])

  return (
    <div className={ `flex min-h-[10rem] border-[1px] rounded-md border-black gap-2` }
    >
      <div className="flex-1">
        {media && 
          <img className="w-[20rem] h-[10rem] object-cover" src={resize(media.compressed_url, "w_300")} alt="" />
        }
      </div>

      <div className="flex-1 flex flex-col items-start justify-between p-4">
        <div>
          <h3 className="font-bold text-[#5c95e3]">{post.caption}</h3>
        </div>

        <div className="flex justify-between items-center w-full">
          <button 
            onClick={deleteOrder}
            className="px-4 py-2 text-white rounded-md bg-[#5c95e3]">
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  )
}

const Collection = () => {
  const router = useRouter();
  const [collection, setCollection] = useState<any>(undefined);

  useEffect(() => {
    router.query.collection && axios.get(`${process.env.NEXT_PUBLIC_DB_URL}/v1/order/order/${router.query.collection}`)
      .then(res => {setCollection(res.data); console.log(res.data)})
      .catch(err => console.error(err))
  }, [router.query.collection])

  return (
    <div className={ `${inter.className} min-h-screen mb-20` }>
      <Nav />
      <TopBar title={"Your Orders"}/>

      <div className="px-6 flex flex-col gap-4">
      { collection && <>
        <h3 className="text-xl font-bold">{collection.name}</h3>
          {collection.for_someone_else && <div>
          <p className="font-semibold">Ordered For: </p>
          {collection.else_name.map(( n: any ) => {
            return (
              <p key={n}> - {n}</p>
            )
          })}</div>}
        {
          collection.posts.map(
            (post_id: any) => <CollectionPost
              key={post_id}
              setCollection={setCollection}
              collection_id={collection.id}
              post_id={post_id} />
          )
        }
      </> }
      </div>
    </div>
  )
}

export default Collection;

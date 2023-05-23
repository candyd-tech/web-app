import { Dispatch, SetStateAction, useState } from "react";
import styles from "@/styles/order.module.scss"
import axios from "axios";
import { FaPlus } from "react-icons/fa";

const OrderForm = ({uid, setCollections}:
  {uid: string, collections: any[], setCollections: Dispatch<SetStateAction<any[]>>}) => {
  const [openExtension, setOpenExtension] = useState(false);
  const [nameOfCollection, setNameOfCollection] = useState("");
  const [typeOfCollection, setTypeOfCollection] = useState<
    "book" | "polaroid" | "doodle" | "box_polaroid">("polaroid")
  const [forMe, setForMe] = useState(false)
  const [forSomeoneElse, setForSomeoneElse] = useState(false)
  const [peopleName, setPeopleName] = useState<string[]>([])
  const [nameInput, setNameInput] = useState("")

  const createCollection = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    user_id: string,
    name: string
  ) => {
    e.preventDefault();

    axios.post(`${process.env.NEXT_PUBLIC_DB_URL}/v1/order/new-collection`, {
      name: name !== "" ? name : "Collection",
      user_id,
      status: "waiting",
      type: typeOfCollection,
      for_me: forMe,
      for_someone_else: forSomeoneElse,
      else_name: peopleName,
      posts: [],
    })
      .then(res => {
        console.log(res.data)

        axios.get(`${process.env.NEXT_PUBLIC_DB_URL}/v1/order/collection/${uid}`)
          .then(r => setCollections(r.data.orders))

        setTypeOfCollection("polaroid");
        setNameOfCollection("");
        setOpenExtension(false);
        setForSomeoneElse(false);
        setForMe(false);
        setPeopleName([]);
      })
      .catch(err => console.error(err))
  }

  return (
    <div 
      className={ `flex flex-col items-center justify-center
        ${styles.order_create_container}
        rounded-lg rounded-b-none gap-2 border-[2px] border-[#5c95e3]` }
    >
      <button 
        className={ `bg-[#5c95e3] py-1
          rounded-b-none gap-2 w-full` }
        onClick={() => setOpenExtension(prev => !prev)}
      >
        Create New Collection
      </button>

      <div className={
        `${styles.create_order}
         ${openExtension && styles.create_active}`
      }>
       {
         openExtension && <form className="flex flex-col w-full gap-4">
           <label>
             <p>Name of the Collection</p>
             <input
               type="text"
               value={nameOfCollection}
               onChange={(e) => setNameOfCollection(e.target.value)}
             />
           </label>

           <div className={`${styles.order_type}`}>
             <p className="font-semibold">Order Type</p>

             <label>
               <input
                 type="radio"
                 onChange={() => setTypeOfCollection("box_polaroid")}
                 checked={typeOfCollection === "box_polaroid"} />
               <p className="text-sm"> Polaroid Frame [Price - 250] [9 Posts] </p>
             </label>

             <label>
               <input
                 type="radio"
                 className="text-sm"
                 onChange={() => setTypeOfCollection("polaroid")}
                 checked={typeOfCollection === "polaroid"} />
               <p className="text-sm"> Canvas [Price - 200] [1 Post] </p>
             </label>

             <label>
               <input
                 type="radio"
                 className="text-sm"
                 onChange={() => setTypeOfCollection("doodle")}
                 checked={typeOfCollection === "doodle"} />
               <p className="text-sm"> Doodle Frame [Price - 450] [10 Posts] </p>
             </label>

             <label>
               <input
                 type="radio"
                 className="text-sm"
                 onChange={() => setTypeOfCollection("book")}
                 checked={typeOfCollection === "book"} />
               <p className="text-sm"> Memory Book [Price - 300] [20 Posts] </p>
             </label>
           </div>

           <div>
             <p className="font-semibold">Order For</p>

             <div onClick={() => setForMe(val => !val)} className="flex items-center gap-2">
               <div className={ `${forMe ? "bg-blue-600" : "bg-transparent"} w-[15px] h-[15px] border-black border-[1px] rounded-sm` }></div>
               <p>Myself</p>
             </div>

             <div onClick={() => setForSomeoneElse(val => !val)} className="flex items-center gap-2">
               <div className={ `${forSomeoneElse ? "bg-blue-600" : "bg-transparent"} w-[15px] h-[15px] border-black border-[1px] rounded-sm` }></div>
               <p>For Someone else</p>
             </div>


             {forSomeoneElse && <div className="pt-4">
               <label className="w-full">
                 Name of the person:
                 <div className="w-full flex items-center justify-between">
                   <input
                     className="border-t-0 border-l-0 border-r-0 border-b-black border-[1px]"
                     value={nameInput}
                     onChange={e => setNameInput(e.target.value)}
                     type="text" />
                   <button onClick={e => {
                     e.preventDefault();
                     setPeopleName(prev => [...prev, nameInput]);
                     setNameInput("")
                   }} className=""> <FaPlus /> </button>
                 </div>
               </label>
               <ul className="pt-4"> {peopleName.map(n => {
                 return <li key={n}> - {n}</li>
               })}</ul>
             </div>}
           </div>

           <button
             onClick={e => createCollection(e, uid, nameOfCollection)}
           > Create </button>
         </form>
       }
      </div>
    </div>
  )
}

export default OrderForm;

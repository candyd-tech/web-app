import Nav from "@/components/nav";
import TopBar from "@/components/topBar";
import { Poppins } from 'next/font/google'


const inter = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: [ 'latin' ]
})


const IndiOrder = () => {
  return (
    <div className={ `${inter.className} flex min-h-[10rem] border-[1px] rounded-md border-black gap-2` }
    >
      <div className="flex-1"></div>
      <div className="flex-1 flex flex-col items-start justify-between py-2 px-4">
        <div>
          <h3 className="font-bold text-[#5c95e3]">A very very very very large Caption</h3>
          <p>User Name</p>
        </div>

        <div className="flex justify-between items-center w-full">
          <p>Price</p>
          <button className="px-6 py-[2px] text-white rounded-md bg-[#5c95e3]">Buy</button>
        </div>
      </div>
    </div>
  )
}

const Order = () => {
  return (
    <div>
      <Nav />
      <TopBar title={"Orders"}/>
      <div className="flex flex-col gap-4 px-4 py-4">
        <IndiOrder />
        <IndiOrder />
        <IndiOrder />
        <IndiOrder />
      </div>
    </div>
  )
}

export default Order;

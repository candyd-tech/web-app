import Nav from "@/components/nav";
import ComingSoon from "@/components/soon";
import TopBar from "@/components/topBar";

const Order = () => {
  return (
    <div>
      <Nav />
      <TopBar title={"Orders"}/>
      <ComingSoon title={"Memory Mementos: Coming Soon!"} content="Experience our physical redemption feature! Redeem your uploads and dedications in various formats such as polaroids, doodle frames, and memory books, turning your college memories with friends into cherished tangible keepsakes." />
    </div>
  )
}

export default Order;

import Nav from "@/components/nav";
import TopBar from "@/components/topBar";
import ComingSoon from "@/components/soon";

const Dedicate = () => {
  return (
    <div>
      <Nav />
      <TopBar title={"Dedicate"}/>
      <ComingSoon
        title="Dedications: Coming Soon!"
        content="Want to share a funny picture with your friend? Add them here! Tag your friends and finish challenges together to win fun prizes and get more prompts!<br>Coming soon!" />
    </div>
  )
}

export default Dedicate;

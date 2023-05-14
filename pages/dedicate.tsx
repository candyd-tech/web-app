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
        content="View and dedicate photos uploaded by individuals on various prompts, and even order them for physical redemption. Gain a categorized perspective on college memories, witnessing diverse experiences within shared spaces." />
    </div>
  )
}

export default Dedicate;

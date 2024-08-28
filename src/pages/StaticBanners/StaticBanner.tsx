import { useSelector } from "react-redux";
import { Accordion, Cards } from "../../component";
import StatickGif from "../../component/StatickGif/StatickGif";
import { TopbarStatic } from "../../component/TopbarStatic/TopbarStatic";
import arrAccord from './AccordDataStatic'
import { getGifGenerated } from "../../providers/StoreProvider/selectors/getGifGenerated";

const StaticBanners = () => {

  const statick = useSelector(getGifGenerated)

  return (
    <>
      <TopbarStatic />
      <StatickGif gif={statick} />
      <Accordion arrAccord={arrAccord} />
      <Cards />
    </>
  );
};

export default StaticBanners

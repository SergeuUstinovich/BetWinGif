import { useSelector } from "react-redux";
import { Topbar, Accordion, Cards } from "../../component";
import arrAccord from './AccordDataGif'
import { getGifGen } from "../../providers/StoreProvider/selectors/getGifGen";
import StatickGif from "../../component/StatickGif/StatickGif";

const GifBanners = () => {

  const gifGen = useSelector(getGifGen)

  return (
    <>
      <Topbar />
      <StatickGif url={gifGen} />
      <Accordion arrAccord={arrAccord} />
      <Cards />
    </>
  );
};

export default GifBanners

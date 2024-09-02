import { useSelector } from "react-redux";
import { Topbar, Accordion, Cards } from "../../component";
import arrAccord from './AccordDataGif'
import { getGifGen } from "../../providers/StoreProvider/selectors/getGifGen";
import GifRequest from "../../component/GifRequest/GifRequest";

const GifBanners = () => {

  const gifGen = useSelector(getGifGen)

  return (
    <>
      <Topbar />
      <GifRequest svgContent={gifGen.svgContent} text={gifGen.text} />
      <Accordion arrAccord={arrAccord} />
      <Cards />
    </>
  );
};

export default GifBanners

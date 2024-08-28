import { useSelector } from "react-redux";
import { Topbar, Accordion, Cards, AddIntegrations } from "../../component";
import GitRequest from "../../component/GifRequest/GitRequest";
import arrAccord from './AccordDataGif'
import { getGifGen } from "../../providers/StoreProvider/selectors/getGifGen";

const GifBanners = () => {

  const gifGen = useSelector(getGifGen)

  return (
    <>
      <Topbar />
      <GitRequest svgContent={gifGen.svgContent} text={gifGen.text} />
      <Accordion arrAccord={arrAccord} />
      <Cards />
    </>
  );
};

export default GifBanners

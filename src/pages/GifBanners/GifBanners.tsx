import { Topbar, Accordion, Cards } from "../../component";
import { GifCards } from "../../component/GifCards/GifCards";
import arrAccord from './AccordDataGif'

const GifBanners = () => {
  return (
    <>
      <Topbar />
      <GifCards />
      <Accordion arrAccord={arrAccord} />
      <Cards />
    </>
  );
};

export default GifBanners

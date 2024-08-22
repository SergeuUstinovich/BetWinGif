import { Topbar, Accordion, Cards } from "../../component";
import { GifCards } from "../../component/GifCards/GifCards";
import arrAccord from './AccordDataGif'

export const GifBanners = () => {
  return (
    <>
      <Topbar />
      <GifCards />
      <Accordion arrAccord={arrAccord} />
      <Cards />
    </>
  );
};

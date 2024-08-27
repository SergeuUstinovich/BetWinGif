import { Accordion, AddIntegrations, Cards, Topbar } from "../../component";
import arrAccord from './AccordDataStatic'

const StaticBanners = () => {
  return (
    <>
      <Topbar />
      <AddIntegrations />
      <Accordion arrAccord={arrAccord} />
      <Cards />
    </>
  );
};

export default StaticBanners

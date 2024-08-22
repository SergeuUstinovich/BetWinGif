import { Accordion, AddIntegrations, Cards, Topbar } from "../../component";
import arrAccord from './AccordDataStatic'

export const StaticBanners = () => {
  return (
    <>
      <Topbar />
      <AddIntegrations />
      <Accordion arrAccord={arrAccord} />
      <Cards />
    </>
  );
};

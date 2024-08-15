import { Accordion, SideBar } from "../../ui";
import { Topbar } from "../../component/Topbar";

function Layout() {
  return (
    <>
      <div className="flex">
        <SideBar />
        <div>
          <Topbar />
          <Accordion />
        </div>
      </div>
    </>
  );
}

export default Layout;

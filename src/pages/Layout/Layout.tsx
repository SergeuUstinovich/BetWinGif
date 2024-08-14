import { Accordion, SideBar, HorizontalBar } from "../../ui";
import AuthForm from "../AuthForm/AuthForm";
import style from "./Layout.module.scss";

function Layout() {
  return (
    <>
      <div className="flex">
        <SideBar />
        <div>
          <HorizontalBar />
          <Accordion />
        </div>
      </div>
    </>
  );
}

export default Layout;

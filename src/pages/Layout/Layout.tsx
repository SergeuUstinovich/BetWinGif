<<<<<<< Updated upstream
import { Accordion, SideBar, HorizontalBar } from "../../ui";
import AuthForm from "../AuthForm/AuthForm";
import style from "./Layout.module.scss";
=======
import { Accordion, SideBar } from '../../ui'
import { Topbar } from '../../component/Topbar'
>>>>>>> Stashed changes

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
  )
}

export default Layout

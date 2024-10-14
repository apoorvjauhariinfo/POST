import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

export default function RootLayout() {
  return (
    <SideBar>
      <Outlet />
    </SideBar>
  );
}

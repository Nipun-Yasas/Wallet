import React, { useContext } from "react";

import { UserContext } from "../../context/UserContext";
import NavBar from "./NavBar";
import SideMenu from "./SideMenu";

export default function DashboardLayout({ children, activeMenu }) {
  const { user } = useContext(UserContext);
  return (
    <div className="">
      <NavBar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          <div className="max-[1080px]:hiddem">
            <SideMenu activeMenu={activeMenu} />
          </div>

          <div className="grow mx-5">{children}</div>
          
        </div>
      )}
    </div>
  );
}

import React from 'react'

import { SIDE_MENU_DATA } from '../../utils/data'

import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

export default function SideMenu({activeMenu}) {

  const {user,clearUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route); 
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  }

  return (
    <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20'>
      <div className="flex flex-col item-center justify-center gap-3 mt-3 mb-7">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl || ""}
            alt="Profile image"
            className='w-20 h-20 bg-slate-400 rounded-full'
          />):<></>}

          <h5 className='text-gray-950 font-medium leading-6'>
            {user?.fullname || ""}
          </h5>
      </div>

      {SIDE_MENU_DATA.map((item,index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${
            activeMenu === item.label ? "text-white bg-(color:--primary)" :""
          }py-2 px-3 rounded-md`}
           onClick={() => handleClick(item.path)}
        >
          <item.icon className='text-xl'/>
        {item.label}
      </button>
      ))};
      
  </div>
  )
}

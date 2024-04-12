import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { RiSettings4Line } from "react-icons/ri";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FaX } from "react-icons/fa6";
import Control from './../../assets/control.png'


export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const Menus = [
    { title: "Dashboard", link: "/dashboard", icon: AiOutlineUser },
    { title: "Usuarios", link: "/usuarios", icon: AiOutlineUser },
    { title: "Fincas", link: "/fincas", icon: AiOutlineHeart, gap: true },
    { title: "Variedades", link: "/variedades", icon: AiOutlineHeart, gap: true },
    { title: "Lotes", link: "/lotes", icon: RiSettings4Line },
    { title: "Muestras", link: "/muestras", icon: RiSettings4Line},
    { title: "Análisis", link: "/analisis", icon: RiSettings4Line},
    { title: "Variables", link: "/variables", icon: RiSettings4Line},
    { title: "Resultados", link: "/resultados", icon: RiSettings4Line}
];

  return (
    <>
      <div className="flex min-h-screen z-10">
        <div
          className={`${open ? "w-64" : "w-20"
            } bg-[#39A900] max-h-full p-5 pt-5 h-full duration-300 fixed`}
        >
          <img
            src={Control}
            className={`absolute cursor-pointer -right-3 mt-11 w-7 border-dark-purple
                border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          {<div className={`flex items-center`}>
            <FaX img="isotipo-SubCoffee.png" className={`${open && "rotate-[360deg]"}`} />
            <FaX to="/subcoffee" color="cafeClaroLogo" text="Sub" className={`${!open && "scale-0"}`} />
            <FaX to="/subcoffee" color="cafeOscuroLogo" text="Coffee" className={`${!open && "scale-0"}`} />
          </div>}
          <ul className="pt-6">
            {Menus.map((Menu, index) => (
              <Link
                to={Menu?.link}
                key={index}
                onClick={() => setActiveLink(Menu.link)}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-green-500 text-gray-300 text-sm items-center gap-x-4 ${Menu.gap ? "mt-9" : "mt-2"
                  } ${activeLink === Menu.link ? "bg-green-500" : ""}`}
              >
                <div>{React.createElement(Menu?.icon, { size: "20" })}</div>
                <span
                  className={`${!open && "hidden"}
                         origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </Link>
            ))}
          </ul>
          <div className="flex justify-center items-center my-5 sm:hidden">
          
          </div>
        </div>
      </div>
    </>
  );
};

import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { RiSettings4Line, RiPlantFill } from "react-icons/ri";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { MdDashboard, MdOutlineCoffeeMaker } from "react-icons/md";
import { GiCoffeeCup, GiFarmTractor } from "react-icons/gi";
import { BiSolidCoffeeBean } from "react-icons/bi";
import { IoIosPaper } from "react-icons/io";
import { BsCardChecklist } from "react-icons/bs";
import { FaX } from "react-icons/fa6";
import Control from './../../assets/control.png'


export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const stored = localStorage.getItem('user')
  const user = stored ? JSON.parse(stored) : null

  const Menus = [
    { title: "Dashboard", link: "/dashboard", icon: MdDashboard },
    { title: "Usuarios", link: "/usuarios", icon: AiOutlineUser },
    { title: "Fincas", link: "/fincas", icon: GiFarmTractor, gap: true },
    { title: "Variedades", link: "/variedades", icon: GiCoffeeCup, gap: true },
    { title: "Lotes", link: "/lotes", icon: RiPlantFill },
    { title: "Muestras", link: "/muestras", icon: BiSolidCoffeeBean},
    { title: "Análisis", link: "/analisis", icon: MdOutlineCoffeeMaker},
    { title: "Variables", link: "/variables", icon: IoIosPaper},
    { title: "Resultados", link: "/resultados", icon: BsCardChecklist}
];
const MenusCatador = [
  { title: "Dashboard", link: "/dashboard", icon: MdDashboard },
  { title: "Fincas", link: "/fincas", icon: GiFarmTractor, gap: true },
  { title: "Variedades", link: "/variedades", icon: GiCoffeeCup, gap: true },
  { title: "Lotes", link: "/lotes", icon: RiPlantFill },
  { title: "Muestras", link: "/muestras", icon: BiSolidCoffeeBean},
  { title: "Análisis", link: "/analisis", icon: MdOutlineCoffeeMaker},
  { title: "Variables", link: "/variables", icon: IoIosPaper},
  { title: "Resultados", link: "/resultados", icon: BsCardChecklist}
];

  return (
    <>
      <div className="flex min-h-screen z-10">
        <div
          className={`${open ? "w-64" : "w-20"
            } bg-[#336699]/75 max-h-full p-5 pt-5 h-full fixed duration-300`}
        >
          <img
            src={Control}
            className={`absolute cursor-pointer -right-3 mt-11 w-7 border-dark-purple
                border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <div className={`flex items-center`}>
            <FaX img="isotipo-SubCoffee.png" className={`${open && "rotate-[360deg]"}`} />
           {/*  <FaX to="/subcoffee" color="cafeClaroLogo" text="Sub" className={`${!open && "scale-0"}`} />
            <FaX to="/subcoffee" color="cafeOscuroLogo" text="Coffee" className={`${!open && "scale-0"}`} /> */}
          </div>
          <ul className="pt-6">
            { user.tipo_usuario == 'admin' ? Menus.map((Menu, index) => (
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
            )) : MenusCatador.map((Menu, index) => (
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

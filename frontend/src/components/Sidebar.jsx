import React, { useState } from 'react'
import { IoMdHome } from "react-icons/io";
import { MdFindInPage, MdAssignmentAdd } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
import { FaAlignJustify } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FaX } from "react-icons/fa6";
import { IconContext } from 'react-icons';
import './../App.css'


export const Sidebar = ({ children }) => {

    const [sidebar, setSiderBar] = useState(false)

    const showSideBar = () => setSiderBar(!sidebar)

    const menuItem = [
        {
            path: '/',
            name: "Dashboard",
            icon: <IoMdHome />
        },
        {
            path: '/usuarios',
            name: "Usuarios",
            icon: <MdAssignmentAdd />
        },
        {
            path: '/fincas',
            name: 'Fincas',
            icon: <GrDocumentUpdate />
        },
        {
            path: '/variedades',
            name: 'Variedades',
            icon: <GrDocumentUpdate />
        },
        {
            path: '/lotes',
            name: 'Lotes',
            icon: <GrDocumentUpdate />
        },
        {
            path: '/muestras',
            name: 'Muestras',
            icon: <GrDocumentUpdate />
        },
        {
            path: '/analisis',
            name: "Analisis",
            icon: <MdFindInPage />
        },
        {
            path: '/variables',
            name: 'Variables',
            icon: <GrDocumentUpdate />
        },
        {
            path: '/resultados',
            name: 'Resultados',
            icon: <GrDocumentUpdate />
        }

    ]
  return (
    <div>
        
        <div className='bg-[#39A900] h-20 flex justify-start items-center'>
            <Link to='#'>
                <FaAlignJustify size={30} className="ml-3 cursor-pointer" onClick={showSideBar}/>
            </Link>
        </div>
        <IconContext.Provider value={{ color: '#000' }}>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='w-full mt-14' onClick={showSideBar}>
                <li className='ml-8 text-3xl bg-none'>
                    <Link to='#'>
                        <FaX />
                    </Link>
                </li>
                {menuItem.map((item, index) => {
                    return(
                        <li className='flex justify-start align-center mt-5 list-none h-14 hover:bg-[#469C00] rounded-lg' key={index}>
                            <Link className='flex text-white text-xl w-full h-full items-center px-4 rounded-lg' to={item.path}>
                                {item.icon}
                                {item.name}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
        </IconContext.Provider>
    </div>
  )
}

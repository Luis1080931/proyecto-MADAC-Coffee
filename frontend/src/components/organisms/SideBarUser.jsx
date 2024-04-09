import React, { useState } from 'react'
import { IoMdHome } from "react-icons/io";
import { MdFindInPage, MdAssignmentAdd } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaX } from "react-icons/fa6";
import { IconContext } from 'react-icons';
import { FaRegUserCircle } from "react-icons/fa";
import './../../App.css'
import LogoutModal from './ModalLogout.jsx';


export const SideBarUser = ({ children }) => {

    const [sidebar, setSiderBar] = useState(false)
    const [modalOpen, setModalOpen ] = useState(false)

    const showSideBar = () => setSiderBar(!sidebar)

    const menuItem = [
        {
            path: '/editar',
            name: "Actualizar datos",
            icon: <IoMdHome />
        },
        {
            onClick: () => setModalOpen(true),
            name: "Cerrar sesión",
            icon: <MdAssignmentAdd />
        }

    ]
  return (
    <div>
        <LogoutModal 
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
        />
        <div className='bg-[#39A900] h-20 flex justify-end items-center'>
            <Link to='#'>
                <FaRegUserCircle size={40} className="cursor-pointer mr-8" onClick={showSideBar}/>
            </Link>
        </div>
        <IconContext.Provider value={{ color: '#000' }}>
        <nav className={sidebar ? 'nav-menu-user active' : 'nav-menu-user'}>
            <ul className='w-full mt-7' onClick={showSideBar}>
                <li className='mr-9 flex justify-end text-3xl bg-none'>
                    <Link to='#'>
                       { <FaX />}
                    </Link>
                </li>
                {menuItem.map((item, index) => {
                    return(
                        <li className='flex justify-end align-center mt-4 mb-2 list-none max-h-30vh hover:bg-[#469C00] rounded-lg p-2' key={index}>
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

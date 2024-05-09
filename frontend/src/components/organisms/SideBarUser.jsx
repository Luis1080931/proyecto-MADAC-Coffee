import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaX } from "react-icons/fa6";
import { IconContext } from 'react-icons';
import { FaRegUserCircle } from "react-icons/fa";
import './../../App.css'
import LogoutModal from './ModalLogout.jsx';
import ProfileModal from './ModalProfile.jsx';
import { CiUser } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";

export const SideBarUser = ({ children }) => {

    const [sidebar, setSiderBar] = useState(false)
    const [modalOpen, setModalOpen ] = useState(false)
    const [modalUser, setModalUser] = useState(false)

    const showSideBar = () => setSiderBar(!sidebar)

  return (
    <div>
        <LogoutModal 
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
        />
        <ProfileModal 
            isOpen={modalUser}
            onClose={() => setModalUser(false)}
        />
        <div className='h-20 flex justify-end items-center'>
            <Link to='#'>
                <FaRegUserCircle size={40} className="cursor-pointer mr-8" onClick={showSideBar}/>
            </Link>
        </div>
        <IconContext.Provider value={{ color: '#000' }}>
        <nav className={sidebar ? 'nav-menu-user active' : 'nav-menu-user'}>
            <ul className='w-full mt-6 flex flex-col justify-center p-2' onClick={showSideBar}>
                <li className='mr-7 flex justify-end text-3xl bg-none'>
                    <Link to='#'>
                       { <FaX />}
                    </Link>
                </li>
               
                <li className='flex justify-end align-center mt-4 mb-2 list-none max-h-30vh bg-[#D9E4EC] hover:bg-[#97BCC7] rounded-lg p-2'>
                    <CiUser className='text-3xl text-black font-bold' />
                    <label className='flex text-black text-xl font-bold w-full h-full items-center px-4 rounded-lg cursor-pointer' onClick={() => setModalUser(true)}>
                        Perfil de usuario
                    </label>
                </li>
                <li className='flex justify-end align-center mt-4 mb-2 list-none max-h-30vh bg-[#D9E4EC] hover:bg-[#97BCC7] rounded-lg p-2'>
                    <IoLogOutOutline className='text-3xl text-black font-bold' />
                    <label className='flex text-black text-xl font-bold w-full h-full items-center px-4 rounded-lg cursor-pointer' onClick={() => setModalOpen(true)}>
                        Cerrar sesión
                    </label>
                </li>
            </ul>
        </nav>
        </IconContext.Provider>
    </div>
  )
}

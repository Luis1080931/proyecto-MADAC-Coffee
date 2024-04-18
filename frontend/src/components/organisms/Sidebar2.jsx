import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '../molecules/MenuItem';
import Icon from '../atoms/Icon';



function Sidebar2() {

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Función para cerrar el sidebar cuando se hace clic en un enlace
    const closeSidebar = () => {
        setMenuOpen(false);
    };


    return (
        <>
            <nav className={`w-[300px] lg:relative z-20 fixed lg:left-0 h-screen border-r border-white transition-transform duration-500 lg:translate-x-0 ease-in-out ${menuOpen ? 'translate-x-0' : '-translate-x-[300px]'}`} style={{ backgroundImage: 'url("fondo2.jpg")', backgroundSize: 'cover', backgroundColor: 'rgba(0, 128, 0, 0.6)' }}>
                <div className='lg:hidden absolute -right-10 top-5 text-3xl' onClick={toggleMenu}>
                    <Icon name="menu-outline" />
                </div>
                <div className='bg-[#336699]/75 h-screen'>
                    <div className='absolute w-full h-full bg-black opacity-30 -z-10'></div>
                    <div className='w-full h-16 flex items-center justify-center border-b px-3 border-white font-medium text-lg'>
                        <span className='uppercase text-gray-200 text-xl scale-110 font-black'>MADAC COFFEE</span>
                    </div>

                    <div className='mt-5 uppercase px-3 font-semibold cursor-pointer'>
                        <ul>
                            <MenuItem icon="home-outline" text="Dashboard" onClick={closeSidebar} />
                            <MenuItem icon="people-circle-outline" text="Usuarios" onClick={closeSidebar} />
                            <MenuItem icon="albums-outline" text="Fincas" onClick={closeSidebar} />
                            <MenuItem icon="bag-remove-outline" text="Variedades" url="/variedades" onClick={closeSidebar} />
                            <MenuItem icon="bag-remove-outline" text="Lotes" onClick={closeSidebar} />
                            <MenuItem icon="expand-outline" text="Muestras" onClick={closeSidebar} />
                            <MenuItem icon="albums-outline" text="Analisis" url="/analisis" onClick={closeSidebar} />
                            <MenuItem icon="albums-outline" text="Variables" onClick={closeSidebar} />
                            <MenuItem icon="albums-outline" text="Resultados" onClick={closeSidebar} />
                        </ul>
                    </div>

                    <div>
                        <img src="logo.png" alt="" className='w-[50%] absolute bottom-20 left-16 m-auto mt-8' />
                    </div>

                    <div className='absolute bottom-2 left-0 right-0 text-center uppercase text-white text-sm border-b '>
                        <span>
                            Copyright Maria Dev
                        </span>
                    </div>
                </div>

            </nav>
        </>
    )
}

export default Sidebar2
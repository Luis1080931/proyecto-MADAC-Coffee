import React, { useState, useEffect } from 'react';
import { FaAlignJustify, FaAngleLeft, FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { RxDotFilled } from 'react-icons/rx';
import { Sidebar } from './../organisms/Sidebar.jsx';
import { SideBarUser } from './../organisms/SideBarUser.jsx';

export const Dashboard = () => {
  const slides = [
    {
      url: 'https://diariodelhuila.com/wp-content/uploads/Foto-4-ENCC-jpg.webp'
    },
    {
      url: 'https://lavozdelaregion.co/wp-content/uploads/2023/09/ENCC-Pitalito.jpg'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastIndex = currentIndex === slides.length - 1;
    const newIndex = isLastIndex ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const gotoNextSlide = (id) => {
    setCurrentIndex(id);
  };

  const startAutoSlide = () => {
    const id = setInterval(() => {
      nextSlide();
    }, 3000); 
    setIntervalId(id);
  };

  const stopAutoSlide = () => {
    clearInterval(intervalId);
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      stopAutoSlide();
    };
  }, [currentIndex]); 

  const stored = localStorage.getItem('user');
  const user = stored ? JSON.parse(stored) : null;

  return (
    <div>
      <div className="bg-[#B7CFDC] w-full h-20 flex">
        <Sidebar />
        <h2 className="text-black text-2xl font-bold ml-auto mr-10 flex items-end justify-center flex-col">
          Bienvenido {user.nombre}
          <label className='text-lg flex justify-end items-end'> {user.tipo_usuario} </label>
        </h2>
        <SideBarUser />
      </div>
      <div className="max-w-[85%] h-[780px] w-full left-10 m-auto py-16 px-4 relative group">
        <div
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          className="w-full h-full bg-center bg-cover duration-500"
        ></div>
        <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl text-bold rounded-full p-2 bg-black/20 text-white cursor-pointer hidden group-hover:block">
          <FaAnglesLeft onClick={prevSlide} size={33} />
        </div>
        <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl text-bold rounded-full p-2 bg-black/20 text-white cursor-pointer hidden group-hover:block">
          <FaAnglesRight onClick={nextSlide} size={33} />
        </div>
        <div className="flex justify-center items-center py-2 top-4">
          {slides.map((slide, index) => (
            <div key={index} onClick={() => gotoNextSlide(index)}>
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

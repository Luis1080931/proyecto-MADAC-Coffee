import React, { useState, useEffect } from 'react';
import { FaAlignJustify, FaAngleLeft, FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { RxDotFilled } from 'react-icons/rx';
import { Sidebar } from './../organisms/Sidebar.jsx';
import { SideBarUser } from './../organisms/SideBarUser.jsx';
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import  AnalisisCalificados from '../organisms/TableCalificados.jsx';
import AnalisisFisicosChart from '../organisms/Estadisticas.jsx';
import { Header } from '../molecules/Header.jsx';

export const Dashboard = () => {

  return(
    <div className='bg-[#EAEDF6] h-screen max-h-max'>
    <Header title="Resultado de los análisis sensoriales" />
      <div className='bg-[#EAEDF6]'>
        <div className='w-full max-w-[90%] ml-28 items-center p-10 flex-auto'>

          <div className="flex flex-col px-10 gap-x-4 pt-8 w-full bg-[#EAEDF6]">
            <Tabs aria-label="Options" variant="bordered" >
              <Tab key="departamentos" title="Análisis calificados">
                <Card className=" ">
                  <CardBody>
                    <AnalisisCalificados />
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="municipios" title="Estadísticas">
                <Card className=" ">
                  <CardBody>
                    <AnalisisFisicosChart />
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>
          </div>
        
            
            
        </div>

      </div>
</div>
  )
  /* const slides = [
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
      <div className="bg-[#273468] w-full h-20 flex">
        <Sidebar />
        <h2 className="text-white text-2xl font-bold ml-auto mr-10 flex items-end justify-center flex-col">
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
  ); */
};

import React, { useState } from 'react'
import { FaAlignJustify } from "react-icons/fa6";
import ImgBody from './../assets/imagenSliderEjemplo.jpg'
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { RxDotFilled } from 'react-icons/rx';
import { Sidebar } from '../components/Sidebar.jsx';

export const Dashboard = () => {

  const slides = [
    {
      url: 'https://diariodelhuila.com/wp-content/uploads/Foto-4-ENCC-jpg.webp'
    },
    {
      url: 'https://i2.wp.com/lavozdelaregion.co/wp-content/uploads/2023/09/ENCC-Pitalito.jpg?resize=350%2C200&ssl=1'
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? slides.length-1 : currentIndex-1
    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    const isLastIndex = currentIndex === slides.length-1 
    const newIndex = isLastIndex ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const gotoNextSlide = (id) => {
    setCurrentIndex(id)
  }
  return (
    <div>
        <div className="bg-[#39A900] w-full h-20 flex items-center">
            <Sidebar />
            <h2 className="text-white text-2xl font-bold ml-auto mr-10">
                Bienvenido user
            </h2>
            <FaAlignJustify size={30} className="flex mr-3 cursor-pointer"/>
        </div>
        <div className="max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group">
          <div style={{ backgroundImage: `url(${slides[currentIndex].url})` }} className='w-full h-full bg-center bg-cover duration-500'>
          </div>
          <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl      text-bold rounded-full p-2 bg-black/20 text-white cursor-pointer hidden group-hover:block">
          <FaAngleLeft onClick={prevSlide} size={33} />
        </div>
        <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl text-bold rounded-full p-2 bg-black/20 text-white cursor-pointer hidden group-hover:block">
          <FaAngleRight onClick={nextSlide} size={33} />
        </div>
        <div className="flex justify-center items-center py-2 top-4">
        {slides.map((slide,index) => (
          <div key={index} onClick={()=>gotoNextSlide(index)}>
            <RxDotFilled/>
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}

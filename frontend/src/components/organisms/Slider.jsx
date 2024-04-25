import React, { useState } from 'react';
import './../../styles/Slider.css'; // Estilos CSS
import { Checkbox } from '@nextui-org/react';

const SliderVertical = () => {
  const [nivel, setnivel] = useState(0); 
  const [seco, setSeco] = useState(0)
  const [nata, setNata] = useState(0)
  const [intensidad, setIntesidad] = useState(0)
  const [cuerpo, setCuerpo] = useState(0)

  const handleNivel = (index) => {
    setnivel((index + 1) * 6); // Actualiza la posición del slider al hacer clic en una línea
  };

  const handleSeco = (index) => {
    setSeco((index + 1) * 6)
  }

  const handleNata = (index) => {
    setNata(((index + 1) * 6))
  }

  const handleIntensidad = (index) => {
    setIntesidad(((index+1) * 6))
  }

  const handleCuerpo = (index) => {
    setCuerpo(((index+1) * 6))
  }

const Ruler = () => {
    return (
        <div className="ruler">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="ruler-item">
            <div className="lineRuler"></div>
            <div className="lineRuler"></div>
            <div className="lineRuler line-center"></div>
            <div className="lineRuler"></div>
            <div className="lineRuler"></div>
            <div className="number">{index + 6}</div>
          </div>
        ))}
      </div>
    )
};

  return (
    <>
    <div className='flex flex-row h-44'>
        <div className='border-2 border-black p-2'>
            <label className='text-xl font-bold'> Muestra </label>
            <div className='w-20 h-20 bg-black flex justify-center items-center rounded-full mt-5'>
                <label className='text-6xl font-bold text-white'> 1 </label>    
            </div>    
        </div>
        <div className='border-t-2 border-b-2 border-r-2 border-black p-2'>
            <div className='flex flex-col items-center justify-center'>
                <label className='font-bold'> Nivel </label>
                <label className='font-bold'> Tomado </label>
            </div>
            
            <div className="slider-container">
                {/* Líneas del slider */}
                <div className="lines">
                    {/* Generar las líneas con eventos de clic */}
                    {[...Array(6)].map((_, index) => (
                    <div
                        key={index}
                        className={`line ${nivel >= (index + 1) * 6 ? 'dark' : 'light'}`}
                        onClick={() => handleNivel(index)}
                    />
                    ))}
                </div>
            </div>
        </div>
        <div className='border-t-2 border-b-2 border-r-2 border-black'>
            <div className='flex flex-row ml-2'>
                <label className='text-xl font-bold mr-2'> Frag/Aroma </label>
                <div className='w-12 h-7 border-2 border-black mb-3'>
                    <label></label>
                </div>
            </div>
            <Ruler />
            <div className='flex flex-row ml-2'>
                <div className="slider-container">
                    <label>Seco</label>
                    <div className="lines">
                        {[...Array(6)].map((_, index) => (
                        <div
                            key={index}
                            className={`line ${seco >= (index + 1) * 6 ? 'dark' : 'light'}`}
                            onClick={() => handleSeco(index)}
                        />
                        ))}
                    </div>
                </div>
                <div className='m-2 mt-7'>
                    <hr className='border-2 border-black w-16 mb-4 mt-5' />
                    <hr className='border-2 border-black w-16' />
                </div>
                <div className="slider-container">
                    <label>Nata</label>
                    <div className="lines">
                        {[...Array(6)].map((_, index) => (
                        <div
                            key={index}
                            className={`line ${nata >= (index + 1) * 6 ? 'dark' : 'light'}`}
                            onClick={() => handleNata(index)}
                        />
                        ))}
                    </div>
                </div>
            </div>
        </div>  
        <div className='border-t-2 border-b-2 border-r-2 border-black'>
            <div className='flex flex-row ml-2'>
                <label className='text-xl font-bold mr-16'> Sabor </label>
                <div className='w-12 h-7 border-2 border-black mb-3'>
                    <label></label>
                </div>
            </div>
            <Ruler />
            <div className='flex flex-row ml-2'>
                <label className='text-xl font-bold mr-6'> Postgusto </label>
                <div className='w-12 h-7 border-2 border-black mb-3'>
                    <label></label>
                </div>
            </div>
            <Ruler />
        </div>
        <div className='border-t-2 border-b-2 border-r-2 border-black'>
            <div className='flex flex-row ml-2'>
                <label className='text-xl font-bold mr-14'> Acidez </label>
                <div className='w-12 h-7 border-2 border-black mb-3'>
                    <label></label>
                </div>
            </div>
            <Ruler />
            <div className='flex flex-row'>
                <div className="slider-container">
                    <label> Intensidad </label>
                    <div className="lines">
                        {[...Array(6)].map((_, index) => (
                        <div
                            key={index}
                            className={`line ${intensidad >= (index + 1) * 6 ? 'dark' : 'light'}`}
                            onClick={() => handleIntensidad(index)}
                        />
                        ))}
                    </div>
                </div>
                <div  className='flex flex-col mt-6'>
                    <label className='text-sm mb-7'> Alto </label>
                    <label className='text-sm'> Bajo </label>
                </div>
            </div>
        </div>
        <div className='border-t-2 border-b-2 border-r-2 border-black'>
            <div className='flex flex-row ml-2'>
                <label className='text-xl font-bold mr-14'> Cuerpo </label>
                <div className='w-12 h-7 border-2 border-black mb-3'>
                    <label></label>
                </div>
            </div>
            <Ruler />
            <div className='flex flex-row ml-2'>
                <div className="slider-container">
                    <label> Nivel </label>
                    <div className="lines">
                        {[...Array(6)].map((_, index) => (
                        <div
                            key={index}
                            className={`line ${cuerpo >= (index + 1) * 6 ? 'dark' : 'light'}`}
                            onClick={() => handleCuerpo(index)}
                        />
                        ))}
                    </div>
                </div>
                <div className='flex flex-col mt-6 ml-4'>
                    <label className='text-sm mb-7'> Pesado </label>
                    <label className='text-sm'> Delgado </label>
                </div>
            </div>
        </div>
        <div>
            <div className='border-t-2 border-b-2 border-r-2 border-black'>
                <div className='flex flex-row ml-2'>
                    <label className='text-xl font-bold'> Uniformidad </label>
                    <div className='w-12 h-7 border-2 border-black mb-3'>
                        <label></label>
                    </div>
                </div>
                <div className='flex justify-center items-centerx mb-9'>
                    <div className="checkbox-group">
                        {[...Array(5)].map((_, index) => (
                            <input key={index} type="checkbox" className="checkbox" />
                        ))} 
                    </div>
                </div>
            </div>
            <div className='border-b-2 border-r-2 border-black'>
                <div className='flex flex-row ml-2'>
                    <label className='text-xl font-bold mr-12'> Balance </label>
                    <div className='w-12 h-7 border-2 border-black mb-2'>
                        <label></label>
                    </div>
                </div>
                <div className='mb-3'>
                    <Ruler />
                </div>
            </div>
        </div>
        <div>
            <div className='border-t-2 border-b-2 border-r-2 border-black'>
                <div className='flex flex-row ml-2'>
                    <label className='text-xl font-bold'> Taza limpia </label>
                    <div className='w-12 h-7 border-2 border-black mb-3'>
                        <label></label>
                    </div>
                </div>
                <div className='flex justify-center items-centerx mb-9'>
                    <div className="checkbox-group">
                        {[...Array(5)].map((_, index) => (
                            <input key={index} type="checkbox" className="checkbox" />
                        ))} 
                    </div>
                </div>
            </div>
            <div className='border-t-2 border-b-2 border-r-2 border-black'>
                <div className='flex flex-row ml-2'>
                    <label className='text-xl font-bold mr-8'> Dulzura </label>
                    <div className='w-12 h-7 border-2 border-black mb-3'>
                        <label></label>
                    </div>
                </div>
                <div className='flex justify-center items-centerx mb-7'>
                    <div className="checkbox-group">
                        {[...Array(5)].map((_, index) => (
                            <input key={index} type="checkbox" className="checkbox" />
                        ))} 
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className='flex flex-row'>
                <div className='w-44 border-t-2 border-b-2 border-r-2 border-black'>
                    <div className='flex flex-row ml-2 mb-4'>
                        <label className='text-xl font-bold mr-2'> Ap. General </label>
                        <div className='w-12 h-7 border-2 border-black mb-3'>
                            <label></label>
                        </div>
                    </div>
                    <Ruler />
                </div>
                <div className='flex flex-row ml-3'>
                    <div className='flex flex-col mr-2 items-center'>
                        <label className='text-xs font-bold'> Punteo </label>
                        <label className='text-xs font-bold'> total </label>
                    </div>
                    <div className='w-12 h-7 border-2 border-black mb-3'>
                        <label htmlFor=""></label>
                    </div>
                    
                </div>
            </div>
            <div className='ml-2'>
                <div>
                    <label className='text-xs font-bold'> Defectos </label>
                    <label className='text-xs font-bold'> (datos) </label>
                </div>
                <div className='flex flex-row'>
                    <div className='flex flex-col'>
                        <label className='text-xs font-bold'> Ligero = 2 </label>
                        <label className='text-xs font-bold'> Rechazo = 4 </label>
                    </div>
                    <div className='flex flex-row ml-4'>
                        <div className='flex flex-col'>
                            <label className='text-xs font-bold'> # Tazas </label>
                            <div className='w-7 h-7 border-2 border-black mb-3'></div>
                        </div>
                        <div className='flex items-center justify-center'>
                            <label className='text-xl font-bold mr-4'> X </label>
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-xs font-bold'> Intensidad </label>
                            <div className='w-7 h-7 border-2 border-black mb-3'></div>
                        </div>
                        <div className='flex items-center justify-center'>
                            <label className='text-xl font-bold'> = </label>
                        </div>
                        <div className='flex flex-col mt-4 ml-4'>
                            <div className='w-12 h-7 border-2 border-black mb-3'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div className='border-b-2 border-r-2 border-t-2 border-black w-[90%]'>
        <div className='flex justify-between'>
            <div className='flex items-end'>
                <label className='font-bold'> Notas: </label>
            </div>
            <div className='flex flex-row items-center'>
                <label className='font-bold'> Punteo Final </label>
                <div className='w-16 h-12 border-2 border-black'></div>
            </div>
            

        </div>
    </div>
    </>
  );
};

export default SliderVertical;

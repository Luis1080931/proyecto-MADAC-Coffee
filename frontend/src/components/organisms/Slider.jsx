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
    setnivel((index + 1) * 6); 
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
            <div className="number">{index + 6}</div>
            <div className="lineRuler"></div>
            <div className="lineRuler"></div>
            <div className="lineRuler line-center"></div>
            <div className="lineRuler"></div>
            <div className="lineRuler"></div>
          </div>
        ))}
      </div>
    )
};
const [values, setValues] = useState(Array(5).fill(false));
const [tazaValues, setTazaValues] = useState(Array(5).fill(false));
const [dulzuraValues, setDulzuraValues] = useState(Array(5).fill(false));
const [total, setTotal] = useState(0);
const [taza, setTaza] = useState(0)
const [dulzura, setDulzura] = useState(0)

const punteoTotal = parseInt(total) + parseInt(taza) + parseInt(dulzura)

const handleCheckboxUniformidad = (index) => {
    const updatedValues = values.map((_, i) => (i === index));
    setValues(updatedValues);
    const sum = updatedValues.reduce((acc, value, i) => acc + (value ? (i + 1) * 2 : 0), 0);
    setTotal(sum);
  };

  const handleCheckboxTaza = (index) => {
    const updatedValues = tazaValues.map((_, i) => (i === index));
    setTazaValues(updatedValues);
    const sum = updatedValues.reduce((acc, value, i) => acc + (value ? (i + 1) * 2 : 0), 0);
    setTaza(sum);
  };

  const handleCheckboxDulzura = (index) => {
    const updatedValues = dulzuraValues.map((_, i) => (i === index));
    setDulzuraValues(updatedValues);
    const sum = updatedValues.reduce((acc, value, i) => acc + (value ? (i + 1) * 2 : 0), 0);
    setDulzura(sum);
  };

  const [numeroTazas, setNumeroTazas] = useState(0);
  const [numeroIntensidad, setNumeroIntensidad] = useState(0);
  const [resultado, setResultado] = useState(0);

  const handleNumeroTazas = (e) => {
    const newValue = parseInt(e.target.value);
    setNumeroTazas(newValue);
    setResultado(newValue * numeroIntensidad);
  };

  const handleNumeroIntensidad = (e) => {
    const newValue = parseInt(e.target.value);
    setNumeroIntensidad(newValue);
    setResultado(numeroTazas * newValue);
  };

  const totalPunteoFinal = parseInt(punteoTotal) - parseInt(resultado)

  return (
    <div className='flex flex-col justify-center '>
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
                    <div className='w-12 h-7 border-2 border-black mb-3 flex justify-center'>
                        <label>{total}</label>
                    </div>
                </div>
                <div className='flex justify-center items-centerx mb-9'>
                    <div className="checkbox-group">
                    {[...Array(5)].map((_, index) => (
                        <React.Fragment key={index}>
                        <input
                            type="checkbox"
                            className="checkbox"
                            checked={values[index]}
                            onChange={() => handleCheckboxUniformidad(index)}
                        />
                        </React.Fragment>
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
                    <div className='w-12 h-7 border-2 border-black mb-3 flex justify-center'>
                        <label>{taza}</label>
                    </div>
                </div>
                <div className='flex justify-center items-centerx mb-9'>
                    <div className="checkbox-group">
                    {[...Array(5)].map((_, index) => (
                        <React.Fragment key={index}>
                        <input
                            type="checkbox"
                            className="checkbox"
                            checked={tazaValues[index]}
                            onChange={() => handleCheckboxTaza(index)}
                        />
                        </React.Fragment>
                    ))}
                    </div>
                </div>
            </div>
            <div className='border-t-2 border-b-2 border-r-2 border-black'>
                <div className='flex flex-row ml-2'>
                    <label className='text-xl font-bold mr-8'> Dulzura </label>
                    <div className='w-12 h-7 border-2 border-black mb-3 flex justify-center'>
                        <label>{dulzura}</label>
                    </div>
                </div>
                <div className='flex justify-center items-centerx mb-7'>
                    <div className="checkbox-group">
                    {[...Array(5)].map((_, index) => (
                        <React.Fragment key={index}>
                        <input
                            type="checkbox"
                            className="checkbox"
                            checked={dulzuraValues[index]}
                            onChange={() => handleCheckboxDulzura(index)}
                        />
                        </React.Fragment>
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
                    <div className='w-12 h-7 border-2 border-black mb-3 flex justify-center'>
                        <label>{punteoTotal}</label>
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
                            <div className='w-10 h-7 border-2 border-black mb-3'>
                                <input className='w-9' type="number" value={numeroTazas} onChange={handleNumeroTazas}/>
                            </div>
                        </div>
                        <div className='flex items-center justify-center'>
                            <label className='text-xl font-bold mr-4'> X </label>
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-xs font-bold'> Intensidad </label>
                            <div className='w-10 h-7 border-2 border-black mb-3'>
                                <input className='w-9' type="number" name="numeroIntensidad" value={numeroIntensidad} onChange={handleNumeroIntensidad} />
                            </div>
                        </div>
                        <div className='flex items-center justify-center'>
                            <label className='text-xl font-bold'> = </label>
                        </div>
                        <div className='flex flex-col mt-4 ml-4'>
                            <div className='w-12 h-7 border-2 border-black mb-3 flex justify-center'>
                                <label>{resultado}</label>
                            </div>
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
                <textarea name="" id="" cols="160" rows="2"></textarea>
            </div>
            <div className='flex flex-row items-center'>
                <label className='font-bold'> Punteo Final </label>
                <div className='w-16 h-12 border-2 border-black flex justify-center items-center'>
                    <label>{totalPunteoFinal}</label>
                </div>
            </div>
            

        </div>
    </div>
    </div>
  );
};


export default SliderVertical

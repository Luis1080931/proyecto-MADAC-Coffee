import React, { useContext, useEffect, useState } from 'react';
import { ModalAcciones } from '../organisms/Modal.jsx';
import ResultadoContext from '../../context/ResultadosContext.jsx';
import { Input, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import axiosClient from '../axiosClient.js';

const VerSensorial = ({ open, onClose, title, data }) => {

  /* const {idMuestras} = useContext(MuestrasContext) */

  const SliderVertical = ({ data }) => {

    const [analisisSensorial, setAnalisisSensorial ] = useState([])
  
    const stored = localStorage.getItem('user');
    const user = stored ? JSON.parse(stored) : null;
  
    /* useEffect(() => {
      axiosClient.get(`/analisis/analisisSensorialCatador/${user.identificacion}`).then((response) => {
        console.log('Ver datos:', response.data)
        setAnalisisSensorial(response.data)
      })
    }, []) */
  
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
  
  const [labelAroma, setlabelAroma] = useState(null);
  const [labelSabor, setLabelSabor] = useState(null)
  const [labelPostgusto, setLabelPostgusto] = useState(null)
  const [labelAcidez, setLabelAcidez] = useState(null)
  const [labelCuerpo, setLabelCuerpo] = useState(null)
  const [labelBalance, setLabelBalance] = useState(null)
  const [labelGeneral, setLabelGeneral] = useState(null)
  
  const RulerAroma = () => {
     
      const handleClick = (index, lineIndex) => {
      
        const value = index + 6 + (lineIndex * 0.25);
        setlabelAroma(value);
      };
    
      return (
        <div className="ruler">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="ruler-item">
              <div className="number">{index + 6}</div>
              {[...Array(4)].map((_, lineIndex) => (
                <div
                  key={lineIndex}
                  className="lineRuler"
                  onClick={() => handleClick(index, lineIndex)}
                ></div>
              ))}
            </div>
          ))}
        </div>
      );
    }
  
    const RulerSabor = () => {
     
      const handleClick = (index, lineIndex) => {
      
        const value = index + 6 + (lineIndex * 0.25);
        setLabelSabor(value);
      };
    
      return (
        <div className="ruler">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="ruler-item">
              <div className="number">{index + 6}</div>
              {[...Array(4)].map((_, lineIndex) => (
                <div
                  key={lineIndex}
                  className="lineRuler"
                  onClick={() => handleClick(index, lineIndex)}
                ></div>
              ))}
            </div>
          ))}
        </div>
      );
    };
  
    const RulerPostgusto = () => {
     
      const handleClick = (index, lineIndex) => {
      
        const value = index + 6 + (lineIndex * 0.25);
        setLabelPostgusto(value);
      };
    
      return (
        <div className="ruler">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="ruler-item">
              <div className="number">{index + 6}</div>
              {[...Array(4)].map((_, lineIndex) => (
                <div
                  key={lineIndex}
                  className="lineRuler"
                  onClick={() => handleClick(index, lineIndex)}
                ></div>
              ))}
            </div>
          ))}
        </div>
      );
    };
  
    const RulerAcidez = () => {
     
      const handleClick = (index, lineIndex) => {
      
        const value = index + 6 + (lineIndex * 0.25);
        setLabelAcidez(value);
      };
    
      return (
        <div className="ruler">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="ruler-item">
              <div className="number">{index + 6}</div>
              {[...Array(4)].map((_, lineIndex) => (
                <div
                  key={lineIndex}
                  className="lineRuler"
                  onClick={() => handleClick(index, lineIndex)}
                ></div>
              ))}
            </div>
          ))}
        </div>
      );
    }
  
    const RulerCuerpo = () => {
     
      const handleClick = (index, lineIndex) => {
      
        const value = index + 6 + (lineIndex * 0.25);
        setLabelCuerpo(value);
      };
    
      return (
        <div className="ruler">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="ruler-item">
              <div className="number">{index + 6}</div>
              {[...Array(4)].map((_, lineIndex) => (
                <div
                  key={lineIndex}
                  className="lineRuler"
                  onClick={() => handleClick(index, lineIndex)}
                ></div>
              ))}
            </div>
          ))}
        </div>
      );
    }
  
    const RulerBalance = () => {
     
      const handleClick = (index, lineIndex) => {
      
        const value = index + 6 + (lineIndex * 0.25);
        setLabelBalance(value);
      };
    
      return (
        <div className="ruler">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="ruler-item">
              <div className="number">{index + 6}</div>
              {[...Array(4)].map((_, lineIndex) => (
                <div
                  key={lineIndex}
                  className="lineRuler"
                  onClick={() => handleClick(index, lineIndex)}
                ></div>
              ))}
            </div>
          ))}
        </div>
      );
    }
  
    const RulerGeneral = () => {
     
      const handleClick = (index, lineIndex) => {
      
        const value = index + 6 + (lineIndex * 0.25);
        setLabelGeneral(value);
      };
    
      return (
        <div className="ruler">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="ruler-item">
              <div className="number">{index + 6}</div>
              {[...Array(4)].map((_, lineIndex) => (
                <div
                  key={lineIndex}
                  className="lineRuler"
                  onClick={() => handleClick(index, lineIndex)}
                ></div>
              ))}
            </div>
          ))}
        </div>
      );
    };
  
  const [values, setValues] = useState(Array(5).fill(false));
  const [tazaValues, setTazaValues] = useState(Array(5).fill(false));
  const [dulzuraValues, setDulzuraValues] = useState(Array(5).fill(false));
  const [total, setTotal] = useState(0);
  const [taza, setTaza] = useState(0)
  const [dulzura, setDulzura] = useState(0)
  
  const [notas, setNotas] = useState('')
  const [fecha, setFecha] = useState('')
  const [analisis, setAnalisis] = useState('')
  
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
  
    const [secoValue, setSecoValue] = useState(null);
    const [nataValue, setNataValue] = useState(null);
  
    const handleSecoValue = (index) => {
        setSeco((index + 1) * 6)
        setSecoValue(6 + index);
    };
  
    const handleNataValue = (index) => {
        setNata((index + 1) * 6)
        setNataValue(6 + index);
    };
  
    const totalAroma = ((parseInt(secoValue) || 0) + (parseInt(nataValue) || 0)) / 2;
  
    const punteoTotal = parseInt(totalAroma) + parseInt(labelSabor) + parseInt(labelPostgusto) + parseInt(labelAcidez) + parseInt(labelBalance) + parseInt(labelCuerpo) +parseInt(labelGeneral) + parseInt(total) + parseInt(taza) + parseInt(dulzura)
    const totalPunteoFinal = parseInt(punteoTotal) - parseInt(resultado)
  
    return (
      <>
      <form>
        <div className='flex flex-row'>
          <label className='mt-2 mr-2'> Fecha del registro: </label>
          <Input 
            type='date'
            className='w-[200px] mb-5'
            value={data.fecha}
          />
        </div>
        <label className='mr-2'> Código del análisis: </label>
        <select value={data.fk_analisis} className='w-[200px] rounded-xl bg-gray-100 h-[40px] mb-5'>
          <option hidden> Seleccione analisis ... </option>
          
            <option value={analisis.codigo} key={analisis.codigo}> {data.fk_analisis} </option>
          
        </select>
        <div className='flex flex-col justify-center '>
          <div className='flex flex-row h-44'>
              <div className='border-2 border-black p-2'>
                  <label className='text-xl font-bold'> Muestra </label>
                  <div className='w-20 h-20 bg-black flex justify-center items-center rounded-full mt-5'>
                      <label className='text-6xl font-bold text-white'> {data.codigo} </label>    
                  </div>    
              </div>
              <div className='border-t-2 border-b-2 border-r-2 border-black p-2 flex flex-col justify-between'>
                  <div className='flex flex-col items-center justify-center'>
                      <label className='font-bold'> Nivel </label>
                      <label className='font-bold'> Tostado </label>
                  </div>
                  
                  <div className="slider-container">
                    
                      <div className="lines">
                          
                          {[...Array(5)].map((_, index) => (
                          <div
                              key={index}
                              className={`line ${nivel >= (index + 1) * 5 ? 'dark' : 'light'}`}
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
                        <input className='w-full' value={data.aroma} readOnly />
                      </div>
                  </div>
                  <RulerAroma />
                  <div className='flex flex-row ml-2'>
                      <div className="slider-container">
                          <label>Seco</label>
                          <div className="lines">
                              {[...Array(5)].map((_, index) => (
                                  <div
                                      key={index}
                                      className={`line ${seco >= (index + 1) * 5 ? 'dark' : 'light'}`}
                                      onClick={() => handleSecoValue(index)}
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
                              {[...Array(5)].map((_, index) => (
                              <div
                                  key={index}
                                  className={`line ${nata >= (index + 1) * 5 ? 'dark' : 'light'}`}
                                  onClick={() => handleNataValue(index)}
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
                        <input className='w-full' value={data.sabor} readOnly />
                      </div>
                  </div>
                  <RulerSabor />
                  <div className='flex flex-row ml-2'>
                      <label className='text-xl font-bold mr-6'> Postgusto </label>
                      <div className='w-12 h-7 border-2 border-black mb-3'>
                        <input className='w-full' value={data.postgusto} readOnly />
                      </div>
                  </div>
                  <RulerPostgusto />
              </div>
              <div className='border-t-2 border-b-2 border-r-2 border-black'>
                  <div className='flex flex-row ml-2'>
                      <label className='text-xl font-bold mr-14'> Acidez </label>
                      <div className='w-12 h-7 border-2 border-black mb-3'>
                        <input className='w-full' value={data.acidez} readOnly />
                      </div>
                  </div>
                  <RulerAcidez />
                  <div className='flex flex-row'>
                      <div className="slider-container">
                          <label> Intensidad </label>
                          <div className="lines">
                              {[...Array(5)].map((_, index) => (
                              <div
                                  key={index}
                                  className={`line ${intensidad >= (index + 1) * 5 ? 'dark' : 'light'}`}
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
                        <input className='w-full' value={data.cuerpo} readOnly />
                      </div>
                  </div>
                  <RulerCuerpo />
                  <div className='flex flex-row ml-2'>
                      <div className="slider-container">
                          <label> Nivel </label>
                          <div className="lines">
                              {[...Array(5)].map((_, index) => (
                              <div
                                  key={index}
                                  className={`line ${cuerpo >= (index + 1) * 5 ? 'dark' : 'light'}`}
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
                            <input className='w-full' value={data.uniformidad} readOnly />
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
                            <input className='w-full' value={data.balance} readOnly />
                          </div>
                      </div>
                      <div className='mb-3'>
                          <RulerBalance />
                      </div>
                  </div>
              </div>
              <div>
                  <div className='border-t-2 border-b-2 border-r-2 border-black'>
                      <div className='flex flex-row ml-2'>
                          <label className='text-xl font-bold'> Taza limpia </label>
                          <div className='w-12 h-7 border-2 border-black mb-3 flex justify-center'>
                            <input className='w-full' value={data.taza_limpia} readOnly />
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
                            <input className='w-full' value={data.dulzura} readOnly />
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
                                <input className='w-full' value={data.general} readOnly />
                              </div>
                          </div>
                          <RulerGeneral />
                      </div>
                      <div className='flex flex-row ml-3'>
                          <div className='flex flex-col mr-2 items-center'>
                              <label className='text-xs font-bold'> Punteo </label>
                              <label className='text-xs font-bold'> total </label>
                          </div>
                          <div className='w-12 h-7 border-2 border-black mb-3 flex justify-center'>
                            <input className='w-full' value={data.punteo} readOnly />
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
                                      <input className='w-9' type="number" value={data.taza_defecto} readOnly/>
                                  </div>
                              </div>
                              <div className='flex items-center justify-center'>
                                  <label className='text-xl font-bold mr-4'> X </label>
                              </div>
                              <div className='flex flex-col'>
                                  <label className='text-xs font-bold'> Intensidad </label>
                                  <div className='w-10 h-7 border-2 border-black mb-3'>
                                      <input className='w-9' type="number" name="numeroIntensidad" value={data.intensidad_defecto} readOnly />
                                  </div>
                              </div>
                              <div className='flex items-center justify-center'>
                                  <label className='text-xl font-bold'> = </label>
                              </div>
                              <div className='flex flex-col mt-4 ml-4'>
                                  <div className='w-12 h-7 border-2 border-black mb-3 flex justify-center'>
                                    <input className='w-full' value={data.sub_defecto} readOnly />
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
                      <textarea name="" id="" cols="160" rows="2" value={data.notas} readOnly></textarea>
                  </div>
                  <div className='flex flex-row items-center'>
                      <label className='font-bold'> Punteo Final </label>
                      <div className='w-16 h-12 border-2 border-black flex justify-center items-center'>
                        <input className='w-full' value={data.punteo_final} readOnly />
                      </div>
                  </div>
                  
  
              </div>
          </div>
        </div>
        {/* <Button type='submit' color='primary'>
          Terminar
        </Button> */}
      </form>
      </>
    );
  };

  return (
    <>
    <Modal size='full' isOpen={open} onClose={onClose} title={title}>
        <ModalContent>
          <ModalHeader>
            Ver datos de la gráfica
          </ModalHeader>
          <ModalBody>
            {data.map(data => (
                <SliderVertical data={data}/>
            ))} 
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* <ModalAcciones open={open} title={title} onClose={onClose}>
        {data.map(data => (
            <SliderVertical data={data}/>
        ))}
      </ModalAcciones> */}
    </>
  );
};

export default VerSensorial
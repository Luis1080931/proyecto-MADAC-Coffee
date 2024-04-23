import { Button, Input, ModalFooter, Select, SelectItem } from '@nextui-org/react'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'


const FormAnalisis = ({ handleSubmit, actionLabel, mode, initialData, onClose }) => {

  const fecha = useRef(null)
  const analista = useRef(null)
  const fk_muestra = useRef(null)
  const fk_tipo_analisis = useRef(null)

  const [catadores, setCatadores] = useState([])
  const [muestras, setMuestras] = useState([])
  const [tipoAnalisis, setTipoAnalisis] = useState([])

  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get('http://localhost:3000/usuarios/listar', {headers: {token: token}}).then((response) => {
      console.log(response.data)

      const userFilter = response.data.usuarios.filter(catador => catador.tipo_usuario == 'catador' && catador.estado == 'activo')
      setCatadores(userFilter)
    })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:3000/muestras/listarMuestra', {headers: {token: token}}).then((response) => {
      console.log(response.data)

      const muestraFilter = response.data.filter(muestra => muestra.estado == 'activo')
      setMuestras(muestraFilter)
    })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:3000/tipoanalisis/listar').then((response) => {
      console.log(response.data)
       setTipoAnalisis(response.data)
    })
  }, [])

  useEffect(() => {
    if(mode == 'update' && initialData){
      fecha.current.value = initialData.fecha
      analista.current.value = initialData.analista
      fk_muestra.current.value = initialData.fk_muestra
      fk_tipo_analisis.current.value = initialData.fk_tipo_analisis
    }
  }, [mode, initialData])
  
  const handleFormSubmit = (e) => {
    e.preventDefault()
    try {
      const data = {
        fecha: new Date(fecha.current.value),
        analista: analista.current.value,
        fk_muestra: fk_muestra.current.value,
        fk_tipo_analisis: fk_tipo_analisis.current.value
      }
      handleSubmit(data, e)
    } catch (error) {
      console.log('Error de submit' + error);
    }
  }

  return (
    <>
    <form method='post' onSubmit={handleFormSubmit}>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
        <Input 
          type="date" 
          name="fecha"
          ref={fecha}
          required={true} 
          label="Ingrese la fecha"
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
        <Select
          label="Seleccione el analista"
          name="analista"
          ref={analista}
          required={true}
        >
          {catadores.map(item => (
            <SelectItem key={item.identificacion } value={item.identificacion }>
              {item.nombre}
            </SelectItem>
          ))}
        </Select>
      </div> 
      <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
        <Select
          label="Seleccione la muestra"
          name="fk_muestra"
          ref={fk_muestra}
          required={true}
        >
          {muestras.map(mues => (
              <SelectItem key={mues.codigo} value={mues.codigo} textValue={mues.codigo} >
                  {mues.codigo}
              </SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
        <Select
          label="Tipo de análisis"
          placeholder="Seleccione el tipo de análisis"
          name="fk_tipo_analisis"
          ref={fk_tipo_analisis}
          required={true}
        >
            {tipoAnalisis.map(tipo => (
              <SelectItem key={tipo.id} value={tipo.id}>
                {tipo.tipo_analisis}
              </SelectItem>
            ))}
        </Select>
      </div>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={onClose}>
          Cerrar
        </Button>
        <Button type='submit' color="primary" >
          {actionLabel}
        </Button>
      </ModalFooter>
    </form>
    </>
  )
}

export default FormAnalisis
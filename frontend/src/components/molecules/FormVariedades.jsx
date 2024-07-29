import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Input, ModalFooter } from '@nextui-org/react'
import VariedadesContext from '../../context/VariedadesContext';

const FormVariedades = ({ handleSubmit, onClose, actionLabel, mode }) => {
  const [nombreValue, setNombreValue] = useState('')
  const { variedadId } = useContext(VariedadesContext)

  useEffect(() => {
    if (mode === 'update' && variedadId) {
      setNombreValue(variedadId.nombre);
    }
  }, [mode, variedadId]);

  const handleNombreChange = (e) => {
    setNombreValue(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        nombre: nombreValue
      };
      handleSubmit(data, e);
    } catch (error) {
      console.log('Error del servidor en formulario de analisis' + error);
    }
  };

  return (
    <form method='post' onSubmit={handleFormSubmit}>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input
          name="nombre"
          value={nombreValue}
          onChange={handleNombreChange}
          required={true}
          label="Ingrese nombre de variedad"
        />
      </div>
      <ModalFooter>
        <Button color="danger" variant="flat" onPress={onClose}>
          Cerrar
        </Button>
        <Button type='submit' className='bg-[#273468] text-white'>
          {actionLabel}
        </Button>
      </ModalFooter>
    </form>
  );
};

export default FormVariedades;

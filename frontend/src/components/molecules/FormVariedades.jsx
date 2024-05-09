import React, { useEffect, useRef, useState } from 'react'
import { Button, Input, ModalFooter } from '@nextui-org/react'

const FormVariedades = ({ handleSubmit, onClose, actionLabel, mode, initialData }) => {
  const [nombreValue, setNombreValue] = useState('');

  useEffect(() => {
    if (mode === 'update' && initialData) {
      setNombreValue(initialData.nombre);
    }
  }, [mode, initialData]);

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
      // Manejo de errores
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
        <Button type='submit' color="primary">
          {actionLabel}
        </Button>
      </ModalFooter>
    </form>
  );
};

export default FormVariedades;

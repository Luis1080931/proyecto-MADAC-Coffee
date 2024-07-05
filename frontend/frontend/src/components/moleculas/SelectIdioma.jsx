import React, { useState } from 'react';
import Select from '../atomos/Select';

function SelectIdioma() {
    const [idiomaSeleccionado, setIdiomaSeleccionado] = useState('es');
    const opcionesIdioma = [
      { value: 'es', label: 'Español' },
      { value: 'en', label: 'Inglés' },
      { value: 'fr', label: 'Francés' },
    ];
  
    const handleIdiomaChange = (event) => {
      setIdiomaSeleccionado(event.target.value);
    };
    
    return (
        <div>
            <Select 
            value={idiomaSeleccionado}
            onChange={handleIdiomaChange}
            options={opcionesIdioma}
          />
        </div>
    );
}

export default SelectIdioma;
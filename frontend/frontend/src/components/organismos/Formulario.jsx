import React, { useState } from 'react';
import Input from '../atomos/Inputs.jsx';
import Select from '../atomos/Select.jsx';

const Formulario = ({ campos, onSubmit, className }) => {
  const [values, setValues] = useState({});

  const handleChange = (e, campo) => {
    const { name, value } = e.target;
    setValues({ ...values, [campo]: { value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      {campos.map((campo, index) => (
        <div key={index}>
          <Input
            type={campo.type}
            name={campo.name}
            value={values[campo.name]?.value || ''}
            onChange={(e) => handleChange(e, campo.name)}
            placeholder={campo.placeholder}
          />
          {campo.options && campo.options.length > 0 && (
            <Select
              name={campo.name}
              value={values[campo.name]?.value || ''}
              onChange={(e) => handleChange(e, campo.name)}
              placeholder={campo.placeholder}
              options={campo.options}
            />
          )}
        </div>
      ))}
    </form>
  );
};

export default Formulario;
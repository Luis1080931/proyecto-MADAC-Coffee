import React from 'react';
import Switch from 'react-switch';

function Toggle({ onChange, checked, onColor, offColor }) {
  return (
    <Switch
      onChange={onChange}
      checked={checked}
      onColor={onColor}
      offColor={offColor}
      uncheckedIcon={false}
      checkedIcon={false}
    />
  );
}

export default Toggle;

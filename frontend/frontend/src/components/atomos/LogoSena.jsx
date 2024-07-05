import React from 'react';
import v from '../../styles/variables';

function ImageLogoSena({ className, style }) {
  return (
    <div>
      <img src={v.imageLogoSena} className={className} alt="" style={style} />
    </div>
  );
}

export default ImageLogoSena;

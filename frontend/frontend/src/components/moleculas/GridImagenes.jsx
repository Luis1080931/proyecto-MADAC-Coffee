import React from 'react';
import ImageConfi from '../atomos/ImageConfi';

function GridImagenes({ images }) {
  return (
    <div className="container">
      <div className="row justify-content-center">
        {images.map((src, index) => (
          <div key={index} className="col-md-3">
            <ImageConfi src={src} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GridImagenes;

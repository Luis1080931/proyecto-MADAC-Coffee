import React from 'react'

function ImageConfi({alt, src}) {
  return (
    <div>
    <img src={src} alt={alt} className="img-fluid mb-3" style={{width: '800px', height: '200px'}} />
    </div>
  )
}

export default ImageConfi
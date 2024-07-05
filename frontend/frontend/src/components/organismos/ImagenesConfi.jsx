import React from 'react'
import v from '../../styles/variables'
import GridImagenes from '../moleculas/GridImagenes'

function ImagenesConfi() {
  return (
        <div style={{marginTop: '140px'}}>
            <GridImagenes images={[v.image1, v.image8, v.image3]}/>
            <GridImagenes images={[v.image4, v.image2, v.image6]}/>
        </div>
  )
}

export default ImagenesConfi
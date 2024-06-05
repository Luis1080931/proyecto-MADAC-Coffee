import React from 'react'
import SliderVertical from '../organisms/Slider.jsx';
import { ModalAcciones } from '../organisms/Modal.jsx';


function SensorialModal ({ open, onClose, title }){
    
    return (
      <>

      <ModalAcciones open={open} onClose={onClose} title={title} > 
        <SliderVertical />
      </ModalAcciones>
      </>
    )
} 

export default SensorialModal
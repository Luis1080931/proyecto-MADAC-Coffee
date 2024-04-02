import React from 'react'
import { FaX } from 'react-icons/fa6'
import FormResultados from '../molecules/FormResultados'

export const Modal = ({ open, onClose, children }) => {
  return (
    <>

      {open && (
        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50'>
          <div className='bg-[#E6E6E6] p-5 rounded-xl flex justify-center gap-3 lg:w-1/2 w-[90%] h-[90%] z-50'>
            
            {children}

            <div>
              <FaX className='cursor-pointer' onClick={onClose} />
            </div>
          </div>
        </div>
      )

      }
</>
  )
}



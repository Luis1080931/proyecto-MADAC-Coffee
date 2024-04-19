import React from 'react'

export const ButtonAcciones = ({ actionLabel, click }) => {
  return (
    <div className='flex-col md:flex justify-center mt-5 items-center'>
      <button type='submit' className='bg-[#39A900] p-2 rounded-lg text-white font-bold w-32' onClick={click}>
        {actionLabel}
      </button>
    </div>
  )
}
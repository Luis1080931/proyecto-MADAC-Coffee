import React from 'react'

export const Button = (props) => {
  return (
    <div className='flex-col md:flex justify-center mt-5 items-center'>
        <button type='submit'>{props.label}</button>
    </div>
  )
}

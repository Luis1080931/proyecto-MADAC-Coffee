import React, { Children } from 'react'

const TitleModal = ({title}) => {
  return (
    <div>
      <h2 className='font-bold text-2xl'>{title}</h2>
    </div>
  )
}

export default TitleModal
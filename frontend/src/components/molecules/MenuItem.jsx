import React from 'react'
import Icon from '../atoms/Icon'
import { Link } from 'react-router-dom'



function MenuItem({ icon, text, onClick, url }) {
  return (
    <>
      <Link to={url}>
      <li className='w-full text-gray-200 text-[25px] hover:bg-white/30 h-11 items-center px-5 flex gap-4 rounded-sm border-opacity-5 py-6 border-white border-b' onClick={onClick}>
    <Icon name={icon} />
    <span className='text-xs text-gray-200'>{text}</span>
</li>
      </Link>
    </>
  )
}

export default MenuItem
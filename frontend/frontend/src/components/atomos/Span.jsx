import React, { Children } from 'react'

function SpanSoporte({children}) {
  return (
    <div>
         <span style={{fontSize: '20px'}} className="font-weight-bold text-gray-800 mr-2">{children}</span>
    </div>
  )
}

export default SpanSoporte
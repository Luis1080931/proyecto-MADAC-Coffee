import React from 'react'
import Image from '../../atomos/Logo'
import ImageSena from '../../atomos/LogoSena'
import './Navbar.css'

function NavbarHeaderInicio() {
  return (
    <div>
      <nav className="navbar bg-#00800 fixed-top">
        <div className="d-flex container aling-items-start">
        <ImageSena style={{ width: "80px", height: "80px", marginBottom: "15px", marginLeft: "-17px" }} />
          <Image style={{ width: "100px", height: "100px", marginTop: "-10px"}} />
        </div>
      </nav>
    </div>
  )
}

export default NavbarHeaderInicio
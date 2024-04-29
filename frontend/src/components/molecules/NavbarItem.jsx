import React from 'react'
import Icon from '../atoms/Icon';


function NavbarItem({ icon, text, onClick }) {
    return (
        <span className='text-3xl cursor-pointer hover:text-green-700' onClick={onClick}>
            <Icon name={icon} />
        </span>
    );
}

export default NavbarItem
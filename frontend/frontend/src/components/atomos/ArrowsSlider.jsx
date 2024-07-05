import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Importa los iconos

const PrevArrow = ({ onClick }) => (
    <div className="arrow prev-arrow" onClick={onClick}>
        <FaChevronLeft />
    </div>
);

const NextArrow = ({ onClick }) => (
    <div className="arrow next-arrow" onClick={onClick}>
        <FaChevronRight />
    </div>
);

export { PrevArrow, NextArrow };

import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from '../organismos/Footer/Footer';
import v from '../../styles/variables';
import 'bootstrap/dist/css/bootstrap.min.css';
import Services from './Services';
import '../../styles/Slader.css';

const SliderDash = () => {
    const [activeSlide, setActiveSlide] = useState(0);

    const handleChangeSlide = index => {
        setActiveSlide(index);
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
        prevArrow: <button className="slick-prev">Previous</button>,
        nextArrow: <button className="slick-next">Next</button>,
        afterChange: index => handleChangeSlide(index)
    };

    return (
        <div className="container-fluid">
            <div>
                <Slider {...settings} style={{ marginTop: '110px' }}> {/* Añade un espacio arriba del slider */}
                    <div>
                        <img src={v.ImgSlider1} alt="Imagen 1" style={{ borderRadius: "30px", width: '95%', objectFit: 'cover', border: 'none', height: '530px', marginLeft: '50px' }} />
                    </div>
                    <div>
                        <img src={v.image7} alt="Imagen 2" style={{ borderRadius: "30px", width: '95%', objectFit: 'cover', border: 'none', height: '530px', marginLeft: '50px' }} />
                    </div>
                    <div>
                        <img src={v.ImgSlider3} alt="Imagen 3" style={{ borderRadius: "30px", width: '95%', objectFit: 'cover', border: 'none', height: '530px', marginLeft: '50px' }} />
                    </div>
                    <div>
                        <img src={v.ImgSlider2} alt="Imagen 4" style={{ borderRadius: "30px", width: '95%', objectFit: 'cover', border: 'none', height: '530px', marginLeft: '50px' }} />
                    </div>
                    {/* Agrega las demás imágenes aquí utilizando las variables exportadas */}
                </Slider>
                {/* Renderización de los puntos */}
                <div className="dots-container">
                    {[...Array(4)].map((_, index) => (
                        <div
                            key={index}
                            className={`dot ${activeSlide === index ? 'active' : ''}`}
                            onClick={() => handleChangeSlide(index)}
                        />
                    ))}
                </div>
                {/* Fin de los puntos */}
                <Services />
            </div>
            <Footer />
        </div>
    );
};

export default SliderDash;

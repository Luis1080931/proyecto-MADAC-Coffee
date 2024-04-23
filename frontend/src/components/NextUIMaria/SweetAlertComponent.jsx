import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const SweetAlertComponent = ({ type, message }) => {
    useEffect(() => {
        if (type && message) { // Verifica que type y message no sean null o undefined
            if (type === 'success') {
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: message,
                });
            } else if (type === 'error') {
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: message,
                });
            }
        }
    }, [type, message]); // Ejecuta el efecto cuando type o message cambien

    return null; // No necesitas renderizar nada en el DOM directamente
};

export default SweetAlertComponent;

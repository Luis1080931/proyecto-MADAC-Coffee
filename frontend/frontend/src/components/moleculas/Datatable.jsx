// Datatable.jsx

import React from 'react';
import DataTable from 'react-data-table-component';

export const Datatable = (props) => {
    const paginaOpciones = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsText: 'Todos'
    };

    const customStyles = {
        headCells: {
            style: {
                fontSize: '15px',
                fontWeight: 'bold',
                borderBottom: '1px solid #dee2e6',
            },
        },
        cells: {
            style: {
                fontSize: '15px',
                borderBottom: '1px solid #dee2e6',
                whiteSpace: 'nowrap', // Evita que el texto se envuelva automáticamente
                overflow: 'hidden', // Oculta cualquier contenido que desborde del contenedor
                textOverflow: 'ellipsis', // Muestra puntos suspensivos (...) cuando el contenido desborda el contenedor
            },
        },
    };

    const containerStyles = {
        boxShadow: '0 4px 8px rgba(0, 0, 0)',
        border: '1px solid #dee2e6',
        borderRadius: '5px',
        marginBottom: '20px',
    };

    const tableStyles = {
        overflow: 'auto',
        borderCollapse: 'collapse',
        width: '100%',
    };

    return (
        <div style={containerStyles}>
            <h2 style={{ marginLeft: '15px', textAlign: 'center' }}>{props.title}</h2>
            <div style={tableStyles}>
                <DataTable
                    columns={props.columns}
                    data={props.data}
                    fixedHeader
                    pagination
                    paginationComponentOptions={paginaOpciones}
                    highlightOnHover
                    pointerOnHover
                    customStyles={customStyles}
                />
            </div>
        </div>
    );
};

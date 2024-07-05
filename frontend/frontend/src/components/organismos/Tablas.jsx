// DataTable.jsx (Organism)
import React from 'react';
import DataTable from 'react-data-table-component';
import Botones from '../atomos/Botones';
const DataTableComponent = ({ columns, data, title }) => {
  return (
    <div className="w-10/12 ml-28">
      <Botones text="Registrar" onClick={() => handleOpenModal("Registrar programacion")} />
      <DataTable
        columns={columns}
        data={data}
        title={title}
        fixedHeader
        pagination
        paginationComponentOptions={{
          rowsPerPageText: "Filas por página",
          rangeSeparatorText: "de",
          selectAllRowsItem: true,
          selectAllRowsText: "Todos",
        }}
        customStyles={{
          head: {
            style: {
              backgroundColor: '#4CAF50', 
            },
          },
          headCells: {
            style: {
              color: '#1B5E20', 
            },
          },
        }}
      />
    </div>
  );
};

export default DataTableComponent;


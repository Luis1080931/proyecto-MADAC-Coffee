import React from "react";
import DataTable from "react-data-table-component";

const TablaFinca = ({ columns, data, handleOpenModal }) => {
  const expandedData = data.map(item => ({
    ...item,
    subRows: [
      {
        name: 'Acciones',
        selector: 'acciones',
        cell: row => (
          <button className="btn btn-warning p-2 rounded-lg text-sm font-bold" type="button" onClick={() => handleOpenModal("Editar finca")}>
            Editar
          </button>
        )
      }
    ]
  }));

  return (
    <div className="container mt-5">
      <DataTable
        columns={columns}
        data={expandedData}
        title=""
        fixedHeader
        pagination
        paginationComponentOptions={{
          rowsPerPageText: "Filas por página",
          rangeSeparatorText: "de",
          selectAllRowsItem: true,
          selectAllRowsText: "Todos",
        }}
        expandableRows
        expandableRowsComponent={false} 
      />
    </div>
  );
};

export { TablaFinca }; 

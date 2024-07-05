import React from "react";
import DataTable from "react-data-table-component";

const TablaCultivos = ({ data, onEdit, onDelete }) => {
  const columns = [
    {
      name: "Fecha de Inicio",
      selector: (row) => row.fecha_inicio,
      sortable: true,
    },
    {
      name: "Cantidad Sembrada",
      selector: (row) => (
        <div className="pl-10">{row.cantidad_sembrada}</div>
      ),
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => row.estado,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div style={{ textAlign: "right", paddingRight: "35px" }}>
          <button className="btn btn-warning mb-2 w-100" onClick={() => onEdit(row)}>
            Actualizar
          </button>
          <br />
          <button className="btn btn-danger mb-2 w-100" onClick={() => onDelete(row)}>
            Desactivar
          </button>
        </div>
      ),
    },
  ];
  

  return (
    <div className="container-fluid">
      <DataTable
        columns={columns}
        data={data}
        title="Cultivos registrados"
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
              backgroundColor: "#4CAF50",
            },
          },
          headCells: {
            style: {
              color: "#4CAF50",
            },
          },
        }}
      />
    </div>
  );
};

export default TablaCultivos;

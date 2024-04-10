import React from 'react'
import DataTable from 'react-data-table-component'

export const Datatable = (props) => {

    const paginaOpciones={
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsText: 'Todos'
    }
    
  return (
    <DataTable
        columns={props.columns}
        data={props.data}
        title={props.title}
        fixedHeader
        pagination
        paginationComponentOptions={paginaOpciones}
        responsive
        striped
        highlightOnHover
    >

    </DataTable>
  )
}

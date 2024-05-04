import React, { useEffect, useState } from 'react'
import { Header } from './../molecules/Header.jsx'
import VariablesModal from '../templates/VariablesModal.jsx';
import AccionesModal from '../organisms/ModalAcciones.jsx';
import axiosClient from '../axiosClient.js';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    Pagination,
  } from "@nextui-org/react";
  import { PlusIcon } from "./../atoms/PlusIcon.jsx";
  import { SearchIcon } from "./../atoms/SearchIcon.jsx";
  import { ChevronDownIcon } from "./../atoms/ChevronDownIcon.jsx";
  import { ButtonActualizar } from "../atoms/ButtonActualizar.jsx";
  import { ButtonDesactivar } from "../atoms/ButtonDesactivar.jsx";
  import ButtonActivar from "../atoms/ButtonActivar.jsx";

export function Variables () {

const statusColorMap = {
  activo: "success",
  inactivo: "danger",
};

function Ejemplo() {

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "fecha",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);
 
  const statusOptions = [
    {name: "Activo", uid: "activo"},
    {name: "Inactivo", uid: "inactivo"},
  ];

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredvariables = variables;

    if (hasSearchFilter) {
      filteredvariables = filteredvariables.filter(variable =>
        String(variable.codigo).toLowerCase().includes(filterValue.toLowerCase()) ||
        variable.nombre.toLowerCase().includes(filterValue.toLowerCase()) ||
        String (variable.fk_tipo_analisis).toLowerCase().includes(filterValue.toLowerCase()) 
      );
    }

    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredvariables = filteredvariables.filter(variable =>
        Array.from(statusFilter).includes(variable.estado)
      );
    }

    return filteredvariables;
  }, [variables, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((variable, columnKey) => {
    const cellValue = variable[columnKey];

  
const handleUpdateClick = (id) => {
 
  localStorage.setItem('idUser', id)
  clickEditar(id)
};

    switch (columnKey) {
      case "estado":
        return (
          <Chip className="capitalize" color={statusColorMap[variable.estado]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <ButtonActualizar click={() => handleToggle('update', variable)} />
            {variable.estado === 'activo' ? (
              <ButtonDesactivar click={() => handleDesactivar(variable.v_codigo)} />
            ) : (
              <ButtonActivar click={() => handleActivar(variable.v_codigo)} />
            )}
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const onStatusFilter = (selectedKeys) => {
    setStatusFilter(selectedKeys)
  }

  const topContent = React.useMemo(() => {
    return (
      <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%] text-xl"
            placeholder="Buscar..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
  
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button className="text-xl" endContent={<ChevronDownIcon className="text-xl" />} variant="flat">
                  Estado
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Menu de acciones"
                aria-labelledby="Acciones"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={onStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button className="text-xl" color="primary" endContent={<PlusIcon />} onClick={() => handleToggle('create')}>
              Registrar
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-xl">Total {variables.length} Resultados</span>
          <label className="flex items-center text-default-400 text-xl">
            Columnas por página:
            <select
              className="bg-transparent outline-none text-default-400 text-xl"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
      </>
     
    );
  }, [
    filterValue,
    onRowsPerPageChange,
    onSearchChange,
    onClear,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-xl text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} de ${filteredItems.length} seleccionados`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button className="text-xl" color="primary" isDisabled={pages === 1} size="md" variant="solid" onPress={onPreviousPage}>
            Atras
          </Button>
          <Button className="text-xl" color='primary' isDisabled={pages === 1} size="md" variant="ghost" onPress={onNextPage}>
            Siguiente
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <div className="flex items-center justify-center">
<Table
  aria-label="Tabla"
  isHeaderSticky
  bottomContent={bottomContent}
  bottomContentPlacement="outside"
  classNames={{
    wrapper: "max-h-[95%] max-w-[95%]" ,
  }}
  className="flex"
  selectedKeys={selectedKeys}
  /* selectionMode="multiple" */
  sortDescriptor={sortDescriptor}
  topContent={topContent}
  topContentPlacement="outside"
  onSelectionChange={setSelectedKeys}
  onSortChange={setSortDescriptor}
>
  <TableHeader columns={data}>
    {(column) => (
      <TableColumn
        className="bg-[#3C6E9F] text-white text-lg"
        key={column.uid}
        align={column.uid === "actions" ? "center" : "start"}
        allowsSorting={column.sortable}
      >
        {column.name}
      </TableColumn>
    )}
  </TableHeader>
  <TableBody emptyContent={"No hay variables registradas"} items={sortedItems}>
    {(item) => (
      <TableRow key={item.v_codigo}>
        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
      </TableRow>
    )}
  </TableBody>
</Table>
    </div>
    
  );
}

    const [modalOpen, setModalOpen] = useState(false)
    const [ modalAcciones, setModalAcciones ] = useState(false)
    const [mode, setMode] = useState('create')
    const [initialData, setInitialData ] = useState(null)
    const [mensaje, setMensaje] = useState('')
    const [variables, setVariables] = useState([])

    useEffect(() => {   
        fetchData()
    },[])

    const fetchData = async () => {
        try {
            axiosClient.get('/variables/listarvariable').then((response) => {
                console.log(response.data)
                setVariables(response.data)
            })

        } catch (error) {
            console.log('Error en el servidor' + error);
        }
    }

    const data = [
        {
            uid: 'v_codigo',
            name: 'Código',
            sortable: true
        },
        {
            uid: 'nombre',
            name: 'Nombre',
            sortable: true
        },
        {
            uid: 'tipo_analisis',
            name: 'Tipo analisis',
            sortable: true
        },
        {
            uid: 'estado',
            name: 'Estado',
            sortable: true
        },
        {
            uid:'actions',
            name: "Acciones",
            sortable:true
        }
    ];

    const handleDesactivar = (codigo) => {
        try {
            axiosClient.put(`/variables/desactivarVariable/${codigo}`, null).then((response) => {
                console.log(response.data);
            

            if(response.status == 200) {
                setMensaje(response.data.message)
                setModalAcciones(true)
                fetchData()
            }else{
                alert('Error' + error)
            }
        })
        } catch (error) {
            alert('Error con el servidor')
        }
    }

    const handleActivar = async (codigo) => {
        axiosClient.put(`/variables/activarVariable/${codigo}`).then((response) => {
            console.log(response.data)
            if(response.status == 200) {
                setMensaje(response.data.message)
                setModalAcciones(true)
                fetchData()
            }else{
                setMensaje(response.data.message)
                setModalAcciones(true)
            }
        })
    }

    const id = localStorage.getItem('idUser')

    const handleSubmit = async (datosForm, e  ) => {
        console.log(datosForm);
        e.preventDefault()

        try {
            if(mode === 'create') {

                await axiosClient.post('/variables/crearvariable', datosForm).then((response) => {
                    console.log(response)
                    if(response.status == 200 ){
                        setMensaje(response.data.message)
                        setModalAcciones(true)
                        setModalOpen(false)
                        fetchData()
                    }
                })
            }else if (mode === 'update'){
                await axiosClient.put(`/variable/actualizar/${variables.v_codigo}`, datosForm).then((response) => {
                    console.log(response);

                    if(response.status == 200){
                        setMensaje(response.data.message)
                        setModalAcciones(true)
                        setModalOpen(false)
                        fetchData()
                    }else {
                        alert('Error al actualizar')
                    }
                })
            }
            setModalOpen(false)
        } catch (error) {
            console.log('Error en el servidor ' + error)
        }
    }
    const handleToggle = (mode, initialData) => {
        setInitialData(initialData)
        setModalOpen(true)
        setMode(mode)
    }
  return (
    
    <div>
        <Header title="Variables de análisis físico" />
        <div className='w-full max-w-[90%] ml-28 items-center p-10'>

           <AccionesModal
            isOpen={modalAcciones}
            onClose={() => setModalAcciones(false)}
            label={mensaje}
           />
            <VariablesModal
                open={modalOpen} 
                onClose={()=>setModalOpen(false)} 
                title={mode === 'create' ? 'Registrar Variable' : 'Actualizar variable'}
                actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                initialData={initialData}
                handleSubmit={handleSubmit}
                mode={mode}
                setModalOpen={setModalOpen}
            />
            <Ejemplo
                data={data}
                variables={variables}
           />
        </div>
    </div>
  )
}
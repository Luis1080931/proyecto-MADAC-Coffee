import React, { useContext, useEffect, useState } from 'react';
import { Header } from '../molecules/Header.jsx';
import AccionesModal from '../organisms/ModalAcciones.jsx';
import AnalisisModal from '../templates/Analisis.jsx';
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
import AnalisisContext from '../../context/AnalisisContext.jsx';

function VistaAnalisis() {

const statusColorMap = {
  asignado: "success",
  calificado: "warning",
  terminado: "danger",
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
    {name: "Asignado", uid: "asignado"},
    {name: "Calificado", uid: "calificado"},
    {name: "Terminado", uid: "terminado"},
  ];

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredResults = results;

    if (hasSearchFilter) {
      filteredResults = filteredResults.filter(result =>
        String(result.codigo).toLowerCase().includes(filterValue.toLowerCase()) ||
        result.fecha.toLowerCase().includes(filterValue.toLowerCase()) ||
        String(result.analista).toLowerCase().includes(filterValue.toLowerCase()) ||
        String(result.muestra).toLowerCase().includes(filterValue.toLowerCase()) ||
        result.tipo_analisis.toLowerCase().includes(filterValue.toLowerCase()) ||
        result.estado.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredResults = filteredResults.filter(result =>
        Array.from(statusFilter).includes(result.estado)
      );
    }

    return filteredResults;
  }, [results, filterValue, statusFilter]);

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

  const renderCell = React.useCallback((result, columnKey) => {
    const cellValue = result[columnKey];

    switch (columnKey) {
      case "estado":
        return (
          <Chip className="capitalize" color={statusColorMap[result.estado]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex flex-row">
            <ButtonActualizar click={() =>  handleToggle('update', setAnalisisId(result))} /> 
            {result.estado === 'asignado' ? (
              <ButtonDesactivar click={() => handleDesactivar(result.codigo)} />
            ) : (
              <ButtonActivar click={() => handleActivar(result.codigo)} />
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
          <span className="text-default-400 text-xl">Total {results.length} resultados</span>
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
        {<span className="w-[30%] text-xl text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} de ${filteredItems.length} seleccionados`}
        </span>}
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
  // selectionMode="multiple"
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
  <TableBody emptyContent={"No hay análisis registrados"} items={sortedItems}>
    {(item) => (
      <TableRow key={item.codigo}>
        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
      </TableRow>
    )}
  </TableBody>
</Table>
    </div>
    
  );
}


    const [results, setResults] = useState([]);
    const [modalAccionesOpen, setModalAccionesOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [mensaje, setMensaje] = useState('')
    const [mode, setMode] = useState('create')
    const { setAnalisisId, analisisId } = useContext(AnalisisContext)

    const data = [
        { 
            uid: "codigo",
            name: "CÓDIGO",
            sortable: true 
        },
        { 
            uid: "analista",
            name: "ANALISTA" ,
            sortable: true 
        },
        { 
            uid: "fecha",
            name: "FECHA", 
            sortable: true,
            render: (fecha) => formatDate(fecha)
        },
        { 
            uid: "muestra",
            name: "MUESTRA",
            sortable: true
        },
        { 
            uid: "tipo_analisis",
            name: "TIPO ANALISIS",
            sortable: true
        },
        { 
            uid: "estado",
            name: "ESTADO",
            sortable: true
        },
        { 
            uid: "actions",
            name: "ACCIONES",
            sortable: true
        },
    ];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES'); // Puedes ajustar el idioma según tu preferencia
      }

    const handleDesactivar = async (id) => {
        await axiosClient.put(`/analisis/desactivar/${id}`, null).then((response) => {
            console.log(response.data)
            if(response.status==200){
                setMensaje(response.data.message)
                setModalAccionesOpen(true)
                setModalOpen(false)
                fetchData();
            }else{
                alert('Error')
            }
            
        });
    }

    const handleActivar = async (codigo) => {
        axiosClient.put(`/analisis/activar/${codigo}`).then((response) => {
            console.log(response.data)
            if(response.status==200){
                setMensaje(response.data.message)
                setModalAccionesOpen(true)
                setModalOpen(false)
                fetchData();
            }else{
                setMensaje(response.data.message)
                setModalAccionesOpen(true)
            }
        })
    }

    const fetchData = async () => {
        try {
            const response = await axiosClient.get('/analisis/listar')

            const formattedResults = response.data.map((result) => ({
                ...result,
                fecha: formatDate(result.fecha),
              }));
              setResults(formattedResults);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleToggle = (mode) => {
        setModalOpen(true)
        setMode(mode)
    }

    const handleSubmit = (data, e) => {
        e.preventDefault()
        try {
            if(mode == 'create'){
                axiosClient.post('/analisis/registrar', data).then((response) => {
                    console.log(response.data)
                    if(response.status == 201){
                        setMensaje(response.data.message)
                        setModalAccionesOpen(true)
                        setModalOpen(false)
                        fetchData();
                    }else{
                        alert('Error en el registro')
                    }
                    
                });
            }else if(mode == 'update'){ 
                axiosClient.put(`/analisis/actualizar/${analisisId.codigo}`,data).then((response) => {
                    console.log(response.data)
                    if(response.status == 201){
                        setMensaje(response.data.message)
                        setModalAccionesOpen(true)
                        setModalOpen(false)
                        fetchData();
                    }else{
                        alert('Error en el registro')
                    }
                    
                });
            }
        } catch (error) {
           console.log('Error de servidor' + error); 
        }
    }

    return (
        <div>
            <Header title='Análisis físico y sensorial' />
            <div className='w-full max-w-[90%] ml-28 items-center p-10'>
                <AccionesModal 
                    isOpen={modalAccionesOpen}
                    onClose={() => setModalAccionesOpen(false)}
                    label={mensaje}
                />
                
                <AnalisisModal 
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title={mode === 'create' ? 'Registrar Análisis' : 'Actualizar Análisis'}
                    actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                    mode={mode}
                    handleSubmit={handleSubmit}
                />
                <Ejemplo 
                    clickDesactivar={handleDesactivar}
                    clickActivar={handleActivar}
                    clickEditar={() => handleToggle('update', id)}
                    clickRegistrar={() => handleToggle('create')}
                    data={data}
                    results={results}
                />
            </div>
        </div>
    );
}

export default VistaAnalisis
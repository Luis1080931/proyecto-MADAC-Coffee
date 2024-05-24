import React, { useCallback, useEffect, useState } from 'react'
import { Header } from './../molecules/Header.jsx'
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
  Select,
  SelectItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader
} from "@nextui-org/react";
import { PlusIcon } from "./../atoms/PlusIcon.jsx";
import { SearchIcon } from "./../atoms/SearchIcon.jsx";
import { ChevronDownIcon } from "./../atoms/ChevronDownIcon.jsx";
import axiosClient from "../axiosClient.js";
import { FaFileDownload } from "react-icons/fa";
import { PDFDownloadLink } from '@react-pdf/renderer'
import PDFReport from '../organisms/Reportes.jsx';

export function Reportes () {
  
  const statusColorMap = {
    asignado: "success",
    terminado: "danger",
    calificado: 'primary'
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
      {name: "Terminado", uid: "terminado"},
      {name: "Calificado", uid: "calificado"},
    ];
  
    const [analisisValue, setAnalisisValue] = useState([])
    const [selectedAnalysis, setSelectedAnalysis] = useState("");
  
    useEffect(() => {
      axiosClient.get('/analisis/listar')
        .then((response) => {
          console.log('Datos recibidos:', response.data)
          setAnalisisValue(response.data);
        })
        .catch((error) => {
          console.error('Error al obtener datos:', error);
        });
    }, []);
    
    
    const handleAnalysisChange = (event) => {
      const { value } = event.target;
      console.log('Analisis seleccionado:', value);
      setSelectedAnalysis(value);
    };
    
    const [datosPdf, setDatosPdf] = useState(null);
  const [loadingPdf, setLoadingPdf] = useState(false);

  const fetchDataPdf = useCallback(async (id) => {
    setLoadingPdf(true);
    try {
      const response = await axiosClient.get(`/reportes/generar/${id}`);
      console.log('Response data:', response.data);
      setDatosPdf(response.data);
    } catch (error) {
      console.error('Error al obtener los datos del PDF:', error);
    } finally {
      setLoadingPdf(false);
    }
  }, []);

  const handleDownloadClick = async (id) => {
    await fetchDataPdf(id);
  };

  useEffect(() => {
    console.log('datosPdf:', datosPdf);
    console.log('loadingPdf:', loadingPdf);
  }, [datosPdf, loadingPdf]);

    const hasSearchFilter = Boolean(filterValue);
  
    const filteredItems = React.useMemo(() => {
      let filteredResults = results;
    
      console.log('Análisis seleccionado en el filtro:', selectedAnalysis)
      if (selectedAnalysis) {
        filteredResults = filteredResults.filter(
          (result) => parseInt(result.analisis_id) === parseInt(selectedAnalysis)
        );
      }
    
      if (hasSearchFilter) {
        console.log("Filter Value:", filterValue);
        filteredResults = filteredResults.filter(result =>
          String(result.analisis_id).toLowerCase().includes(filterValue.toLowerCase()) ||
          String(result.codigo).toLowerCase().includes(filterValue.toLowerCase()) ||
          result.fecha.toLowerCase().includes(filterValue.toLowerCase()) ||
          result.catador.toLowerCase().includes(filterValue.toLowerCase()) ||
          result.caficultor_nombre.toLowerCase().includes(filterValue.toLowerCase()) ||
          result.finca.toLowerCase().includes(filterValue.toLowerCase())
        );
      }
  
      if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
        filteredResults = filteredResults.filter(result =>
          Array.from(statusFilter).includes(result.estado)
        );
      }
  
      console.log('Resultados filtrados:', filteredResults);
  
      return filteredResults;
    }, [results, filterValue, statusFilter, selectedAnalysis]);
  
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
            <Chip className="capitalize" color={statusColorMap[result.estado]} size="md" variant="flat">
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="flex flex-row justify-center items-center">
              {result.estado === 'terminado' && (
                <>
                  {loadingPdf ? (
                    'Cargando documento...'
                  ) : (
                    datosPdf ? (
                      <PDFDownloadLink
                        document={<PDFReport data={datosPdf} />}
                        fileName={`Análisis-${result.analisis_id}.pdf`}
                      >
                        {({ loading }) =>
                          loading ? 'Cargando documento...' : (
                            <div>
                              <FaFileDownload className='text-3xl cursor-pointer' />
                            </div>
                          )
                        }
                      </PDFDownloadLink>
                    ) : (
                      <button onClick={() => handleDownloadClick(result.analisis_id)}>
                        Generar PDF
                      </button>
                    )
                  )}
                </>
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
        <div className="flex flex-col gap-4 h-full">
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
            <Select
              className="w-48"
              aria-label="Select analisis"
              placeholder="Seleccionar análisis"
              value={selectedAnalysis}
              onChange={handleAnalysisChange}
            >
              {analisisValue.map((analisis) => (
                <SelectItem key={analisis.codigo} value={analisis.codigo} textValue={analisis.codigo}>
                  {analisis.codigo}
                </SelectItem>
              ))}
            </Select> 
              
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button className="text-xl bg-gray-100" endContent={<ChevronDownIcon className="text-xl" />} variant="flat">
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
      );
    }, [filterValue, statusFilter, onRowsPerPageChange, onSearchChange, onClear]);
  
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
    }, [selectedKeys, items.length, page, pages]);
  
    return (
      <div className="flex items-center justify-center max-h-screen">
        <Table
          aria-label="Tabla"
          isHeaderSticky
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            wrapper: "max-w-[95%]" ,
          }}
          className="flex"
          selectedKeys={selectedKeys}
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
          onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}
        >
          <TableHeader columns={data}>
            {(column) => (
              <TableColumn
                className="bg-[#525B5F] text-white text-lg"
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No hay resultados registrados"} items={sortedItems}>
            {(item) => (
              <TableRow key={item.analisis_id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  }

  const [results, setResults] = useState([])

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosClient.get('/reportes/listar');
      const formattedResults = response.data.map((result) => ({
        ...result,
        fecha: formatDate(result.fecha),
      }));
      setResults(formattedResults);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES')
  };

  const data = [
    { 
        uid: "analisis_id",
        name: "Análisis",
        sortable: true 
    },
    { 
        uid: "codigo",
        name: "Muestra", 
        sortable: true 
    },
    { 
        uid: "fecha",
        name: "Fecha recepción",
        sortable: true,
        render: (fecha) => formatDate(fecha)
    },
    { 
        uid: "caficultor_nombre",
        name: "Caficultor",
        sortable: true 
    },
    { 
        uid: "finca",
        name: "Finca",
        sortable: true 
    },
    { 
        uid: "catador",
        name: "Catador asignado",
        sortable: true 
    },
    {
        uid: 'estado',
        name: 'Estado',
        sortable: true
    },
    { 
        uid: 'actions',
        name: "Acciones",
        sortable: true,
        
    },
  ]
  
  return (
    <>
        <div className='bg-[#D2D4C7] h-full'>
            <Header title="Reportes de los análisis" />
            <div className='w-full max-w-[90%] ml-28 items-center p-10 flex-auto'>

                <Ejemplo
                    data={data}
                    results={results} 
                />

            </div>

        </div>
    </>
    
  )
}

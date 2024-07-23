import React, { useContext, useEffect, useRef, useState } from 'react'
import { Header } from './../molecules/Header.jsx'
import AccionesModal from '../organisms/ModalAcciones.jsx';
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
import { ButtonActualizar } from "../atoms/ButtonActualizar.jsx";
import { ButtonDesactivar } from "../atoms/ButtonDesactivar.jsx";
import ButtonActivar from "../atoms/ButtonActivar.jsx";
import axiosClient from "../axiosClient.js";
import ResultadoContext from '../../context/ResultadosContext.jsx';
import SliderVertical from '../organisms/Slider.jsx';
import VerSensorial from '../templates/VerSensorial.jsx';
import { VscEye } from "react-icons/vsc";

export function ResultadosSensorialCatador () {

  
  const statusColorMap = {
    activo: "primary",
    inactivo: "danger",
    todos: 'primary'
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
    
    
    
  
    const hasSearchFilter = Boolean(filterValue);
  
    const filteredItems = React.useMemo(() => {
      let filteredResults = results;
    
      console.log('Análisis seleccionado en el filtro:', selectedAnalysis)
      if (selectedAnalysis) {
        filteredResults = filteredResults.filter(
          (result) => parseInt(result.analisis) === parseInt(selectedAnalysis)
        );
      }
    
      if (hasSearchFilter) {
        console.log("Filter Value:", filterValue);
        filteredResults = filteredResults.filter(result =>
          String(result.codigo).toLowerCase().includes(filterValue.toLowerCase()) ||
          result.fecha.toLowerCase().includes(filterValue.toLowerCase()) ||
          String(result.analisis).toLowerCase().includes(filterValue.toLowerCase()) ||
          result.variable.toLowerCase().includes(filterValue.toLowerCase()) ||
          result.valor.toLowerCase().includes(filterValue.toLowerCase()) ||
          result.estado.toLowerCase().includes(filterValue.toLowerCase())
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
  
    const { resultadoSeleccionado, seleccionarResultado }  = useContext(ResultadoContext)
  
    const renderCell = React.useCallback((result, columnKey) => {
      const cellValue = result[columnKey];
  
      switch (columnKey) {
        case "estado":
          return (
            <Chip
                className="capitalize border-none gap-1 text-default-600"
                color={statusColorMap[result.estado]}
                size="sm"
                variant="dot"
            >
                {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="flex flex-row">
              <VscEye className='cursor-pointer text-3xl text-black mr-5' onClick={() => ver(result.codigo)} />
              {result.estado === 'activo' || result.estado === 'calificado' ? (
                <ButtonActualizar click={() =>  handleToggle('update', setResultadoSeleccionado(result))} />
              ) : (
                ''
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
              <Button className="text-xl bg-[#273468] text-white" endContent={<PlusIcon />} onClick={() => handleToggle('create')}>
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
      );
    }, [filterValue,
      onClear,
      onSearchChange,
      results,
      statusFilter,
      selectedKeys,
      analisisValue,
      selectedAnalysis,
      handleAnalysisChange,
      statusOptions,
      onStatusFilter,
      onRowsPerPageChange]);
  
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
            <Button className="text-xl bg-[#273468] text-white" isDisabled={pages === 1} size="md" variant="solid" onPress={onPreviousPage}>
              Atras
            </Button>
            <Button className="text-xl bg-[#273468] text-white" isDisabled={pages === 1} size="md" variant="ghost" onPress={onNextPage}>
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
                className="bg-[#273468] text-white text-lg"
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
              <TableRow key={item.codigo} >
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
    const [mensaje, setMensaje] = useState('')
    const [results, setResults] = useState([]);
    const { resultadoSeleccionado, setResultadoSeleccionado } = useContext(ResultadoContext)
    const [datosSensorial, setDatosSensorial] = useState([])
    const [modalVer, setModalVer] = useState(false)

  useEffect(() => {
    fetchData();
  }, []);

  const ver = (codigo) => {
    setModalVer(true)
    axiosClient.get(`/analisis/buscarSensorial/${codigo}`).then((response) => {
      console.log('Datos de sensorial', response.data)
      setDatosSensorial(response.data)
    })
  }

  const fetchData = async () => {
    try {
      const response = await axiosClient.get('/analisis/sensorial');
      const formattedResults = response.data.map((result) => ({
        ...result,
        fecha: formatDate(result.fecha),
      }));
      console.log('Datos sensoriales aqui:', formattedResults);
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
            uid: "codigo",
            name: "Código",
            sortable: true 
        },
        { 
            uid: "fecha",
            name: "Fecha",
            sortable: true,
            render: (fecha) => formatDate(fecha)
        },
        {
            uid: "catador",
            name: 'Catador',
            sortable: true            
        },
        {
            uid: "nombre",
            name: 'Caficultor',
            sortable: true            
        },
        {
            uid: "nombre_finca",
            name: 'Finca',
            sortable: true            
        },
        { 
            uid: "estado",
            name: "Estado",
            sortable: true 
        },
        { 
            uid: 'actions',
            name: "Acciones",
            sortable: true,
            
        },
      ];
    
      const handleCalificado = (analisis) => {
        axiosClient.put(`/analisis/calificar/${analisis}`, null)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error('Error del servidor:', error);
        });
      };
      
      const handleSubmit = (data, e) => {
        e.preventDefault()
        try {
          if(mode === 'create'){
            axiosClient.post(`/resultados/sensorial`, data).then((response) => {
              console.log(response.data)
              if(response.status == 200){
                setMensaje(response.data.message)
                setModalAcciones(true)
                setModalOpen(false)
                handleCalificado(data.fk_analisis)
                fetchData()
              }else{
                setMensaje(response.data.message)
                setModalAcciones(true)
                setModalOpen(false)
              }
            })
          }else if(mode === 'update'){
            axiosClient.put(`/resultados/actualizarSensory/${resultadoSeleccionado.codigo}`, data).then((response) => {
              console.log(response.data)
              if(response.status == 200){
                setMensaje(response.data.message)
                setModalAcciones(true)
                setModalOpen(false)
                handleCalificado(data.fk_analisis)
                fetchData()
              }else{
                setMensaje(response.data.message)
                setModalAcciones(true)
                setModalOpen(false)
              }
            })
          }
          
        } catch (error) {
          setMensaje('Error del servidor' , error)
          setModalAcciones(true)
        }
      } 

    const handleToggle = (mode) => {
        setModalOpen(true)
        setMode(mode)
    }    
        const [analisis, setAnalisis] = useState('');

        const stored = localStorage.getItem('user');
        const user = stored ? JSON.parse(stored) : null;
      
        useEffect(() => {
          axiosClient.get(`/analisis/analisisSensorialCatador/${user.identificacion}`).then((response) => {
            console.log(response.data)
            setAnalisis(response.data)
          })
        },[])

  return (
    
      <div className='bg-[#EAEDF6] h-screen max-h-max'>
          <Header title="Resultado de los análisis sensoriales" />
            <div className='bg-[#EAEDF6]'>
              <div className='w-full max-w-[90%] ml-28 items-center p-10 flex-auto'>

                <Modal size='full' isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                  <ModalContent>
                    <ModalHeader> {mode === 'create' ? 'Registro de análisis sensorial' : 'Actualizar datos de análisis sensorial'} </ModalHeader>
                    <ModalBody>
                      <SliderVertical 
                        handleSubmit={handleSubmit}
                        mode={mode}
                      />
                    </ModalBody>
                  </ModalContent>
                </Modal>

              <AccionesModal 
                isOpen={modalAcciones}
                onClose={() => setModalAcciones(false)}
                label={mensaje}
              />

              <VerSensorial 
                open={modalVer}
                onClose={() => setModalVer(false)}
                data={datosSensorial}
              />
              <Ejemplo 
                data={data}
                results={results}
              />
                  
                  
              </div>

            </div>
      </div>
  )
}
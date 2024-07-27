import React, { useContext, useEffect, useRef, useState } from 'react'
import { Header } from './../molecules/Header.jsx'
import AccionesModal from '../organisms/ModalAcciones.jsx';
import ResultadosModal from './../templates/Resultados.jsx';
import { ResultadoProvider } from '../../context/ResultadosContext.jsx';
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
  ModalHeader,
  ModalFooter
} from "@nextui-org/react";
import { PlusIcon } from "./../atoms/PlusIcon.jsx";
import { SearchIcon } from "./../atoms/SearchIcon.jsx";
import { ChevronDownIcon } from "./../atoms/ChevronDownIcon.jsx";
import { ButtonActualizar } from "../atoms/ButtonActualizar.jsx";
import { ButtonDesactivar } from "../atoms/ButtonDesactivar.jsx";
import ButtonActivar from "../atoms/ButtonActivar.jsx";
import axiosClient from "../axiosClient.js";
import ResultadoContext from '../../context/ResultadosContext.jsx';

export function ResultadosCatador () {

  
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
    }
  
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
              <Button className="text-xl bg-[#273468] text-white" endContent={<PlusIcon />} onClick={() => setModalRegister(true)}>
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
    const [mode, setMode] = useState('update')
    const [mensaje, setMensaje] = useState('')
    const [results, setResults] = useState([]);
    const { resultadoSeleccionado, setResultadoSeleccionado } = useContext(ResultadoContext)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosClient.get('/resultados/listar');
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
            uid: "analisis",
            name: "Análisis", 
            sortable: true 
        },
        { 
            uid: "variable",
            name: "Variable",
            sortable: true 
        },
        { 
            uid: "valor",
            name: "Valor",
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
    
      const handleCalificado = () => {
        if (selectedAnalysis) {
          axiosClient.put(`/analisis/calificar/${selectedAnalysis}`, null)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.error('Error del servidor:', error);
            });
        } else {
          console.error('No analysis selected.');
        }
      };
      

    const handleSubmit = async (datosForm, e) => {
        console.log(datosForm);
        e.preventDefault()
        try {
            if(mode === 'update'){

              axiosClient.put(`/resultados/actualizar/${resultadoSeleccionado.codigo}`, datosForm).then((response) => {
                  console.log(response)
                  if(response.status == 200){
                      setMensaje(response.data.message)
                      setModalAcciones(true)
                      setModalOpen(false)
                      fetchData()
                  }else{
                      alert('Error de actualizar')
                  }
              })
            } 
            setModalOpen(false)
        } catch (error) {
            console.log('Error del servidor' + error)
            alert('Error del servidor' + error)
        }
    }

    const handleToggle = (mode) => {
        setModalOpen(true)
        setMode(mode)
    }

  
    
        const [variables, setVariables] = useState([]);
        const [currentIndex, setCurrentIndex] = useState(0);
        const [variablesBase, setVariablesBase] = useState([]);
        const [selectedDate, setSelectedDate] = useState(new Date());
        const [selectedAnalysis, setSelectedAnalysis] = useState('');
        const [analisis, setAnalisis] = useState([])
        const [modalRegister, setModalRegister] = useState(false)
        
        useEffect(() => {
          axiosClient.get('/variables/listarVariable')
            .then((response) => {
              console.log(response.data)
              setVariablesBase(response.data);
              setVariables(Array(response.data.length).fill(''));
            })  
            .catch((error) => {
              console.error('Error fetching variables:', error);
            });
        }, []);

        const stored = localStorage.getItem('user');
        const user = stored ? JSON.parse(stored) : null;
      
        useEffect(() => {
          axiosClient.get(`/analisis/analisisFisicosCatador/${user.identificacion}`).then((response) => {
            console.log(response.data)
            setAnalisis(response.data)
          })
        },[])

        const handleChange = (e, index) => {
          const newVariables = [...variables];
          newVariables[index] = e.target.value;
          setVariables(newVariables);
        };
      
        const handleDateChange = (e) => {
          setSelectedDate(e.target.value);
        };
      
        const handleAnalysisChange = (e) => {
          setSelectedAnalysis(e.target.value);
        };
      
        const handleSubmitRegister = async () => {
          try {

            const emptyFields = variables.some(variable => variable === '');
            if (emptyFields) {
              setMensaje('Todos los campos son obligatorios.');
              setModalAcciones(true);
              return;
            }

            const successfulResponses = [];
        
            for (let i = 0; i < variables.length; i++) {
              const variable = variables[i];
              const variableBase = variablesBase[i];
        
              const data = {
                fk_analisis: selectedAnalysis,
                fecha: new Date(selectedDate).toISOString(),
                fk_variables: variableBase?.v_codigo,
                valor: variable,
              };
        
              const response = await axiosClient.post('/resultados/registrar', data);
              if (response.status === 200) {
                successfulResponses.push(response.data.message);
              }
            }
        
            if (successfulResponses.length === variables.length) {
              setMensaje('Resultado registrado con éxito');
              setModalAcciones(true);
              setModalRegister(false);
              handleCalificado();
              fetchData();
            }
          } catch (error) {
            console.error('Error al enviar variables:', error);
          }
        };

        useEffect(() => {
          const pesoCps = parseFloat(variables[0]) || 0
          const pesoTotalAlmendra = parseFloat(variables[2]) || 0;  
          const mallasMenores = parseFloat(variables[29]) || 0
          const negroParcial = parseFloat(variables[5]) || 0
          const flojo = parseFloat(variables[11]) || 0
          const cardenillo = parseFloat(variables[20]) || 0
          const decolorado = parseFloat(variables[26]) || 0

          const pesoCiscoTotal = pesoCps - pesoTotalAlmendra;
          const pesoDefectos = (negroParcial + flojo) + (cardenillo + decolorado)
          const pesoAlmendraSana = pesoTotalAlmendra - (pesoDefectos + mallasMenores);

          const mermaTrilla = pesoCps !== 0 ? (pesoCiscoTotal / pesoCps) * 100 : 0;
          const porcentajeAlmendraSana = pesoCps !== 0 ? (pesoAlmendraSana / pesoCps) * 100 : 0;
          const porcentajeDefectos = pesoCps !== 0 ? (pesoDefectos / pesoCps) * 100 : 0;
          const factorRendimiento = pesoAlmendraSana !== 0 ? (pesoCps * 70) / pesoAlmendraSana : 0;
      
          const newVariables = [...variables];
          newVariables[1] = pesoCiscoTotal.toFixed(1);
          newVariables[3] = pesoDefectos.toFixed(1)
          newVariables[4] = pesoAlmendraSana.toFixed(1)
          newVariables[16] = mermaTrilla.toFixed(1)
          newVariables[17] = porcentajeAlmendraSana.toFixed(1)
          newVariables[18] = porcentajeDefectos.toFixed(1)
          newVariables[19] = factorRendimiento.toFixed(1) 
          setVariables(newVariables);
        }, [variables[0], variables[1], variables[2], variables[3], variables[4], variables[5], variables[11], variables[16], variables[17], variables[18], variables[19], variables[20], variables[26], variables[29]]);
  
      return (
        <div className='bg-[#EAEDF6] h-screen max-h-max'>
          <Header title="Resultado de los análisis físicos" />
          <div className='bg-[#EAEDF6]'>
            <div className='w-full max-w-[90%] ml-28 items-center p-10 flex-auto'>
              <Modal isOpen={modalRegister} onClose={() => setModalRegister(false)} size='5xl'>
                <ModalContent>
                  <ModalHeader> Registro de resultados de análisis físico </ModalHeader>
                  <ModalBody className='overflow-y-auto max-h-[70vh]'>
                    <div className='flex flex-col justify-center items-center'>
                      <div className='w-96'>
                        <Input 
                          className='m-2'
                          type='date' 
                          value={selectedDate} 
                          label='Selecciona la fecha' 
                          onChange={handleDateChange} 
                          required={true}
                        />
                        <Select 
                          className='m-2'
                          label="Seleccione el análisis" 
                          value={selectedAnalysis} 
                          onChange={handleAnalysisChange} 
                          required={true}
                        >
                          {analisis.map(analisi => (
                            <SelectItem key={analisi.codigo} value={analisi.codigo} textValue={analisi.codigo}>
                              {analisi.codigo}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                      <div className='flex flex-row'>
                        <div className='w-60 m-5'>
                          {variablesBase.slice(0, Math.ceil(variablesBase.length / 3)).map((variable, index) => (
                            <Input
                              className='m-5'
                              label={variable.nombre}
                              key={index}
                              type='text'
                              value={variables[index]}
                              onChange={(e) => handleChange(e, index)}
                              required={true}
                            />
                          ))}
                        </div>
                        <div className='w-60 m-5'>
                          {variablesBase.slice(Math.ceil(variablesBase.length / 3), 2 * Math.ceil(variablesBase.length / 3)).map((variable, index) => (
                            <Input
                              className='m-5'
                              key={index + Math.ceil(variablesBase.length / 3)}
                              type='text'
                              label={variable.nombre}
                              value={variables[index + Math.ceil(variablesBase.length / 3)]}
                              onChange={(e) => handleChange(e, index + Math.ceil(variablesBase.length / 3))}
                              required={true}
                            />
                          ))}
                        </div>
                        <div className='w-60 m-5'>
                          {variablesBase.slice(2 * Math.ceil(variablesBase.length / 3)).map((variable, index) => (
                            <Input
                              className='m-5'
                              key={index + 2 * Math.ceil(variablesBase.length / 3)}
                              type='text'
                              label={variable.nombre}
                              value={variables[index + 2 * Math.ceil(variablesBase.length / 3)]}
                              onChange={(e) => handleChange(e, index + 2 * Math.ceil(variablesBase.length / 3))}
                              required={true}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button className='bg-[#273468] text-white' colorScheme='teal' onClick={handleSubmitRegister}>Registrar</Button>
                    <Button onClick={() => setModalRegister(false)}>Cancelar</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
      
              <AccionesModal
                isOpen={modalAcciones}
                onClose={() => setModalAcciones(false)}
                label={mensaje}
              />
      
              <ResultadosModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title={mode === 'create' ? 'Registrar resultados' : 'Actualizar resultados'}
                actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                handleSubmit={handleSubmit}
                mode={mode}
              />
      
              <Ejemplo
                data={data}
                results={results}
              />
            </div>
          </div>
        </div>
      );
    }      

{/* <Modal isOpen={modalRegister} onClose={() => setModalRegister(false)}>
                    <ModalContent>
                      <ModalHeader> Registro de resultados de los análisis </ModalHeader>
                      <ModalBody>
                      <Select 
                          label="Seleccione el análisis"
                          value={selectedAnalysis}
                          onChange={handleAnalysisChange}
                          required
                        >
                          {analisis.map(analisi => (
                            <SelectItem key={analisi.codigo} value={analisi.codigo} textValue={analisi.codigo}>
                              {analisi.codigo}
                            </SelectItem>
                          ))}
                        </Select>
                        <Input 
                          type='date'
                          placeholder='Ingrese la fecha'
                          value={selectedDate}
                          onChange={handleDateChange}
                        />
                        {currentIndex < variables.length ? (
                          <>
                            <h2>{`Variable ${currentIndex + 1}:`} {variablesBase[currentIndex]?.nombre} </h2>
                            <Input
                              placeholder="Ingrese el valor"
                              required={true}
                              value={variables[currentIndex]}
                              onChange={(e) => handleChange(e, currentIndex)}
                            />
                            <Button className='bg-[#273468] text-white' onClick={handleNext}>Next</Button>
                          </>
                        ) : (
                          <>
                            <h2>Registro completo</h2>
                            <Button className='bg-[#273468] text-white' onClick={handleSubmitRegister}> Finalizar </Button>
                          </>
                        )}
                      </ModalBody>
                    </ModalContent>
                  </Modal> */}

/* import React, { useContext, useEffect, useRef, useState } from 'react';
import { Header } from './../molecules/Header.jsx';
import AccionesModal from '../organisms/ModalAcciones.jsx';
import ResultadosModal from './../templates/Resultados.jsx';
import { ResultadoProvider } from '../../context/ResultadosContext.jsx';
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
import axiosClient from "../axiosClient.js";
import ResultadoContext from '../../context/ResultadosContext.jsx';

export function ResultadosCatador() {
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
      { name: "Activo", uid: "activo" },
      { name: "Inactivo", uid: "inactivo" },
    ];

    const [analisisValue, setAnalisisValue] = useState([]);
    const [selectedAnalysis, setSelectedAnalysis] = useState("");
    const [results, setResults] = useState([]);

    useEffect(() => {
      axiosClient.get('/analisis/listar')
        .then((response) => {
          console.log('Datos recibidos:', response.data);
          setAnalisisValue(response.data);
        })
        .catch((error) => {
          console.error('Error al obtener datos:', error);
        });
    }, []);

    useEffect(() => {
      if (selectedAnalysis) {
        axiosClient.get(`/resultados/fisicos/${selectedAnalysis}`)
          .then((response) => {
            setResults(response.data);
          })
          .catch((error) => {
            console.error('Error al obtener resultados:', error);
          });
      } else {
        setResults([]);
      }
    }, [selectedAnalysis]);

    const handleAnalysisChange = (event) => {
      const { value } = event.target;
      console.log('Analisis seleccionado:', value);
      setSelectedAnalysis(value);
    };

    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = React.useMemo(() => {
      let filteredResults = results;

      console.log('Análisis seleccionado en el filtro:', selectedAnalysis);
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
              {result.estado === 'activo' || result.estado === 'calificado' ? (
                <ButtonActualizar click={() => handleToggle('update', setResultadoSeleccionado(result))} />
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
      setStatusFilter(selectedKeys);
    };

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
              <Button className="text-xl bg-[#273468] text-white" endContent={<PlusIcon />} onClick={() => setModalRegister(true)}>
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
                <option value="25">25</option>
              </select>
            </label>
          </div>
        </div>
      );
    }, [
      filterValue,
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
      onRowsPerPageChange
    ]);

    const bottomContent = React.useMemo(() => {
      return (
        <div className="py-2 px-2 flex justify-end">
          <Pagination
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={setPage}
          />
        </div>
      );
    }, [page, pages]);

    return (
      <Table
        isHeaderSticky
        aria-label="Resultados de analisis"
        className="max-h-[500px]"
        topContent={topContent}
        bottomContent={bottomContent}
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <TableHeader>
          <TableColumn key="codigo" allowsSorting>Codigo</TableColumn>
          <TableColumn key="fecha" allowsSorting>Fecha</TableColumn>
          <TableColumn key="analisis" allowsSorting>Análisis</TableColumn>
          <TableColumn key="variable" allowsSorting>Variable</TableColumn>
          <TableColumn key="valor" allowsSorting>Valor</TableColumn>
          <TableColumn key="estado" className="text-center">Estado</TableColumn>
          <TableColumn key="actions" className="text-center">Acciones</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No hay resultados para mostrar"}>
          {sortedItems.map((result) => (
            <TableRow key={result.id}>
              {(columnKey) => (
                <TableCell>{renderCell(result, columnKey)}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  const [modalOpen, setModalOpen] = useState(false)
    const [ modalAcciones, setModalAcciones ] = useState(false)
    const [mode, setMode] = useState('update')
    const [mensaje, setMensaje] = useState('')
    const { resultadoSeleccionado, setResultadoSeleccionado } = useContext(ResultadoContext)

    const handleCalificado = () => {
      if (selectedAnalysis) {
        axiosClient.put(`/analisis/calificar/${selectedAnalysis}`, null)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error('Error del servidor:', error);
          });
      } else {
        console.error('No analysis selected.');
      }
    };
    

  const handleSubmit = async (datosForm, e) => {
      e.preventDefault()
      console.log(datosForm);
      try {
          if(mode === 'update'){

            axiosClient.put(`/resultados/actualizar/${resultadoSeleccionado.codigo}`, datosForm).then((response) => {
                console.log(response)
                if(response.status == 200){
                    setMensaje(response.data.message)
                    setModalAcciones(true)
                    setModalOpen(false)
                    fetchData()
                }else{
                    alert('Error de actualizar')
                }
            })
          } 
          setModalOpen(false)
      } catch (error) {
          console.log('Error del servidor' + error)
          alert('Error del servidor' + error)
      }
  }

  const handleToggle = (mode) => {
      setModalOpen(true)
      setMode(mode)
  }


  
      const [variables, setVariables] = useState([]);
      const [currentIndex, setCurrentIndex] = useState(0);
      const [variablesBase, setVariablesBase] = useState([]);
      const [selectedDate, setSelectedDate] = useState(new Date());
      const [selectedAnalysis, setSelectedAnalysis] = useState('');
      const [analisis, setAnalisis] = useState([])
      const [modalRegister, setModalRegister] = useState(false)
      
    
      const handleChange = (e, index) => {
        const newVariables = [...variables];
        newVariables[index] = e.target.value;
        setVariables(newVariables);
      };
    
      const handleNext = () => {
        setCurrentIndex(currentIndex + 1);
      };
    
      const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
      };
    
      const handleAnalysisChange = (e) => {
        setSelectedAnalysis(e.target.value);
      };
    
      useEffect(() => {
        axiosClient.get('/variables/listarVariable')
          .then((response) => {
            console.log(response.data)
            setVariablesBase(response.data);
            setVariables(Array(response.data.length).fill(''));
          })  
          .catch((error) => {
            console.error('Error fetching variables:', error);
          });
      }, []);

      const stored = localStorage.getItem('user');
      const user = stored ? JSON.parse(stored) : null;
    
      useEffect(() => {
        axiosClient.get(`/analisis/analisisFisicosCatador/${user.identificacion}`).then((response) => {
          console.log(response.data)
          setAnalisis(response.data)
        })
      },[])
      
      const handleSubmitRegister = async () => {
        try {
         
          for (let i = 0; i < variables.length; i++) {
            const variable = variables[i]
            const variableBase = variablesBase[currentIndex]
            
            const data = {
              fk_analisis: selectedAnalysis,
              fecha: new Date(selectedDate).toISOString(),
              fk_variables: variablesBase[i]?.v_codigo, 
              valor: variable 
            };
      
            await axiosClient.post('/resultados/registrar', data).then((response) => {
              console.log('Selected Analysis:', selectedAnalysis); 
              console.log(`Variable ${i + 1} registrada correctamente:`, data);
              console.log(response.data)
              if(response.status == 200){
                  setMensaje(response.data.message)
                  setModalAcciones(true)
                  setModalRegister(false)
                  handleCalificado()
                  fetchData()
              }
            })
      
            
          }
          setModalRegister(false);
        } catch (error) {
          console.error('Error al enviar variables:', error);
        }
    };

  return (
    <ResultadoProvider>
      <div className='bg-[#EAEDF6] h-screen max-h-max'>

        <Header title="Resultados" />
          <div className='w-full max-w-[90%] ml-28 items-center p-10 flex-auto'>
            <Ejemplo />

          <Modal isOpen={modalRegister} onClose={() => setModalRegister(false)}>
            <ModalContent>
              <ModalHeader> Registro de resultados de los análisis </ModalHeader>
              <ModalBody>
              <Select 
                  label="Seleccione el análisis"
                  value={selectedAnalysis}
                  onChange={handleAnalysisChange}
                  required
                >
                  {analisis.map(analisi => (
                    <SelectItem key={analisi.codigo} value={analisi.codigo} textValue={analisi.codigo}>
                      {analisi.codigo}
                    </SelectItem>
                  ))}
                </Select>
                <Input 
                  type='date'
                  placeholder='Ingrese la fecha'
                  value={selectedDate}
                  onChange={handleDateChange}
                />
                {currentIndex < variables.length ? (
                  <>
                    <h2>{`Variable ${currentIndex + 1}:`} {variablesBase[currentIndex]?.nombre} </h2>
                    <Input
                      placeholder="Ingrese el valor"
                      required={true}
                      value={variables[currentIndex]}
                      onChange={(e) => handleChange(e, currentIndex)}
                    />
                    <Button color='primary' onClick={handleNext}>Next</Button>
                  </>
                ) : (
                  <>
                    <h2>Registro completo</h2>
                    <Button color='primary' onClick={handleSubmitRegister}>Registrar</Button>
                  </>
                )}
              </ModalBody>
            </ModalContent>
          </Modal>

          <AccionesModal 
            isOpen={modalAcciones}
            onClose={() => setModalAcciones(false)}
            label={mensaje}
          />
          
          <ResultadosModal 
            open={modalOpen} 
            onClose={() => setModalOpen(false)} 
            title={mode === 'create' ? 'Registrar resultados' : 'Actualizar resultados'}
            actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
            handleSubmit={handleSubmit}
            mode={mode}
          />
          </div>
        </div>
    </ResultadoProvider>
  );
} */
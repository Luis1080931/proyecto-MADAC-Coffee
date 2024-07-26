import React, { useState, useEffect, useContext } from 'react';
import { Header } from '../molecules/Header.jsx';
import AccionesModal from '../organisms/ModalAcciones.jsx';
import FincasModal from '../templates/Fincas.jsx'; 
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
  import { PlusIcon } from "./../atoms/PlusIcon.jsx"
  import { SearchIcon } from "./../atoms/SearchIcon.jsx";
  import { ChevronDownIcon } from "./../atoms/ChevronDownIcon.jsx";
  import { ButtonActualizar } from "../atoms/ButtonActualizar.jsx";
  import { ButtonDesactivar } from "../atoms/ButtonDesactivar.jsx";
  import ButtonActivar from "../atoms/ButtonActivar.jsx";
  //!Importamos el contexto de fincas nuevamente
  import FincasContext from '../../context/FincasContext.jsx';

export function Fincas() {

const statusColorMap = {
  activo: "primary",
  inactivo: "danger",
};
//!El dom web es el que nos ayuda a que al momento de ingresar a alguna ruta para que no se recargen todos los archivos nuevamente 

function Ejemplo() {

  //!el filterValue almacenara el valor del filtro de busqueda
  const [filterValue, setFilterValue] = React.useState("");
  //!el selectedkeys almacenara la claves de la fincas seleccionadas
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  //!el statusFilter amacena el valor del filtro de estado activo o inactivo
  const [statusFilter, setStatusFilter] = React.useState("all");
  //!el rowsPerpAge almacena la cantidad de filas a mostrar por pagina de tabla
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  //! el sortDescriptor, nos dira cual va a ser la direccion de ordenamiento
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "fecha",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);
 
  const statusOptions = [
    {name: "Activo", uid: "activo"},
    {name: "Inactivo", uid: "inactivo"},
  ];

  //*EL hasSearchFilter, nos indica si hay un filtro de busqueda activo
  const hasSearchFilter = Boolean(filterValue);

  {/*//!Aqui se utiliza el filteredItem y el use memo para memorizar el resultado del filtrado */}
  const filteredItems = React.useMemo(() => {
    let filteredFincas = fincas;

    //*el use efect se utliza para ejecutar funciones de manera inmediata
    //*el use estate para almacenar estados y contener los datos en forma de array


    {/*//!aqui nos esta diciendo que si existe un valor se filtrara por todos estos datos, osea por el nombre, por el codigo etc*/}
    if (hasSearchFilter) {
      filteredFincas = filteredFincas.filter(finca =>
        finca.nombre_finca.toLowerCase().includes(filterValue.toLocaleLowerCase()) ||
        String(finca.codigo).toLowerCase().includes(filterValue.toLowerCase()) ||
        String(finca.dimension_mt2).toLowerCase().includes(filterValue.toLowerCase()) ||
        String(finca.fk_caficultor).toLowerCase().includes(filterValue.toLowerCase()) ||
        String(finca.municipio).toLowerCase().includes(filterValue.toLowerCase()) ||
        finca.vereda.toLowerCase().includes(filterValue.toLowerCase()) ||
        finca.estado.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    {/*//!aqui se esta diciendo que si existe un filtro de estado se filtrara por este estado*/}
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredFincas = filteredFincas.filter(finca =>
        Array.from(statusFilter).includes(finca.estado)
      );
    }

    return filteredFincas;
  }, [fincas, filterValue, statusFilter]);

  {/*//! pages nos calcula el numero total de paginas */}
  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  {/*//!items esta utilizando memo para memorizar los elementos a mostrar en la pagina actual basandose en filteredItem y rowsPerPages */}
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  {/*//!en sortedItems Utiliza useMemo para memorizar los elementos ordenados basandose en sortDescriptor y items */}
  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);


  const renderCell = React.useCallback((finca, columnKey) => {
    const cellValue = finca[columnKey];

    switch (columnKey) {
      case "estado":
        return (
          <Chip
                className="capitalize border-none gap-1 text-default-600"
                color={statusColorMap[finca.estado]}
                size="sm"
                variant="dot"
            >
                {cellValue}
            </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            {/*//!COOMO PODEMOS OBSERVAR AQUI UTILIZAMOS EL SETIDFINCA PARA CAMBIAR EL ESTADO A UPDATE, el setIdFinca es el que nosotros extrajimos del context
            //!CADA VEZ QUE YO PRECIONE EL BOTON DE ACTUALIZAR SE ESTARA EJECUTANDO LA FUNCION DE HANLDETOGGLE ESTE HANLDE TOGLE, ESTE MODO DE UPDATE POSTEIORMNETE
            //!SE ESTARA PASANDO EN EL FINCASMODAL, ESTE MODO VIAJARA DESDE AQUI AL TEMPLATE Y DEL TEMPLATE AL FORMULARIO Y JECUTARA LA FUNCION DEL USEFFECT
            //?usted se preguntara como se hara para saber cual es el id que se va a actulizar? en el SetIdFinca se esta pasando el finca todo la finca con los datos y luego esto viaja al contexto, ahi lo explico
            */}
            <ButtonActualizar click={() => handleToggle('update', setIdFinca(finca))} />
            {finca.estado === 'activo' ? (
              <ButtonDesactivar click={() => peticionDesactivar(finca.codigo)} />
            ) : (
              <ButtonActivar click={() => handleActivar(finca.codigo)} />
            )}
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  {/*//!elNextPage hace que se incremente la pagina actual, si no es la ultima*/}
  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);
{/*//!y esta lo que hace es merma si la pagina actual no es la primera */}
  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);
{/*//!esto cambia la catidad de filas por pagina */}
  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);


  {/*//!Actualiza filterValue y resetea la página a 1 cuando el valor de búsqueda cambia */}
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

  {/*//!Actualiza statusFilter cuando cambia la selección en el dropdown de estado */}
  const onStatusFilter = (selectedKeys) => {
    setStatusFilter(selectedKeys)
  }

  const topContent = React.useMemo(() => {
    return (
      <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          {/*//!este input es que nos ayuda a filtrar por texto,el onValieChanfe maneja el cambio de valor actualizado de filtervalue */}
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
  
  {/* este dropdown es para filtrar por estado, el onSelectionChange maneja el cambio de seleccion actualizado de statusFilter */}
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
          <span className="text-default-400 text-xl">Total {fincas.length} fincas</span>
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
    filteredItems,
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
          <Button className="text-xl bg-[#273468] text-white" isDisabled={pages === 1} size="md" variant="solid" onPress={onPreviousPage}>
            Atras
          </Button>
          <Button className="text-xl bg-[#273468] text-white" isDisabled={pages === 1} size="md" variant="ghost" onPress={onNextPage}>
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
        className="bg-[#273468] text-white text-lg"
        key={column.uid}
        align={column.uid === "actions" ? "center" : "start"}
        allowsSorting={column.sortable}
      >
        {column.name}
      </TableColumn>
    )}
  </TableHeader>
  <TableBody emptyContent={"No hay fincas registradas"} items={sortedItems}>
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

    const [modalOpen, setModalOpen] = useState(false);
    const [modalAcciones, setModalAcciones] = useState(false)
    const [mode, setMode] = useState('create');
    const [mensaje, setMensaje] = useState('')
    const [fincas,setFincas] = useState([]);
    //!Aqui del contexto extraemos el setIdFinca y el idFinca, el setIdFinca lo utilizamos cuando nosotrso queremos actualizar en la parte de arriba los explico
    const { setIdFinca, idFinca } = useContext(FincasContext)

    useEffect(()=>{
        
        peticionGet();

    },[]);

    //!PETICION GET PARA TRAER LOS DATOS DE LAS FINCAS REGISTRADAS

    const peticionGet = async () => {
        try {
            await axiosClient.get('/fincas/listar').then((response)=>{
                console.log(response.data)
                setFincas(response.data)
            })        

          } catch (error) {
            console.error('Error al obtener los datos:', error);
          }
        };
      

//!COLUMNAS DEL DATA_TABLE

const data = [
    {
        uid:'codigo',
        name:'Codigo',
        sortable:true
    },
    {
        uid:'nombre_finca',
        name: 'Nombre',
        sortable:true
    },
    {
        uid: 'dimension_mt2',
        name:'Dimensión(mt2)',
        sortable:true
    },
    {
       uid:'fk_caficultor',
       name:'Caficultor',
       sortable:true
    },
    {
        uid:'municipio',
        name:'Municipio',
        sortable:true
    },
    {
        uid:'vereda',
        name:'Vereda',
        sortable:true
    },
    {
        uid:'estado',
        name:'Estado',
        sortable:true
    },
    {
        uid:'actions',
        name: "Acciones",
        sortable:true
    }
    
];

    //!PETICION PARA DESACTIVAR FINCAS    

    const peticionDesactivar = async (codigo) => {
        try {
            axiosClient.put(`/fincas/desactivar/${codigo}`,null).then((response)=>{
                console.log(response.data)
                if(response.status==200){
                    setMensaje(response.data.message)
                    setModalAcciones(true)
                    peticionGet()
                }else{
                    alert('Error')
                }
            });
        }catch(error){
            alert('Error del servidor '+error)
        }
    }

    const handleActivar = async (codigo) => {
        axiosClient.put(`/fincas/activar/${codigo}`).then((response) => {
            console.log(response.data)
            if(response.status==200){
                setMensaje(response.data.message)
                setModalAcciones(true)
                peticionGet()
            }else{
                setMensaje(response.data.message)
                setModalAcciones(true)
            }
        })
    }


     //! PETICION PARA ACTIVAR FINCAS
    const handleSubmit=async(data,e)=>{
        console.log(data);
        e.preventDefault()

        try{
        
        if(mode === 'create'){
            
            await axiosClient.post('/fincas/registrar', data).then((response)=>{
                console.log(response)

                if(response.status == 200){
                    setMensaje(response.data.message)
                    setModalAcciones(true)
                    setModalOpen(false)
                    peticionGet()
                }else{
                    alert('Error en el registro')
                }
            })
        }else if(mode==='update'){

            await axiosClient.put(`/fincas/actualizar/${idFinca.codigo}`,data).then((response)=>{
                console.log(response.data); 

                if(response.status==200){
                    setMensaje(response.data.message)
                    setModalAcciones(true)
                    setModalOpen(false)
                    peticionGet()
                }else{
                    alert('Error al actualizar')
                }
            })
        }
        setModalOpen(false)

        }catch(error){
            console.log('Error en el servidor ', error)
            alert('Error en el servidor'+error)
        }
    }


    const handleToggle = (mode) => {
        setModalOpen(true);
        setMode(mode);
    };

    return (
        <div>
          <div className='bg-[#EAEDF6] h-screen max-h-max'>
          <Header title="Fincas"/>
              <div className='bg-[#EAEDF6]'>
                <div className='w-full max-w-[90%] ml-28 items-center p-10'>

                    <AccionesModal
                        isOpen={modalAcciones}
                        onClose={()=>setModalAcciones(false)}
                        label={mensaje}
                    />
                    <FincasModal
                        open={modalOpen} 
                        onClose={() => setModalOpen(false)} 
                        title={mode === 'create' ? 'Registrar resultados' : 'Actualizar fincas'}
                        actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                        handleSubmit={handleSubmit}
                        mode={mode}
                    />

                    <Ejemplo 
                        data={data}
                        fincas={fincas}
                    />
                </div>

              </div>
          </div>
            
        </div>
    );
}
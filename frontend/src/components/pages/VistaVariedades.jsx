import React, { useEffect, useState } from 'react';
import Sidebar2 from '../organisms/Sidebar2';
import Navbar2 from '../organisms/Navbar2';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Input, Button, Switch } from "@nextui-org/react";
import axios from 'axios';
import { ModalRegistrarVariedades } from '../NextUIMaria/ModalRegistrarVariedades';
import { ModalActualizarVariedades } from '../NextUIMaria/ModalActualizarVariedades';

const VistaVariedades = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [filterValue, setFilterValue] = useState('');
    const [filtroActivo, setFiltroActivo] = useState(false);
    const [filtroInactivo, setFiltroInactivo] = useState(false);

    const token = localStorage.getItem('token');

    const cambiarEstado = async (id) => {
        await axios.put(`http://localhost:3000/variedades/desactivar/${id}`).then((response) => {
            console.log(response.data);
            fetchData();
        });
    };

    const url = 'http://localhost:3000/variedades/listar';

    const fetchData = async () => {
        try {
            const response = await axios.get(url);
            console.log("variedades", response.data);
            setData(response.data);
            setFilteredData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onSearchChange = (value) => {
        setFilterValue(value);
        setPage(1); // Reset page number when changing search filter
        filterData();
    };

    const onPageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const onRowsPerPageChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1); // Reset page number when changing rows per page
    };

    const filterData = () => {
        let filtered = data;
        filtered = filtered.filter(item => {
            if (!filtroActivo && !filtroInactivo) return true;
            if (filtroActivo && item.estado === 'activo') return true;
            if (filtroInactivo && item.estado === 'inactivo') return true;
            return false;
        });
        if (filterValue.trim() !== '') {
            filtered = filtered.filter(item => Object.values(item).some(val => typeof val === 'string' && val.toLowerCase().includes(filterValue.toLowerCase())));
        }
        setFilteredData(filtered);
    };
    

    useEffect(() => {
        filterData();
    }, [filtroActivo, filtroInactivo, filterValue]);

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = filteredData.slice(start, end);

    const columns = [
        { key: "id", label: "ID" },
        { key: "nombre", label: "NOMBRE" },
        { key: "codigo", label: "CODIGO" },
        { key: "estado", label: "ESTADO" },
        { key: "acciones", label: "ACCIONES" },
    ];

    return (
        <div className='bg-gray-100 w-full h-screen flex'>
            <Sidebar2 />
            <div className='w-full flex flex-col overflow-auto'>
                <div className='h-16'>
                    <Navbar2 />
                </div>

                <div className='p-8 border w-full overflow-y-auto' style={{ height: 'calc(100vh - 16px)' }}>
                    <div className='flex justify-start gap-3 my-10'>
                        <Input
                            isClearable
                            className="w-full sm:max-w-[44%]"
                            placeholder="Search..."
                            value={filterValue}
                            onClear={() => onSearchChange('')}
                            onValueChange={onSearchChange}
                        />
                        <select
                            className='rounded-lg'
                            value={rowsPerPage}
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </div>

                    <div>
                        <ModalRegistrarVariedades fetchData={fetchData} />
                    </div>

                    <div className='my-2 flex gap-x-2'>
                    <Button
                            onClick={() => {
                                setFiltroActivo(false);
                                setFiltroInactivo(false);
                            }}
                            color={!filtroActivo && !filtroInactivo ? 'secondary' : 'default'}
                        >
                            Todos
                        </Button>
                        
                        <Button
                            onClick={() => {
                                setFiltroActivo(true);
                                setFiltroInactivo(false);
                            }}
                            color={filtroActivo ? 'secondary' : 'default'}
                        >
                            Activos
                        </Button>
                        <Button
                            onClick={() => {
                                setFiltroActivo(false);
                                setFiltroInactivo(true);
                            }}
                            color={filtroInactivo ? 'secondary' : 'default'}
                        >
                            Inactivos
                        </Button>
                 
                    </div>

                    <Table aria-label="Example table with dynamic content">
                        <TableHeader columns={columns}>
                            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                        </TableHeader>
                        <TableBody>
                            {paginatedData.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index}</TableCell>
                                    <TableCell>{item.nombre}</TableCell>
                                    <TableCell>{item.codigo}</TableCell>
                                    <TableCell>
                                        <div className='w-14 inline-block'>
                                            {item.estado}
                                        </div>
                                        <Switch
                                            defaultSelected={item.estado === 'activo'}
                                            color="success"
                                            onChange={() => cambiarEstado(item.codigo)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <ModalActualizarVariedades item={item} fetchData={fetchData} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Pagination
                        className='my-4'
                        showControls
                        page={page}
                        total={filteredData.length}
                        onChange={onPageChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default VistaVariedades;

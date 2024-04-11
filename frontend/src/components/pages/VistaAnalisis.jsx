import React, { useEffect, useState } from 'react';
import Sidebar2 from '../organisms/Sidebar2';
import Navbar2 from '../organisms/Navbar2';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Input, Button, Switch } from "@nextui-org/react";
import axios from 'axios';
import { ModalRegistrarAnalisis } from '../NextUIMaria/ModalRegistrarAnalisis';
import { ModalActualizarAnalisis } from '../NextUIMaria/ModalActualizarAnalisis';


export const VistaAnalisis = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [filterValue, setFilterValue] = useState('');

    const token = localStorage.getItem('token');

    const cambiarEstado = async (id) => {

        await axios.put(`http://localhost:3000/analisis/desactivar/${id}`).then((response) => {
    
          console.log(response.data)
          fetchData()
        })
      }

    const url = 'http://localhost:3000/analisis/listar';

    const fetchData = async () => {
        try {
            axios.get(url, {headers: {token: token}}).then((response) => {
                console.log(response)
                setData(response.data);
                setFilteredData(response.data);
            })
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [token]);

    const onSearchChange = (value) => {
        setFilterValue(value);
        setPage(1); // Reset page number when changing search filter
        filterData(value);
    };

    const onPageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const onRowsPerPageChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1); // Reset page number when changing rows per page
    };

    const filterData = (value) => {
        const filtered = data.filter(item =>
            Object.values(item).some(val =>
                typeof val === 'string' && val.toLowerCase().includes(value.toLowerCase())
            )
        );
        setFilteredData(filtered);
    };

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = filteredData.slice(start, end);

    const columns = [
        { key: "id", label: "ID" },
        { key: "analista", label: "ANALISTA" },
        { key: "codigo", label: "CODIGO" },

        { key: "fecha", label: "FECHA" },
        { key: "muestra", label: "MUESTRA" },
        { key: "tipo_analisis", label: "TIPO ANALISIS" },
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
                            // startContent={<SearchIcon />}
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
                        <ModalRegistrarAnalisis fetchData={fetchData} />
                    </div>

                    <Table aria-label="Example table with dynamic content">
                        <TableHeader columns={columns}>
                            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                        </TableHeader>
                        <TableBody>
                            {paginatedData.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index}</TableCell>
                                    <TableCell>{item.analista}</TableCell>
                                    <TableCell>{item.codigo}</TableCell>

                                    <TableCell>{item.fecha}</TableCell>
                                    <TableCell>{item.fk_muestra}</TableCell>
                                    <TableCell>{item.fk_tipo_analisis}</TableCell>
                                    <TableCell><div className='w-14 inline-block'>
              {item.estado}
              </div>
                <Switch
                  defaultSelected={item.estado === 'activo'}
                  color="success"
                  onChange={() => cambiarEstado(item.codigo)}
                />
              </TableCell>
                                    <TableCell>
                                      <ModalActualizarAnalisis item={item} fetchData={fetchData}/>
                                        {/* Add more actions as needed */}
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
    )
}

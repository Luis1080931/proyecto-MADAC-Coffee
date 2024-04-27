import React from "react";
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
import { PlusIcon } from "./../NextUI/PlusIcon.jsx";
import { VerticalDotsIcon } from "./../NextUI/VerticalDotsIcon.jsx";
import { SearchIcon } from "./../NextUI/SearchIcon.jsx";
import { ChevronDownIcon } from "./../NextUI/ChevronDownIcon.jsx";
import { ButtonActualizar } from "../atoms/ButtonActualizar.jsx";
import { ButtonDesactivar } from "../atoms/ButtonDesactivar.jsx";

const statusColorMap = {
  activo: "success",
  inactivo: "danger",
};

export default function TableVariedades({ clickEditar, clickDesactivar, clickRegistrar, data, results }) {

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
    let filteredResults = results;

    if (hasSearchFilter) {
      filteredResults = filteredResults.filter(result =>
        String(result.codigo).toLowerCase().includes(filterValue.toLowerCase()) ||
        result.nombre.toLowerCase().includes(filterValue.toLowerCase()) ||
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

  
const handleUpdateClick = (id) => {
 
  localStorage.setItem('idUser', id)
  clickEditar(id)
};

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
            <ButtonActualizar click={() =>  handleUpdateClick(result.codigo)} /> 
            <ButtonDesactivar click={() => clickDesactivar(result.codigo)} />
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
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
  
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
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
            <Button color="primary" endContent={<PlusIcon />} onClick={clickRegistrar}>
              Registrar
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {results.length} resultados</span>
          <label className="flex items-center text-default-400 text-small">
            Columnas por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
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
        {<span className="w-[30%] text-small text-default-400">
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
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Atras
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
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
      <TableRow key={item.codigo}>
        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
      </TableRow>
    )}
  </TableBody>
</Table>
    </div>
    
  );
}

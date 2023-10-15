"use client";
import React, { useRef, useState } from "react";
import AppBar from "../navigation/AppBar";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import Popout from "./Modal/Editinfo";

function Analyst() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 70 },
    { field: "authors", headerName: "Authors", width: 130 },
    { field: "JN", headerName: "Journal Name", width: 130 },
    { field: "year", headerName: "Year", type: "number", width: 90 },
    { field: "page", headerName: "Pages", width: 90 },
    { field: "isaccept", headerName: "IsAccept", width: 90, type: "boolean" },

    {
      field: "doi",
      headerName: "DOI",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 70,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "actions",
      headerName: "Acions",
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <button
            onClick={() => {
              setIsModalOpen(true);
              console.log("Button clicked for row id:", params.id);
            }}
          >
            Edit
          </button>
        );
      },
    },
  ];
  // Control the pop out
  function closeModal() {
    setIsModalOpen(false);
  }
  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  return (
    <div>
      <AppBar />
      <br></br>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          // checkboxSelection
        />
      </div>
      {isModalOpen && <Popout onClick={closeModal} />}
    </div>
  );
}

export default Analyst;

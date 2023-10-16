"use client";
import React, { useEffect, useState } from "react";
import AppBar from "../navigation/AppBar";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import Popout from "./Modal/Editinfo";
import axios from "axios";

function Analyst() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/published')
      .then(response => {
        const data = response.data;
        setArticles(data);
  
      data.forEach((article: Article) => {
        console.log(`Title: ${article.Title}`);
        console.log(`IsAccept: ${article.IsAccept}`);
        console.log(`isPublished: ${article.isPublished}`);
      });
      })
      .catch(error => {
        console.error("There was an error fetching the articles:", error);
      });
  }, []);

  const columns: GridColDef[] = [
    { field: "Title", headerName: "Title", width: 70 },
    { field: "Authors", headerName: "Authors", width: 130 },
    { field: "Journal", headerName: "Journal Name", width: 130 },
    { field: "Year", headerName: "Year", type: "number", width: 90 },
    { field: "Pages", headerName: "Pages", width: 90},
    { field: "isAccepted", headerName: "IsAccept", width: 90, type: "boolean" },
    { field: "isPublished", headerName: "isPublished", width: 90, type: "boolean"  },
    { field: "DOI", headerName: "DOI", width: 70, sortable: false },
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
          >DataGrid
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

  return (
    <div>
      <AppBar />
      <br />
      <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={articles}
        columns={columns}
        disableRowSelectionOnClick
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      </div>
      {isModalOpen && <Popout onClick={closeModal} />}
    </div>
  );
}

export default Analyst;

interface Article {
  _id: string;
  Title: string;
  Authors: string;
  Journal: string;
  Year: number;
  Pages: string;
  IsAccept: boolean;
  isPublished: boolean;
  DOI: string;
}
"use client"
import React, { useEffect, useState } from "react";
import AppBar from "../navigation/AppBar";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import EditInfo from "./Modal/Editinfo";
import axios from "axios";

function Analyst() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/published')
      .then(response => {
        const data = response.data;
        setArticles(data);
      })
      .catch(error => {
        console.error("There was an error fetching the articles:", error);
      });
  }, []);

  const columns: GridColDef[] = [
    { field: "Title", headerName: "Title", width: 200 },
    { field: "Authors", headerName: "Authors", width: 170 },
    { field: "Journal", headerName: "Journal Name", width: 150 },
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
              const article: Article | null = articles.find(a => a._id === params.id) || null;
              setSelectedArticle(article);
              setIsModalOpen(true);
            }}
          >
            Edit
          </button>
        );
      },
    },
  ];

  function closeModal() {
    setIsModalOpen(false);
    setSelectedArticle(null);
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
        />
      </div>
      {isModalOpen && <EditInfo onClick={closeModal} article={selectedArticle} />}
    </div>
  );
}

interface Article {
  _id: string;
  Title: string;
  Authors: string;
  Journal: string;
  Year: number;
  Pages: string;
  IsAccepted: boolean;
  isPublished: boolean;
  DOI: string;
}

export default Analyst;


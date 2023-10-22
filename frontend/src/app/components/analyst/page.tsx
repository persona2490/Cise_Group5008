"use client";
import React, { useEffect, useState } from "react";
import AppBar from "../navigation/AppBar";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import EditInfo from "./Modal/Editinfo";
import axios from "axios";
import styles from "./Modal/Popout.module.css";
function Analyst() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/published")
      .then((response) => {
        const data = response.data;
        setArticles(data);
      })
      .catch((error) => {
        console.error("There was an error fetching the articles:", error);
      });
  }, []);

  const columns: GridColDef[] = [
    {
      field: "Title",
      headerName: "Title",
      width: 220,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Authors",
      headerName: "Authors",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Journal",
      headerName: "Journal Name",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Year",
      headerName: "Year",
      type: "number",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Pages",
      headerName: "Pages",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "isAccepted",
      headerName: "IsAccept",
      width: 90,
      type: "boolean",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "isPublished",
      headerName: "isPublished",
      width: 90,
      type: "boolean",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "DOI",
      headerName: "DOI",
      width: 130,
      sortable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Acions",
      width: 120,
      sortable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div className={styles.edit}>
            <button
              onClick={() => {
                const article: Article | null =
                  articles.find((a) => a._id === params.id) || null;
                setSelectedArticle(article);
                setIsModalOpen(true);
              }}
            >
              Edit
            </button>
          </div>
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
      <div className={styles.content}>
      
        <div className={styles.content} style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={articles}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[3, 10]}
            getRowId={(row) => row._id}
          />
        </div>
        {isModalOpen && (
          <EditInfo onClick={closeModal} article={selectedArticle} />
        )}
     
      </div>
    </div>
  );
}

interface Article {
  _id: string;
  Title: String,
  Authors: [String],
  Journal: String,
  Year: Number,
  Volume: String,
  Pages: String,
  DOI: String,
  isPublished: Boolean,
  isAccepted:Boolean,
  isChecked:Boolean,
  Claim: String,
  Evidence: String,
  Research: String,
}

export default Analyst;

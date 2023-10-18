import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import styles from "./moderator.module.css";
import axios from "axios";

function Moderatorpage() {
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
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Authors",
      headerName: "Authors",
      width: 170,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Journal",
      headerName: "Journal Name",
      width: 150,
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
      width: 70,
      sortable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "accept",
      headerName: "Acions",
      headerAlign: "center",
      width: 120,
      sortable: false,
      filterable: false,
      align: "center",
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div className={styles.accept}>
            <button
              onClick={() => {
                const article: Article | null =
                  articles.find((a) => a._id === params.id) || null;
                setSelectedArticle(article);
                acceptArticle();
              }}
            >
              Accept
            </button>
          </div>
        );
      },
    },
    {
      field: "reject",
      headerName: "Reject",
      headerAlign: "center",
      width: 120,
      sortable: false,
      filterable: false,
      align: "center",
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div className={styles.reject}>
            <button
              onClick={() => {
                const article: Article | null =
                  articles.find((a) => a._id === params.id) || null;
                setSelectedArticle(article);
                rejectArticle();
              }}
            >
              Reject
            </button>
          </div>
        );
      },
    },
  ];
  function acceptArticle() {
    console.log("accept");
    window.location.reload();
  }
  function rejectArticle() {
    console.log("reject");
    window.location.reload();
  }
  function closeModal() {
    setIsModalOpen(false);
    setSelectedArticle(null);
  }

  return (
    <div>
      <br />
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={articles}
          columns={columns}
          disableRowSelectionOnClick
          getRowId={(row) => row._id}
        />
      </div>
      {/* {isModalOpen && <EditInfo onClick={closeModal} article={selectedArticle} />} */}
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

export default Moderatorpage;

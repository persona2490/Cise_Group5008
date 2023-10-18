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
      .get("http://localhost:5000/api/query_unpublished")
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
      field: "Accept",
      // headerName: "Acions",
      headerAlign: "center",
      width: 120,
      sortable: false,
      filterable: false,
      align: "center",
      renderCell: (params: GridRenderCellParams) => {
        return (
            <div className={styles.modal}>
                <button
                    onClick={() => {
                        acceptArticle(params.id as string); 
                    }}
                >
                    Accept?
                </button>
            </div>
        );
    }
    },
    {
      field: "Pulic",
      // headerName: "Reject",
      headerAlign: "center",
      width: 120,
      sortable: false,
      filterable: false,
      align: "center",
      renderCell: (params: GridRenderCellParams) => {
        return (
            <div className={styles.modal}>
                <button
                    onClick={() => {
                        rejectArticle(params.id as string);
                    }}
                >
                    Pulic?
                </button>
            </div>
        );
    }
    },
    {
      field: "Check",
      // headerName: "Reject",
      headerAlign: "center",
      width: 120,
      sortable: false,
      filterable: false,
      align: "center",
      renderCell: (params: GridRenderCellParams) => {
        return (
            <div className={styles.modal}>
                <button
                    onClick={() => {
                        rejectArticle(params.id as string);
                    }}
                >
                    Check?
                </button>
            </div>
        );
    }
    },
    {
      field: "Delete",
      // headerName: "",
      headerAlign: "center",
      width: 120,
      sortable: false,
      filterable: false,
      align: "center",
      renderCell: (params: GridRenderCellParams) => {
        return (
            <div className={styles.modal}>
                <button
                    onClick={() => {
                        rejectArticle(params.id as string);
                    }}
                >
                    Delete?
                </button>
            </div>
        );
    }
    },
  ];
  async function acceptArticle(articleId: string) {
    try {
        const response = await axios.patch(`http://localhost:5000/api/update_article/${articleId}`, {
            isAccepted: true,
            isChecked: true
        });
        console.log(response.data.message);
        window.location.reload();
    } catch (error) {
        console.error('Failed to update article:', error);
    }
}

async function rejectArticle(articleId: string) {
    try {
        await axios.patch(`http://localhost:5000/api/update_article/${articleId}`, {
            isChecked: true
        });
        console.log("Article rejected successfully.");
        window.location.reload();
    } catch (error) {
        console.error("Error rejecting the article:", error);
    }
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

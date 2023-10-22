import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import styles from "./admin.module.css";
import axios from "axios";

function Adminpage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
  
    axios
      .get("http://localhost:5000/api/articles")
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
                        publicArticle(params.id as string);
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
                        checkArticle(params.id as string);
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
                      deleteArticle(params.id as string);
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
      const response = await axios.patch(`http://localhost:5000/api/toggle-article-status/${articleId}?property=isAccepted`);
      window.location.reload(); 
      return response.data;
    } catch (error) {
      console.error('Error accepting article:', error);
      throw error;
    }
  }

  async function checkArticle(articleId: string) {
    try {
      const response = await axios.patch(`http://localhost:5000/api/toggle-article-status/${articleId}?property=isChecked`);
      window.location.reload(); 
      return response.data;
    } catch (error) {
      console.error('Error checking article:', error);
      throw error;
    }
  }

  async function deleteArticle(articleId: string) {
    try {
      const response = await axios.delete(`http://localhost:5000/api/deleteResource/${articleId}`);
      
      if (response.status === 200) {
        window.location.reload(); 
        console.log('Article deleted successfully');
      } else {
        console.error('Failed to delete article');
      }
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  }

async function publicArticle(articleId: string) {
  try {
    const response = await axios.patch(`http://localhost:5000/api/toggle-article-status/${articleId}?property=isPublished`);
    window.location.reload(); 
    return response.data;
  } catch (error) {
    console.error('Error rejecting article:', error);
    throw error;
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

export default Adminpage;

import React, { useState, useEffect } from "react";
import axios from 'axios';
import styles from "./Popout.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

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

interface EditInfoProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  article: Article | null;
}

function EditInfo({ onClick, article }: EditInfoProps) {

  const [title, setTitle] = useState(article?.Title || "");
  const [author, setAuthor] = useState(article?.Authors || "");
  const [journalName, setJournalName] = useState(article?.Journal || "");
  const [years, setYears] = useState(article?.Year.toString() || "");
  const [pages, setPages] = useState(article?.Pages || "");

  useEffect(() => {
    if (article) {
      setTitle(article.Title);
      setAuthor(article.Authors);
      setJournalName(article.Journal);
      setYears(article.Year.toString());
      setPages(article.Pages);
    }
  }, [article]);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!article || !article._id) return;

    const updatedArticle = {
      Title: title,
      Authors: author,
      Journal: journalName,
      Year: parseInt(years),
      Pages: pages, 
      isPublished: true
    };

    try {
      await axios.put(`http://localhost:5000/api/${article._id}`, updatedArticle);
      console.log("Article updated successfully!");
      onClick(event);
    } catch (error) {
      console.error("Error updating the article:", error);
    }
  };

  return (
    <div className={styles.modal}>
      <div className="Form">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              id="title"
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              required
              id="author"
              label="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <TextField
              id="JN"
              label="Journal Name"
              value={journalName}
              onChange={(e) => setJournalName(e.target.value)}
            />
            <TextField
              id="years"
              label="Years"
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
            />
            <TextField  // 移除了 type="number"
              id="pages"
              label="Pages"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
            />
          </div>
        </Box>
      </div>
      <button onClick={onClick}>Cancel</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default EditInfo;
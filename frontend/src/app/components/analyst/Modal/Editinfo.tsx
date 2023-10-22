import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Popout.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface Article {
  _id: string;
  Title: String;
  Authors: [String];
  Journal: String;
  Year: Number;
  Volume: String;
  Pages: String;
  DOI: String;
  isPublished: Boolean;
  isAccepted: Boolean;
  isChecked: Boolean;
  Claim: String;
  Evidence: String;
  Research: String;
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
  const [claim, setClaim] = useState(article ? article.Claim || "" : "");
  const [evidence, setEvidence] = useState(
    article ? article.Evidence || "" : ""
  );
  const [research, setResearch] = useState(
    article ? article.Research || "" : ""
  );

  const [method, setMethod] = React.useState("");
  const [participant, setParticipant] = React.useState("");
  
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
      isPublished: true,
      Claim: claim,
      Evidence: evidence,
      Research: research,
    };

    console.log("Updating article with data:", updatedArticle);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/${article._id}`,
        updatedArticle
      );
      onClick(event);
      
      window.location.reload();
    } catch (error) {
      console.error("Error updating the article:", error);
    }
  };
  const handleMethod = (event: SelectChangeEvent) => {
    setMethod(event.target.value as string);
  };
  const handleParticipant = (event: SelectChangeEvent) => {
    setParticipant(event.target.value as string);
  };
  return (
    <div className={styles.modal}>
      <div className="Form">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "20ch" },
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
            <TextField
              id="pages"
              label="Pages"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
            />

            <TextField
              id="claim"
              label="Claim"
              multiline
              maxRows={2}
              placeholder="Claim"
              value={claim}
              onChange={(e) => setClaim(e.target.value)}
            />

            <TextField
              id="evidence"
              label="Evidence"
              placeholder="Result of Evidence"
              value={evidence}
              onChange={(e) => setEvidence(e.target.value)}
            />
            <TextField
              id="research"
              label="Research"
              placeholder="Type of research"
              value={research}
              onChange={(e) => setResearch(e.target.value)}
            />
            <Box sx={{ minWidth: 90 }}>
              <FormControl sx={{ m: 1, minWidth: 180 }} >
                <InputLabel >Type of SE Method</InputLabel>
                <Select
                  value={method}
                  label="SEMethod"
                  onChange={handleMethod}
                >
                  <MenuItem value={"WaterFall"}>WaterFall Management</MenuItem>
                  <MenuItem value={"Agile"}>Agile Development</MenuItem>
            
                </Select>
              </FormControl>
              
              <FormControl sx={{m: 1, minWidth: 180 }} >
                <InputLabel id="demo-simple-select-label">Type of participant</InputLabel>
                <Select
                  value={participant}
                  label="participant"
                  onChange={handleParticipant}
                >
                  <MenuItem value={"Student"}>Student</MenuItem>
                  <MenuItem value={"Participant"}>Participant</MenuItem>
    
                </Select>
              </FormControl>
            </Box>
            
          </div>
        </Box>
      </div>
      <button onClick={onClick}>Cancel</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default EditInfo;

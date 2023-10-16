import React, { useState } from "react";
import Link from "next/link";
import styles from "./Popout.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function EditInfo(props: {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) {
 

  const [title, setTitle] = useState("Title");
  const [author, setAuthor] = useState("Author");
  const [journalName, setJournalName] = useState("Journal Name");
  const [years, setYears] = useState("1997");
  const [pages, setPages] = useState("30");

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Title:", title);
    console.log("Author:", author);
    console.log("Journal Name:", journalName);
    console.log("Years:", years);
    console.log("Pages:", pages);

    if (props.onClick) {
      props.onClick(event);
    }
  };

  return (
    <>
      {
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
                  defaultValue={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <TextField
                  required
                  id="author"
                  label="Author"
                  defaultValue={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
                <TextField
                  id="JN"
                  label="Journal Name"
                  defaultValue={journalName}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setJournalName(e.target.value)}
                />
                <TextField
                  id="years"
                  label="Years"
                  type="number"
                  defaultValue={years}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setYears(e.target.value)}
                />
                <TextField
                  id="pages"
                  label="Pages"
                  type="number"
                  defaultValue={pages}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setPages(e.target.value)}
                />
              </div>
            </Box>
          </div>
          <button onClick={props.onClick}>Cancel</button>

          <Link href="/components/analyst" passHref>
            <button onClick={handleSubmit}>Submit</button>
          </Link>
        </div>
      }
    </>
  );
}

export default EditInfo;

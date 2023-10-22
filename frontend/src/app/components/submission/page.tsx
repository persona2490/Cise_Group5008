"use client";
import React, { useRef, useState } from "react";
import AppBar from "../navigation/AppBar";
import classes from "./submission.module.css";
import sendDataToServer from "./sendData";
import Popout from "./Modal/Pop out";
import Backdrop from "./Modal/Backdrop";

function Submission() {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const authorsInputRef = useRef<HTMLInputElement>(null);
  const journalNameInputRef = useRef<HTMLInputElement>(null);
  const yearInputRef = useRef<HTMLInputElement>(null);
  const volumeInputRef = useRef<HTMLInputElement>(null);
  const pagesInputRef = useRef<HTMLInputElement>(null);
  const doiInputRef = useRef<HTMLInputElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  async function submitHandler(event: React.FormEvent) {
    event.preventDefault();

    const title = titleInputRef.current?.value;
    const authors = authorsInputRef.current?.value;
    const journal = journalNameInputRef.current?.value;
    const year = Number(yearInputRef.current?.value);
    const volume = volumeInputRef.current?.value;
    const pages = pagesInputRef.current?.value;
    const doi = doiInputRef.current?.value;

    const submitData = {
      Title: title,
      Authors: authors,
      Journal: journal,
      Year: year,
      Volume: volume,
      Pages: pages,
      DOI: doi,
    };

    //console.log(submitData);

    try {
      const result = await sendDataToServer(submitData);
      if (result.status == "success") {
        setIsModalOpen(true);
       
      } else {
        console.error("Error sending data:", result.message);
      }
    } catch (error) {
      console.error("Network or other error:", error);
    }
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div>
      <AppBar />
     
      <div className={classes.content}>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              ref={titleInputRef}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="authors">Authors:</label>
            <input
              type="text"
              id="authors"
              name="authors"
              required
              ref={authorsInputRef}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="journalName">Journal Name:</label>
            <input
              type="text"
              id="journalName"
              name="journalName"
              required
              ref={journalNameInputRef}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="year">Year of Publication:</label>
            <input
              type="number"
              id="year"
              name="year"
              required
              ref={yearInputRef}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="volume">Volume:</label>
            <input type="text" id="volume" name="volume" ref={volumeInputRef} />
          </div>

          <div className={classes.control}>
            <label htmlFor="pages">Pages:</label>
            <input type="text" id="pages" name="pages" ref={pagesInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="doi">DOI:</label>
            <input type="text" id="doi" name="doi" ref={doiInputRef} />
          </div>
          <div className={classes.actions}>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      {isModalOpen && <Backdrop onClick={closeModal} />}
      {isModalOpen && <Popout onClick={closeModal} />}
    </div>
  );
}

export default Submission;

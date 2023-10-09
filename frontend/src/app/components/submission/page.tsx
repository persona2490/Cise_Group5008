"use client";
import React, { useRef } from "react";
import AppBar from "../navigation/AppBar";
import classes from "./submission.module.css";
function Submission() {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const authorsInputRef = useRef<HTMLInputElement>(null);
  const journalNameInputRef = useRef<HTMLInputElement>(null);
  const yearInputRef = useRef<HTMLInputElement>(null);
  const volumeInputRef = useRef<HTMLInputElement>(null);
  const numberInputRef = useRef<HTMLInputElement>(null);
  const pagesInputRef = useRef<HTMLInputElement>(null);
  const doiInputRef = useRef<HTMLInputElement>(null);

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();

    const title = titleInputRef.current?.value;
    const authors = authorsInputRef.current?.value;
    const journalName = journalNameInputRef.current?.value;
    const year = yearInputRef.current?.value;
    const volume = volumeInputRef.current?.value;
    const number = numberInputRef.current?.value;
    const pages = pagesInputRef.current?.value;
    const doi = doiInputRef.current?.value;

    const submitData = {
      Title: title,
      Authors: authors,
      JournalName: journalName,
      Year: year,
      Volume: volume,
      Number: number,
      Pages: pages,
      DOI: doi,
    };

    console.log(submitData);
  }
  return (
    <div>
      <AppBar />
      <div>
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
            <label htmlFor="number">Number:</label>
            <input type="text" id="number" name="number" ref={numberInputRef} />
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
    </div>
  );
}

export default Submission;

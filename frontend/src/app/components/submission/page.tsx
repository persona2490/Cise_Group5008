"use client";
import React, { useState } from "react";
import AppBar from "../navigation/AppBar";

const Submission = () => {
  return (
    <div>
      <AppBar />
      {/* <form onSubmit={}> */}
      <br></br>
      <br></br>
      <form>
        <table className="form-table">
          <tbody>
            <tr>
              <td>Title:</td>
              <td>
                <input type="text" name="title" required />
              </td>
            </tr>
            <tr>
              <td>Authors:</td>
              <td>
                <input type="text" name="authors" required />
              </td>
            </tr>
            <tr>
              <td>Journal Name:</td>
              <td>
                <input type="text" name="journalName" required />
              </td>
            </tr>
            <tr>
              <td>Year of Publication:</td>
              <td>
                <input type="number" name="year" required />
              </td>
            </tr>
            <tr>
              <td>Volume:</td>
              <td>
                <input type="text" name="volume" />
              </td>
            </tr>
            <tr>
              <td>Number:</td>
              <td>
                <input type="text" name="number" />
              </td>
            </tr>
            <tr>
              <td>Pages:</td>
              <td>
                <input type="text" name="pages" />
              </td>
            </tr>
            <tr>
              <td>DOI:</td>
              <td>
                <input type="text" name="doi" />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Submit</button>
      </form>
      {/* </form> */}
    </div>
  );
};

export default Submission;

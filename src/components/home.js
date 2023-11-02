import { useState } from "react";
import { baseURL } from "./api/constants";
// import { Typography } from "@mui/material";

export const MUIHome = () => {
  const [venues, setVenues] = useState([]);

  async function getVenues(params) {
    try {
      const postData = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(`${baseURL}/venues?limit=10`);
      if (response.ok) {
        const result = await response.json();
        setVenues(result);
        // console.log(result);
      } else {
        console.error("Failed to fetch data:", response.status, response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  }
  getVenues();
  return (
    <>
      <ul>
        {Array.isArray(venues) ? (
          venues.map((venue) => (
            <>
              <p>It's working</p>
              <p>{venue.name}</p>
            </>
          ))
        ) : (
          <p>Loading venues...</p>
        )}
      </ul>
    </>
  );
};

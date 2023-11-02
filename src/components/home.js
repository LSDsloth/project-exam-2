import { useState, useEffect } from "react";
import { baseURL } from "./api/constants";
// import { Typography } from "@mui/material";

export const MUIHome = () => {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    async function getVenues() {
      try {
        const postData = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(`${baseURL}/venues?limit=10`, postData);
        if (response.ok) {
          const json = await response.json();
          setVenues(json);
          console.log(json);
        } else {
          console.log(response);
          console.error("Failed to fetch data:", response.status, response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getVenues();
  }, []);
  return (
    <>
      <ul></ul>
    </>
  );
};

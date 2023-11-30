import { useState, useEffect } from "react";

export function useApi(url, offset, limit) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetch(`${url}?offset=${offset}&limit=${limit}&_owner=true&sort=created`);
        console.log(response);
        const venues = await response.json();
        setData(venues);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [url, offset, limit]);

  return { data, isLoading, isError };
}

export async function PostVenue(url, userData) {
  const accessToken = localStorage.getItem("accessToken");
  const cleaneddAccesstoken = accessToken.replace(/^"|"$/g, "");
  const postData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cleaneddAccesstoken}`,
    },
    body: JSON.stringify(userData),
  };
  console.log(postData);
  const response = await fetch(url, postData);
  const data = await response.json();
  console.log(data);
}

export function useGetVenues(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const cleanedAccessToken = accessToken.replace(/^"|"$/g, "");
        const profile = JSON.parse(localStorage.getItem("profile"));
        const name = profile.name;

        const postData = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cleanedAccessToken}`,
          },
        };

        const response = await fetch(`${url}/${name}/venues`, postData);
        const venueData = await response.json();
        setData(venueData);
        console.log(venueData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [url]);

  return { data };
}

export async function SetVenueManager(url, isVenueManager) {
  const accessToken = localStorage.getItem("accessToken");
  const cleaneddAccesstoken = accessToken.replace(/^"|"$/g, "");
  const profile = JSON.parse(localStorage.getItem("profile"));
  const name = profile.name;
  const postData = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cleaneddAccesstoken}`,
    },
    body: JSON.stringify({ venueManager: isVenueManager }),
  };
  console.log(postData);
  const response = await fetch(`${url}/${name}`, postData);
  console.log(response);
  const data = await response.json();
  console.log(data);
}

export async function UpdateAvatar(url, avatarURL) {
  const accessToken = localStorage.getItem("accessToken");
  const cleaneddAccesstoken = accessToken.replace(/^"|"$/g, "");
  const profile = JSON.parse(localStorage.getItem("profile"));
  const name = profile.name;
  const avatarUrlValue = avatarURL.avatar;

  try {
    const postData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cleaneddAccesstoken}`,
      },
      body: JSON.stringify({ avatar: avatarUrlValue }),
    };
    console.log(postData);
    const response = await fetch(`${url}/${name}/media`, postData);
    console.log(response);
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      profile.avatar = data?.avatar;
      localStorage.setItem("profile", JSON.stringify(profile));
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
}

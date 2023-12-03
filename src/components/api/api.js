import { useState, useEffect, useCallback } from "react";

export function useApi(url, offset, limit) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await fetch(`${url}?_owner=true&_bookings=true&sort=created&offset=${offset}&limit=${limit}`);
      const venues = await response.json();
      setData(venues);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [url, offset, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, isError, refetch };
}

export async function PostBooking(url, userData) {
  const accessToken = localStorage.getItem("accessToken");
  const cleaneddAccesstoken = accessToken.replace(/^"|"$/g, "");
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cleaneddAccesstoken}`,
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch(url, postData);
    const data = await response.json();
    console.log(data);
    if (response.ok) {
    }
  } catch (error) {
    console.log(error);
  }
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
  const response = await fetch(url, postData);
  const data = await response.json();

  if (response.ok) {
    alert("You have created a new post!");
    window.location.href = "/";
  }
}

export async function UpdateVenue(url, venueId, userData) {
  const accessToken = localStorage.getItem("accessToken");
  const cleanedAccessToken = accessToken.replace(/^"|"$/g, "");
  const postData = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cleanedAccessToken}`,
    },
    body: JSON.stringify(userData),
  };

  try {
    const response = await fetch(`${url}/${venueId}`, postData);

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export function useGetProfile(url, entry) {
  const [venueData, setVenueData] = useState([]);
  const [bookingData, setBookingData] = useState([]);

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

        const venueResponse = await fetch(`${url}/${name}/venues`, postData);
        const venueData = await venueResponse.json();
        setVenueData(venueData);

        const bookingResponse = await fetch(
          `${url}/${name}/bookings?_venue=true&sort=dateFrom&sortOrder=asc
        `,
          postData
        );
        const bookingData = await bookingResponse.json();
        setBookingData(bookingData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [url, entry]);

  return { venueData, bookingData };
}

export function DeleteVenues(url, venueID) {
  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const cleanedAccessToken = accessToken.replace(/^"|"$/g, "");
      const postData = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cleanedAccessToken}`,
        },
      };
      const response = await fetch(`${url}/${venueID}`, postData);
      if (response.ok) {
        console.log("Venue deleted!");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
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
  const response = await fetch(`${url}/${name}`, postData);
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
    const response = await fetch(`${url}/${name}/media`, postData);
    const data = await response.json();

    if (response.ok) {
      profile.avatar = data?.avatar;
      localStorage.setItem("profile", JSON.stringify(profile));
      alert("Avatar successsfully updated!");
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
}

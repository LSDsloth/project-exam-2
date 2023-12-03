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
      // console.log(response);
      const venues = await response.json();
      // console.log(venues);
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
  console.log("HAHAHAHAHA");
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
    console.log(postData);
    const response = await fetch(url, postData);
    console.log(response);
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      console.log("Went through");
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
  console.log(postData);
  const response = await fetch(url, postData);
  console.log(response);
  const data = await response.json();
  console.log(data);

  if (response.ok) {
    console.log("Went through");
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

  console.log(userData);

  try {
    const response = await fetch(`${url}/${venueId}`, postData);
    console.log(response);

    const data = await response.json();
    console.log("Data:", data);
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// export async function GetSingelVenue(url) {
//   const [data, setData] = useState([]);

//   try {
//     const postData = {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     const response = await fetch(url, postData);
//     console.log(response);
//     const venue = await response.json();
//     console.log(venue);
//     setData(venue);
//   } catch (error) {
//     console.log(error);
//   }
//   return data;
// }

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

        console.log(venueResponse);
        console.log(venueData);
        console.log(bookingResponse);
        console.log(bookingData);
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
      console.log(cleanedAccessToken);
      const response = await fetch(`${url}/${venueID}`, postData);
      console.log(response);
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
      alert("Avatar successsfully updated!");
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
}

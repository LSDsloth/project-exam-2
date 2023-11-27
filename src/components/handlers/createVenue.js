import { PostVenue } from "../api/api";
import { venuesURL } from "../api/constants";

export function postVenueFormEventListener() {
  const postVenue = document.querySelector("#postVenueForm");
  console.log(postVenue);

  postVenue.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(postVenue);
    const userData = Object.fromEntries(formData.entries());
    console.log(userData);
    await PostVenue(venuesURL, userData);
  });
}

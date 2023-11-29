import { PostVenue } from "../api/api";
import { venuesURL } from "../api/constants";

export function postVenueFormEventListener() {
  const postVenueForm = document.querySelector("#postVenueForm");

  postVenueForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(postVenueForm);

    // Convert "price" and "maxGuests" to numbers
    const userData = {
      ...Object.fromEntries(formData.entries()),
      price: parseFloat(formData.get("price")),
      maxGuests: parseInt(formData.get("maxGuests"), 10), // Specify base 10 for parseInt
    };

    console.log(userData);
    await PostVenue(venuesURL, userData);
  });
}

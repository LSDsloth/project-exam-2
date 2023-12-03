import { PostVenue } from "../api/api";
import { venuesURL } from "../api/constants";

export function postVenueFormEventListener(setHasFormError, venueId) {
  const postVenueForm = document.querySelector("#postVenueForm");

  postVenueForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(postVenueForm);
    const name = formData.get("name");
    const maxGuests = formData.get("maxGuests");
    const description = formData.get("description");
    const price = formData.get("price");
    const mediaValue = formData.get("media");
    const media = mediaValue ? [mediaValue] : [];
    const location = {
      address: formData.get("address"),
      city: formData.get("city"),
      zip: formData.get("zip"),
      country: formData.get("country"),
    };

    // Check if there are errors
    const nameError = name.trim() === "";
    const maxGuestsError = maxGuests.trim() === "0" || maxGuests.trim() === "";
    const descriptionError = description.trim() === "";
    const priceError = price.trim() <= 0 || price.trim() === "";

    // Display error messages or perform other actions based on errors
    if (nameError || maxGuestsError || descriptionError || priceError) {
      setHasFormError(true);
      console.log("Form has errors. Submission halted.");
    } else {
      setHasFormError(false);
      const userData = {
        name,
        maxGuests: parseInt(maxGuests, 10),
        description,
        price: parseFloat(price),
        media,
        location,
      };

      console.log(userData);
      await PostVenue(venuesURL, userData);
    }
  });
}

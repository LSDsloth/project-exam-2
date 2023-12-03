import { UpdateVenue } from "../api/api";
import { venuesURL } from "../api/constants";

export function updateVenueFormEventListener(setHasFormError, venueId, formElement) {
  const updateVenueForm = formElement || document.querySelector("#updateVenueForm");

  updateVenueForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    console.log("Inside updateVenueFormEventListener. VenueId:", venueId);

    const formData = new FormData(updateVenueForm);
    const name = formData.get("name");
    const maxGuests = formData.get("maxGuests");
    const description = formData.get("description");
    const price = formData.get("price");
    const media = [formData.get("media")];
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

    console.log("VenueId inside updateVenueFormEventListener: ", venueId);

    // Display error messages or perform other actions based on errors
    if (nameError || maxGuestsError || descriptionError || priceError) {
      setHasFormError(true);
      console.log("Form has errors. Submission halted.");
    } else {
      setHasFormError(false);

      if (venueId) {
        const userData = {
          name,
          maxGuests: parseInt(maxGuests, 10),
          description,
          price: parseFloat(price),
          media,
          location,
        };

        console.log(userData);
        await UpdateVenue(venuesURL, venueId, userData);
      } else {
        console.log("VenueId is null. Cannot make the API request.");
      }
    }
  });
}

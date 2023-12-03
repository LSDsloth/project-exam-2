import { PostVenue } from "../api/api";
import { venuesURL } from "../api/constants";

export function postVenueFormEventListener(setHasFormError) {
  const postVenueForm = document.querySelector("#postVenueForm");

  postVenueForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(postVenueForm);
    const name = formData.get("name");
    const maxGuests = formData.get("maxGuests");
    const description = formData.get("description");
    const price = formData.get("price");
    const media = [formData.get("media")];

    // Check if there are errors
    const nameError = name.trim() === "";
    const maxGuestsError = maxGuests.trim() === "0" || maxGuests.trim() === "";
    const descriptionError = description.trim() === "";
    const priceError = price.trim() <= 0 || price.trim() === "";

    // Display error messages or perform other actions based on errors
    if (nameError || maxGuestsError || descriptionError || priceError) {
      setHasFormError(true);
      console.log("Form has errors. Submission halted.");
      // You can display error messages, update UI, etc.

      // If you have an alert or notification system, you can trigger it here.
    } else {
      setHasFormError(false);
      // No errors, proceed with form submission
      const userData = {
        ...Object.fromEntries(formData.entries()),
        price: parseFloat(price),
        maxGuests: parseInt(maxGuests, 10), // Specify base 10 for parseInt
        media,
      };

      console.log(userData);
      await PostVenue(venuesURL, userData);
    }
  });
}

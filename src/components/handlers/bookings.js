import { PostBooking } from "../api/api";
import { bookingURL } from "../api/constants";

export function postBookingFormEventListener(selectedDate, selectedToDate, venueId) {
  const postBookingForm = document.querySelector("#postBookingForm");
  try {
    postBookingForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(postBookingForm);
      const dateFrom = selectedDate.toISOString();
      const dateTo = selectedToDate.toISOString();
      const guests = formData.get("guests");

      const userData = {
        dateFrom,
        dateTo,
        guests: parseInt(guests),
        venueId: venueId,
      };

      console.log(userData);
      await PostBooking(bookingURL, userData);
    });
  } catch (error) {}
}

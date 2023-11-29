import { UpdateAvatar } from "../api/api";
import { updateAvatarURL } from "../api/constants";

export function updateAvatarFormEventListener() {
  const updateAvatarForm = document.querySelector("#updateAvatarForm");

  updateAvatarForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(updateAvatarForm);
    const userData = Object.fromEntries(formData.entries());
    console.log(userData);
    await UpdateAvatar(updateAvatarURL, userData);
  });
}

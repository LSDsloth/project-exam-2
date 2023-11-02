import { registerUser } from "../api/auth/register.js";
import { registerURL } from "../api/constants.js";

export function registerFormEventListener() {
  const registerForm = document.querySelector("#registerForm");

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(registerForm);
    const userData = Object.fromEntries(formData.entries());
    await registerUser(registerURL, userData);
  });
}

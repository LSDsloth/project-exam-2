import { loginUser } from "../api/auth/login";
import { loginURL } from "../api/constants";

export function loginFormEventListener() {
  const loginForm = document.querySelector("#loginForm");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const userData = Object.fromEntries(formData.entries());
    console.log(userData);
    await loginUser(loginURL, userData);
  });
}

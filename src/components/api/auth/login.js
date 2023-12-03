import * as storage from "../../storage/index";
// const loginError = document.querySelector(".loginError");

export async function loginUser(url, userData) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    console.log(postData);
    const response = await fetch(url, postData);
    console.log(response);
    const { accessToken, ...user } = await response.json();

    console.log(accessToken, user);
    if (response.status === 200) {
      storage.save("accessToken", accessToken);
      storage.save("profile", user);
      storage.save("isLoggedIn", true);
      alert("You are now logged in as " + user.name);
      window.location.href = "/";
    }
  } catch (error) {
    console.log(error);
  }
}

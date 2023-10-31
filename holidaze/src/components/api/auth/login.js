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

    storage.save("accessToken", accessToken);
    storage.save("profile", user);
    console.log(accessToken, user);
    if (response.status === 200) {
      storage.save("isLoggedIn", true);
      //   location.replace("../../../index.html");
    } else if (response.status !== 200) {
      //   loginError.innerHTML = user.errors[0].message;
      console.log("Failed");
    }
  } catch (error) {
    console.log(error);
  }
}

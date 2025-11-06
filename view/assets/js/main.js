document.addEventListener("DOMContentLoaded", async () => {
  const profile = JSON.parse(localStorage.getItem("Profile"));
});

document
  .getElementById("adjustData")
  .addEventListener("click", async function (e) {
    e.preventDefault();

    const username = profile.username;
    const password = profile.password;

    await fetch(`../../api/Login.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if ((data.type = "admin")) {
          console.log("Admin");
        } else if ((data.type = "user")) {
          console.log("User");
        }
      });
  });

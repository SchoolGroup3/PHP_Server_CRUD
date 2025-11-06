document.addEventListener("DOMContentLoaded", async () => {
  const profile = JSON.parse(localStorage.getItem("Profile"));
  console.log(profile);

  document
    .getElementById("adjustData")
    .addEventListener("click", async function (e) {
      e.preventDefault();

      const username = profile.username;
      const password = profile.password;
      try {
        const response = await fetch(`../../api/Login.php`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if ((data.type = "admin")) {
          console.log("Admin");
        } else if ((data.type = "user")) {
          console.log("User");
        }
      } catch (error) {
        console.log(error);
      }
    });
});

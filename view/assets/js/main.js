document.addEventListener("DOMContentLoaded", async () => {
  const profile = localStorage.getItem("profile");
  console.log(profile);

  document
    .getElementById("adjustData")
    .addEventListener("click", async function (e) {
      e.preventDefault();

      const username = profile.username;
      const password = profile.password;
      console.log(username);
      console.log(password);

      let data = await login(username, password);
      console.log(data);

      if (data) {
        if ((data["type"] = "admin")) {
          console.log("Admin");
        } else if ((data["type"] = "user")) {
          console.log("User");
        }
      } else {
        console.log("Error al cargar JSON.");
      }
    });
});

async function login(username, password) {
  const response = await fetch(`../../api/CheckUserType.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  let data = await response.json();

  return data;
}

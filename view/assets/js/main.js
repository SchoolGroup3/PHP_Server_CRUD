document.addEventListener("DOMContentLoaded", async () => {
  const profile = JSON.parse(localStorage.getItem("actualUser"));
  console.log(profile);

  document
    .getElementById("adjustData")
    .addEventListener("click", async function (e) {
      e.preventDefault();

      const username = profile.USER_NAME;
      const password = profile.PSWD;

      let data = await login(username, password);
      console.log(data);

      if (data["admin"]) {
        console.log("Admin");
      } else if (data["user"]) {
        console.log("User");
      } else {
        console.log(data["error"]);
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

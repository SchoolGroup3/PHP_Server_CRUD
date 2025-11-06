document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    await fetch(`../../api/Login.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          let string = JSON.stringify(data);
          let user = JSON.parse(string);
          console.log(user);
          localStorage.setItem("Profile", user);
          window.location.href = "main.html";
        } else if (data.error) {
          alert("El nombre de usuario o la contraseña con incorrectas.");
        }
      });
  });

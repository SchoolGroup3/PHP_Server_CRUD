document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      await fetch("../../api/Login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      const data = await response.json();
      console.log(data);

      if (data) {
        window.location.href = "main.html";
      } else {
        alert("El nombre de usuario o la contraseña con incorrectas.");
      }
    } catch (error) {
      console.log(error);
    }
  });

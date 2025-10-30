document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    await fetch("../../api/Login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((resultado) =>
      resultado.json().then((data) => {
        if (data.resultado) {
          alert("Iniciando sesion.");
          window.location.href = "main.html";
        } else {
          alert("Nombre de usuario o contraseña incorrectas.");
        }
      })
    );
  });

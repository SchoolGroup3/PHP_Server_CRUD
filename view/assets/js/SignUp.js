document.getElementById("signupForm").addEventListener("onclick", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const pswd1 = document.getElementById("pswd1").value;
  const pswd2 = document.getElementById("pswd2").value;

  if (pswd1 !== pswd2) {
    alert("Las contraseñas no coinciden.");
    return;
  } else {
    fetch("../../../api/AddUser.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, pswd1, pswd2 }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.exito) {
          alert("Usuario creado con éxito.");
          window.location.href = "login.html";
        } else {
          alert("Error al crear el usuario.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Hubo un problema con el servidor.");
      });
  }
});

document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const pswd1 = document.getElementById("pswd1").value;
  const pswd2 = document.getElementById("pswd2").value;

  if (pswd1 !== pswd2) {
    alert("Las contraseñas no coinciden.");
    return;
  }
  fetch("../../../api/AddUser.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, pswd1, pswd2 }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.resultado) {
        alert("Usuario creado con éxito.");
        localStorage.setItem("usuario", JSON.stringify(data.resultado));
        window.location.href = "main.html";
      } else {
        alert("Error al crear el usuario.");
        console.error("Respuesta del servidor:", data);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Hubo un problema con el servidor.");
    });
});

/*document
  .getElementById("signupForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const pswd1 = document.getElementById("pswd1").value;
    const pswd2 = document.getElementById("pswd2").value;

    if (pswd1 !== pswd2) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    console.log("Enviando datos:", { username, pswd1, pswd2 }); // Debug

    await fetch("../../api/AddUser.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ username, pswd1 }),
    })
      .then((response) => {
        console.log("Status:", response.status); // Debug
        console.log("OK:", response.ok); // Debug
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Datos recibidos:", data); // Debug
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
        console.error("Error completo:", error); // Debug
        alert("Hubo un problema con el servidor.");
      });
  });*/

document
  .getElementById("signupForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const pswd1 = document.getElementById("pswd1").value;
    const pswd2 = document.getElementById("pswd2").value;

    if (pswd1 !== pswd2) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    console.log("Enviando datos:", { username, pswd1, pswd2 }); // Debug

    try {
      const response = await fetch("../../api/AddUser.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ username, pswd1 }),
      });

      const rawText = await response.text();
      console.log("Texto recibido:", rawText); // Debug

      let data;
      try {
        data = JSON.parse(rawText);
      } catch (jsonError) {
        throw new Error("Respuesta no es JSON válida: " + rawText);
      }

      console.log("Datos recibidos:", data); // Debug

      if (data.resultado) {
        alert("Usuario creado con éxito.");
        localStorage.setItem("usuario", JSON.stringify(data.resultado));
        window.location.href = "main.html";
      } else {
        alert("Error al crear el usuario.");
        console.error("Respuesta del servidor:", data);
      }
    } catch (error) {
      console.error("Error completo:", error); // Debug
      alert("Hubo un problema con el servidor.");
    }
  });

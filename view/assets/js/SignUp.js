document
  .getElementById("signupForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const pswd1 = document.getElementById("pswd1").value;
    const pswd2 = document.getElementById("pswd2").value;
    const parrafo = document.getElementById("mensaje");

    if (pswd1 !== pswd2) {
      //alert("Las contraseñas no coinciden.");
      parrafo.innerText = "Las contraseñas no coinciden.";
      parrafo.style.color = "red";
      return;
    }

    // console.log("Enviando datos:", { username, pswd1, pswd2 }); // Debug

    try {
      const response = await fetch("../../api/AddUser.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ username, pswd1 }),
      });

      const rawText = await response.text();
      //console.log("Texto recibido:", rawText); // Debug
      //console.log("Texto recibido (raw):", JSON.stringify(rawText));

      let data;
      try {
        data = JSON.parse(response.ok ? rawText : "{}");
      } catch (jsonError) {
        throw new Error("Respuesta no es JSON válida: " + rawText);
      }

      //console.log("Datos recibidos:", data); // Debug
      if (data.resultado) {
        //alert("Usuario creado con éxito.");
        parrafo.innerText = "Usuario creado con éxito.";
        parrafo.style.color = "green";
        localStorage.setItem("actualUser", JSON.stringify(data.resultado));
        window.location.href = "profilePopUp.html";
        console.log("Datos recibidos:", data.resultado);
      } else {
        //alert("Error al crear el usuario.");
        parrafo.innerText =
          "El Usuario ya existe, elija otro nombre de usuario";
        parrafo.style.color = "red";
        console.error("Respuesta del servidor:", data);
      }
    } catch (error) {
      //console.error("Error completo:", error); // Debug
      //alert("Hubo un problema con el servidor.");
      parrafo.innerText = "Error al crear el usuario.";
      parrafo.style.color = "red";
    }
  });

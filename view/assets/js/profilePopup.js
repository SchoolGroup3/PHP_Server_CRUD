document.addEventListener("DOMContentLoaded", function (e) {
  e.preventDefault();

  /* const usuario = {
    profile_code: "1",
    password: "123456",
    email: "usuario@ejemplo.com",
    username: "juan_perez",
    telephone: "34 612 345 678",
    name: "Juan",
    surname: "Pérez García",
    gender: "Femenino",
    card_no: "1234 5678 9012 3456",
  };*/

  //localStorage.setItem('actualUser', JSON.stringify(usuario));
  //console.log("usuario" + usuario);
  //actual profile with localStorage
  const actualProfile = JSON.parse(localStorage.getItem("actualUser"));
  console.log("Actual Profile:", actualProfile);

  document.getElementById("username").value = actualProfile.username;
  //if the profile has an atribute, it has them all, because are mandatory
  if (actualProfile.email) {
    document.getElementById("email").value = actualProfile.email;
    document.getElementById("phone").value = actualProfile.telephone.replace(
      /\s/g,
      ""
    );
    document.getElementById("firstName").value = actualProfile.name;
    document.getElementById("lastName").value = actualProfile.surname;
    document.getElementById("gender").value = actualProfile.gender;
    document.getElementById("accountNumber").value = actualProfile.card_no;
  }

  //--Button Delete Account--
  const deleteBtn = document.getElementById("deleteBtn");

  //-- CHANGE PASSWORD MODAL --
  const modal = document.getElementById("changePasswordModal");
  const changePwdBtn = document.getElementById("changePwdBtn");
  const closeBtn = document.querySelector(".closePasswordModal");

  // Function to reset the modal
  function resetPasswordModal() {
    document.getElementById("changePasswordForm").reset();
    document.getElementById("messageOldPassword").innerHTML = "";
    document.getElementById("messageWrongPassword").innerHTML = "";
    document.getElementById("message").innerHTML = "";
  }

  if (changePwdBtn) {
    changePwdBtn.addEventListener("click", function () {
      if (modal) {
        modal.style.display = "block";
        resetPasswordModal();
      }
    });
  }

  // Cerrar modal y resetear
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      if (modal) {
        modal.style.display = "none";
        resetPasswordModal();
      }
    });
  }

  // Click when you click outside the modal
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      resetPasswordModal();
    }
  });

  //--Button Delete Account--
  if (deleteBtn) {
    deleteBtn.addEventListener("click", function () {
      delete_user(actualProfile.profile_code);
    });
  }

  //-- Popup Delete Account --
  async function delete_user(id) {
    if (!confirm("Are you sure you want to delete this user?")) return;

    const response = await fetch(
      `../../api/DeleteUser.php?id=${encodeURIComponent(id)}`
    );

    const data = await response.json();

    if (data.error) {
      console.log("Error deleting user: ", data.error);
    } else {
      console.log("User deleted.");
      row = document.getElementById(`user${id}`);
      if (row) row.remove();
    }
  }

  //when you click the button save
  document
    .getElementById("profileForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault();

      const profile_code = actualProfile.profile_code;
      const name = document.getElementById("firstName").value;
      const surname = document.getElementById("lastName").value;
      const email = document.getElementById("email").value;
      const username = document.getElementById("username").value;
      const telephone = document
        .getElementById("phone")
        .value.replace(/\s/g, ""); //remove spaces
      const gender = document.getElementById("gender").value;
      const card_no = document.getElementById("accountNumber").value;
      console.log(
        "Esto son los datos de los textfields" + profile_code,
        name,
        surname,
        email,
        username,
        telephone,
        gender,
        card_no
      );

      if (
        !name ||
        !surname ||
        !email ||
        !username ||
        !telephone ||
        !gender ||
        !card_no
      ) {
        document.getElementById("message").innerHTML =
          "You must fill all the fields";
        document.getElementById("message").style.color = "red";
        return;
      }

      //verify if there are changes in the fields
      function hasChanges() {
        let changes = false;

        if (
          name !== actualProfile.name ||
          surname !== actualProfile.surname ||
          email !== actualProfile.email ||
          username !== actualProfile.username ||
          telephone !== actualProfile.telephone.replace(/\s/g, "") ||
          gender !== actualProfile.gender ||
          card_no !== actualProfile.card_no
        ) {
          changes = true;
        }
        return changes;
      }

      if (!hasChanges()) {
        document.getElementById("message").innerHTML = "No changes detected";
        document.getElementById("message").style.color = "red";
      } else {
        try {
          const response = await fetch(
            `../../api/ModifyUser.php?profile_code=${encodeURIComponent(
              profile_code
            )}&name=${encodeURIComponent(name)}&surname=${encodeURIComponent(
              surname
            )}&email=${encodeURIComponent(email)}&username=${encodeURIComponent(
              username
            )}&telephone=${encodeURIComponent(
              telephone
            )}&gender=${encodeURIComponent(
              gender
            )}&card_no=${encodeURIComponent(card_no)}`
          );
          const data = await response.json();
          console.log("El jason" + data);

          if (data.success) {
            document.getElementById("message").innerHTML = data.message;
            document.getElementById("message").style.color = "green";
          } else {
            document.getElementById("message").innerHTML = data.error;
            document.getElementById("message").style.color = "red";
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
});

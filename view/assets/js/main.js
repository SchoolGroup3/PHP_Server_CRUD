document.addEventListener("DOMContentLoaded", async () => {
  const profile = JSON.parse(localStorage.getItem("profile"));

  let adminTableModal = document.getElementById("adminTableModal");
  let modifyUserPopup = document.getElementById("modifyUserPopupAdmin");
  let modifyAdminPopup = document.getElementById("modifyAdminPopup");
  let homeBtn = document.getElementById("adjustData");
  let modifyAdminBtn = document.getElementById("modifySelfButton");
  let span = document.getElementsByClassName("close")[0];
  let adminTable = document.getElementById("adminTable");

  homeBtn.onclick = function () {
    if (profile["CARD_NO"]) {
      openModifyUserPopup(profile);
    } else if (profile["CURRENT_ACCOUNT"]) {
      adminTableModal.style.display = "block";
    }
  };

  modifyAdminBtn.onclick = function () {
    openModifyAdminPopup();
  };

  span.onclick = function () {
    adminTableModal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == adminTableModal) {
      adminTableModal.style.display = "none";
    } else if (event.target == modifyUserPopup) {
      modifyUserPopup.style.display = "none";
    } else if (event.target == modifyAdminPopup) {
      modifyAdminPopup.style.display = "none";
    }
  };

  let users = await get_all_users();

  if (users) {
    users.forEach((user) => {
      let row = adminTable.insertRow(1);
      row.className = "adminTableData";
      row.id = `user${user["PROFILE_CODE"]}`;
      let username = row.insertCell(0);
      let accountNum = row.insertCell(1);
      let buttons = row.insertCell(2);

      username.innerHTML = user["USER_NAME"];
      accountNum.innerHTML = user["CARD_NO"];
      buttons.innerHTML = `<div class="center-flex-div">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-small"
                  onclick='openModifyUserPopup(${JSON.stringify(user)})'
                >
                  <path
                    d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z"
                  />
                  <path
                    d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z"
                  />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#ff5457"
                  class="size-small"
                  onclick="delete_user(${user.PROFILE_CODE})" 
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>`;
    });
  } else {
    let row = adminTable.insertRow(1);
    row.className = "adminTableData";
    let username = row.insertCell(0);
    let accountNum = row.insertCell(1);
    let buttons = row.insertCell(2);

    accountNum.innerHTML = "No users available.";
  }
});

async function get_all_users() {
  const response = await fetch("../../api/GetAllUsers.php");
  const data = await response.json();

  return data["resultado"];
}

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

function openModifyUserPopup(user) {
  localStorage.setItem("actualUser", JSON.stringify(user));
  const actualProfile = JSON.parse(localStorage.getItem("actualUser"));
  console.log("Actual Profile:", actualProfile);
  const usuario = {
    profile_code: actualProfile.PROFILE_CODE,
    password: actualProfile.PSWD,
    email: actualProfile.EMAIL,
    username: actualProfile.USER_NAME,
    telephone: actualProfile.TELEPHONE,
    name: actualProfile.NAME_,
    surname: actualProfile.SURNAME,
    gender: actualProfile.GENDER,
    card_no: actualProfile.CARD_NO,
  };
  console.log("Actual user:", usuario);

  document.getElementById("username").value = usuario.username;
  //if the profile has an atribute, it has them all, because are mandatory
  if (usuario.email) {
    document.getElementById("email").value = usuario.email;
    document.getElementById("phone").value = usuario.telephone;
    document.getElementById("firstName").value = usuario.name;
    document.getElementById("lastName").value = usuario.surname;
    document.getElementById("gender").value = usuario.gender;
    document.getElementById("cardNumber").value = usuario.card_no;
  }

  let modifyUserPopup = document.getElementById("modifyUserPopupAdmin");
  modifyUserPopup.style.display = "flex";
}

function openModifyAdminPopup() {
  const actualProfile = JSON.parse(localStorage.getItem("profile"));
  console.log("Actual profile: ", actualProfile);
  let modifyAdminPopup = document.getElementById("modifyAdminPopup");

  const usuario = {
    profile_code: actualProfile.PROFILE_CODE,
    password: actualProfile.PSWD,
    email: actualProfile.EMAIL,
    username: actualProfile.USER_NAME,
    telephone: actualProfile.TELEPHONE,
    name: actualProfile.NAME_,
    surname: actualProfile.SURNAME,
    current_account: actualProfile.CURRENT_ACCOUNT,
  };

  console.log("User username: ", usuario.username);

  document.getElementById("usernameAdmin").value = usuario.username;
  document.getElementById("emailAdmin").value = usuario.email;
  document.getElementById("phoneAdmin").value = usuario.telephone;
  document.getElementById("firstNameAdmin").value = usuario.name;
  document.getElementById("lastNameAdmin").value = usuario.surname;
  document.getElementById("profileCodeAdmin").value = usuario.profile_code;
  document.getElementById("accountNumberAdmin").value = usuario.current_account;

  modifyAdminPopup.style.display = "flex";
}

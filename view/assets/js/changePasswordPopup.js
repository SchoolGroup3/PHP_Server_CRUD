document.getElementById('changePasswordForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    document.getElementById("messageOldPassword").innerHTML = "";
    document.getElementById("messageWrongPassword").innerHTML = "";
    document.getElementById("message").innerHTML = "";
    
    const usuario = {
        profile_code: '1',
        password: '1234'
    }
    
    localStorage.setItem('actualProfile', JSON.stringify(usuario));

    //actual profile with localStorage
    const actualProfile = JSON.parse(localStorage.getItem('actualProfile'));

    const profile_code = actualProfile.profile_code;
    const userPassword = actualProfile.password;
    const password = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmNewPassword").value;

    let hasErrors = false;

    if (userPassword != password) {
        document.getElementById("messageOldPassword").innerHTML = "That is not your current password";
        hasErrors = true;
    }

    if (userPassword == newPassword) {
        document.getElementById("messageWrongPassword").innerHTML = "Password used before, try annother one";
        hasErrors = true;
    }

    if (newPassword != confirmPassword) {
        document.getElementById("messageWrongPassword").innerHTML = "The passwords are not the same";
        hasErrors = true;

    }
    console.log('llega bien');
    if (!hasErrors) {
        try {
            //POST to pass the password safely
            const response = await fetch('/RETO_php/api/ModifyPassword.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    profile_code: profile_code,
                    password: newPassword
                })
            });

            const data = await response.json();

            if (data.success) {
                actualProfile.password = newPassword;
                document.getElementById("messageSuccessPassword").innerHTML = "Password correctly changed";

                setTimeout(() => {
                    document.getElementById("messageSuccessPassword").innerHTML = ""; // clean the modified message
                    document.getElementById("changePasswordForm").reset(); // clean all the fields
                }, 3000);

            } else {
                document.getElementById("messageSuccessPassword").innerHTML = data.error;
                document.getElementById("messageSuccessPassword").style.color = "red";
            }
        } catch (error) {
            console.log(error);
        }
    }

})
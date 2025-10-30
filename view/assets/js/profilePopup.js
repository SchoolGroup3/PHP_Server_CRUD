
document.addEventListener('DOMContentLoaded', function (e) {
    e.preventDefault();

    const usuario = {
        profile_code: '1',
        password: '123456',
        email: 'usuario@ejemplo.com',
        username: 'juan_perez',
        telephone: '+34 612 345 678',
        name: 'Juan',
        surname: 'Pérez García',
        gender: 'Femenino',
        card_no: '1234 5678 9012 3456'
    }

    localStorage.setItem('actualProfile', JSON.stringify(usuario));

    //actual profile with localStorage
    const actualProfile = JSON.parse(localStorage.getItem('actualProfile'));

    document.getElementById("username").value = actualProfile.username;
    //if the profile has an atribute, it has them all, because are mandatory
    if (actualProfile.email) {
        document.getElementById("email").value = actualProfile.email;
        document.getElementById("phone").value = actualProfile.telephone;
        document.getElementById("firstName").value = actualProfile.name;
        document.getElementById("lastName").value = actualProfile.surname;
        document.getElementById("gender").value = actualProfile.gender;
        document.getElementById("accountNumber").value = actualProfile.card_no;
    }

    const modal = document.getElementById('changePasswordModal');
    const changePwdBtn = document.getElementById('changePwdBtn');
    const closeBtn = document.querySelector('.closePasswordModal');
    
    // Función para resetear el modal
    function resetPasswordModal() {
        document.getElementById("changePasswordForm").reset();
        document.getElementById("messageOldPassword").innerHTML = "";
        document.getElementById("messageWrongPassword").innerHTML = "";
        document.getElementById("message").innerHTML = "";
    }
    
    // Abrir modal y resetear
    if (changePwdBtn) {
        changePwdBtn.addEventListener('click', function() {
            if (modal) {
                modal.style.display = 'block';
                resetPasswordModal();
            }
        });
    }
    
    // Cerrar modal y resetear
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            if (modal) {
                modal.style.display = 'none';
                resetPasswordModal();
            }
        });
    }
    
    // Cerrar al hacer clic fuera y resetear
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            resetPasswordModal();
        }
    });

    //when you click the button
    document.getElementById('profileForm').addEventListener('submit', async function (e) {
        e.preventDefault();



        const profile_code = actualProfile.profile_code;
        const name = document.getElementById("firstName").value;
        const surname = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;
        const username = document.getElementById("username").value;
        const telephone = document.getElementById("phone").value;
        const gender = document.getElementById("gender").value;
        const card_no = document.getElementById("accountNumber").value;


        try {
            const response = await fetch(`/RETO_php/api/ModifyUser.php?profile_code=${encodeURIComponent(profile_code)}&name=${encodeURIComponent(name)}&surname=${encodeURIComponent(surname)}&email=${encodeURIComponent(email)}&username=${encodeURIComponent(username)}&telephone=${encodeURIComponent(telephone)}&gender=${encodeURIComponent(gender)}&card_no=${encodeURIComponent(card_no)}`);
            const data = await response.json();

            if (data.success) {
                document.getElementById("messageSuccessPassword").innerHTML = data.message;
                document.getElementById("messageSuccessPassword").style.color = "green";
            } else {
                document.getElementById("messageSuccessPassword").innerHTML = data.error;
                document.getElementById("messageSuccessPassword").style.color = "red";
            }
        } catch (error) {
            console.log(error);
        }
    })


});
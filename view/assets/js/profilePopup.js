document.getElementById('profileForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const phone = document.getElementById("phone").value;
    const genre = document.getElementById("genre").value;
    const accountNumber = document.getElementById("accountNumber");

    try{
        const response = await fetch(`../api/modifyUser.php?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}&email=${encodeURIComponent(email)}&username=${encodeURIComponent(username)}&phone=${encodeURIComponent(phone)}&genre=${encodeURIComponent(genre)}&accountNumber=${encodeURIComponent(accountNumber)}`);
        const data = await response.json();
        console.log(data);
    }catch(error){
        console.log(error);
    }
})
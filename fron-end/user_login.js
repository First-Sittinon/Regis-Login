window.onload;
console.log(localStorage.getItem('U_email'));
const apiUrl = 'http://localhost:3000/user/';
const U_email = localStorage.getItem('U_email');
const avatar = document.getElementById('img');
const username = document.getElementById('username');
const email = document.getElementById('Uemail');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');

// ข้อมูล user -------------------------------------------------------
    axios.get(apiUrl + U_email)
.then(function(res) {
    if (!res.data.avatar) {
        avatar.src = "img/user.png";
    } else {
        avatar.src = res.data.avatar;
    }
    username.textContent = res.data.username;
    email.innerHTML = "Email : " + res.data.email;
    fname.innerHTML = "Firstname : " + res.data.fname;
    lname.innerHTML = "Lastname : " + res.data.lname;

    console.log(res.data);
})
.catch(error => {
    console.error('Error fetching data: ', error);
});

function logout() {
    localStorage.removeItem('U_email');
    window.location.href = 'index.html';
};




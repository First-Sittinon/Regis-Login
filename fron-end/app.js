const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');
let apiUrl = 'http://localhost:3000/';

// หน้า Login -------------------------------------------------------------------
function btnLogin() {
    
    if (emailInput.value == "") {
        return alert('กรุณากรอก Email');
    } else if (passInput.value == "") {
        return alert('กรุณากรอก Password');
    };

    axios.post(apiUrl + "login", {
        email: emailInput.value,
        password: passInput.value
    })
    .then(function(res) {

        if (res.data.status === "ok") {
            console.log(res.data);
        } else {
            return alert("Email หรือ Password ไม่ถูกต้อง");
        }

        localStorage.setItem('U_email', emailInput.value);
        console.log(localStorage.getItem('U_email'));

        userPage();
    })
};

function userPage() {
    window.location.href = 'user_login.html';
};

let register = document.getElementById('regis');

function regis() {
    register.className = 'form-register';
};

function closeNone() {
    register.className = 'form-register-none';
};

const regEmail = document.getElementById('reg_email');
const regUsername = document.getElementById('reg_username');
const regFname = document.getElementById('reg_fname');
const regLname = document.getElementById('reg_lname');
const regPass = document.getElementById('reg_pass');
const regConpass = document.getElementById('reg_conpass');
const regAvatar = document.getElementById('reg_avatar');


function registerUser() {
    if (regEmail.value === '') {
        return alert('กรุณากรอก Email');
    } else {
        let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (pattern.test(regEmail.value) === false) {
            return alert('รูปแบบ Email ไม่ถูกต้อง');
        }
    };

    if (regUsername.value === '') {
        return alert('กรุณากรอก Username');
    };

    if (regFname.value === '') {
        return alert('กรุณากรอก Firstname');
    };

    if (regLname.value === '') {
        return alert('กรุณากรอก Lastname');
    };

    if (regPass.value === '') {
        return alert('กรุณากรอก Password');
    } else if (regPass.value !== regConpass.value) {
        return alert('รหัสผ่านไม่ตรงกัน')
    } else {
        let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/;
        if (pattern.test(regPass.value) === false) {
            return alert('รหัสผ่านต้องมี a-z, A-Z, 0-9 และยาวไม่น้อยกว่า 8 ตัวอักษร');
        }
    };

    if (regConpass.value === '') {
        return alert('กรุณากรอก Conferm Password');
    };

    axios.post(apiUrl + "register", {
        email: regEmail.value,
        username: regUsername.value,
        fname: regFname.value,
        lname: regLname.value,
        pass: regPass.value,
        conpass: regConpass.value,
        avatar: regAvatar.value
    })
    .then(function(res) {
        if (res.data.status === "ok") {
            alert("สมัคสมาชิกสำเร็จ");
            closeNone();
        } else {
            return alert("มี Email อยู่ในระบบแล้ว");
        }

    })
};
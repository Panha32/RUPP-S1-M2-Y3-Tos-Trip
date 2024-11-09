let fullname = document.getElementById('name');
let email = document.getElementById('email');
let password = document.getElementById('password');
let lblName = document.getElementById('lblName');
let lblEmail = document.getElementById('lblEmail');
let lblPassword = document.getElementById('lblPassword');
let openPw = document.getElementById('openPw');
let pw_random = document.getElementById('pw-random');

let alertSMS = document.getElementById('alertSms');

const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');

let isValidateFullname = false;
let validateFullname = () => {
    let fullnameCheck = fullname.value;
    const fullnamePattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

    if(fullnameCheck === '' || !fullnamePattern.test(fullnameCheck)) {
        fullname.style.borderColor = 'var(--errors)';
        lblName.style.color = 'var(--errors)';
        isValidateFullname = false;
    } else {
        fullname.style.borderColor = '';
        lblName.style.color = 'var(--main-color)';
        isValidateFullname = true;
    }
}

let isValidateEmail = false;
let validateEmail = () => {
    let emailCheck = email.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(emailCheck === '' || !emailPattern.test(emailCheck)) {
        email.style.borderColor = 'var(--errors)';
        lblEmail.style.color = 'var(--errors)';
        isValidateEmail = false;
    } else {
        email.style.borderColor = '';
        lblEmail.style.color = 'var(--main-color)';
        isValidateEmail = true;
    }
}

let isValidatePassword = false;
let validatePassword = () => {
    let passwordCheck = password.value;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(passwordCheck === '' || !passwordPattern.test(passwordCheck)) {
        password.style.borderColor = 'var(--errors)';
        lblPassword.style.color = 'var(--errors)';
        pw_random.style.display = 'none';
        isValidatePassword = false;
    } else {
        password.style.borderColor = '';
        lblPassword.style.color = 'var(--main-color)';
        isValidatePassword = true;
    }
}

let passwordSuggested = false;

const generatePassword = () => {
    const length = 12;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$!%*?&';
    let pwGenerated = '';
    for(let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        pwGenerated += charset[randomIndex];
    }
    return pwGenerated;
}

password.addEventListener('focus', () => {
    if (!passwordSuggested && password.value === '') {
        const randomPw = generatePassword();
        pw_random.style.display = 'block';
        pw_random.innerHTML = `Suggest password: ${randomPw}`;
        sessionStorage.setItem('password', randomPw);
        passwordSuggested = true; 
    }
})

const getRandomPw = () => {
    event.preventDefault();
    password.value = sessionStorage.getItem('password');
    pw_random.style.display = 'none';
}

const showPw = () => {
    if(openPw.checked == true) {
        password.type = 'text';
    }
    else {
        password.type = 'password';
    }
}

let buttonClicked = false;
const login = () => {
    event.preventDefault();

    buttonClicked = true;
    if(buttonClicked) {
        email.addEventListener('keyup', validateEmail);
        password.addEventListener('keyup', validatePassword);
    }

    if(email.value === '' || password.value === '' || !isValidateEmail || !isValidatePassword) {
        alertSMS.classList.add('show');
        setTimeout(() => {
            alertSMS.classList.remove('show');
        }, 3000)
        setTimeout(() => {
            validateEmail();
            validatePassword();
        }, 300)
        return;
    } else {
        loginBtn.classList.add('loading');
        loginBtn.disabled = true;
        email.disabled = true;
        password.disabled = true;
        setTimeout(() => {
            loginBtn.classList.remove('loading');
            loginBtn.disabled = false;
            email.disabled = false;
            password.disabled = false;
            location.href = 'homepage.html';
        }, 2000)
    }
}

let register = () => {
    event.preventDefault();
    if(fullname.value === '' || email.value === '' || password.value === '') {
        alert("Please ensure all required fields are filled out correctly before register. Thank you!");
        invalidName();
        invalidEmail();
        invalidPassword();
        return;
    }
    else {
        registerBtn.classList.add('loading');
        registerBtn.disabled = true;

        setTimeout(() => {
            registerBtn.classList.remove('loading');
            registerBtn.disabled = false;
            location.href = 'verify.html';
        }, 2000)
    }
}


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

let isValidateFullname = {value: false};
let isValidateEmail = {value: false};
let isValidatePassword = {value: false};

const fullnamePattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const validateField = (input, label, pattern, isValidRef) => {
    const value = input.value; 
    if(value === '' || !pattern.test(value)) {
        input.style.borderColor = 'var(--errors)';
        label.style.color = 'var(--errors)';
        isValidRef.value = false;
        return;
    } else {
        input.style.borderColor = '';
        label.style.color = 'var(--main-color)';
        isValidRef.value = true;
    }
}

let validateFullname = () => {
    validateField(fullname, lblName, fullnamePattern, isValidateFullname);
}
let validateEmail = () => {
    validateField(email, lblEmail, emailPattern, isValidateEmail);
}
let validatePassword = () => {
    validateField(password, lblPassword, passwordPattern, isValidatePassword);
}

let passwordSuggested = false;
const generatePassword = () => {
    const length = 12;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$!%*?&';
    let pwGenerated = '';
    
    do {
        pwGenerated = '';
        for(let i = 0; i < length; i++) {
            const randomPw = Math.floor(Math.random() * charset.length);
            pwGenerated += charset[randomPw];
        }
    } while(!passwordPattern.test(pwGenerated));

    return pwGenerated;
}

password.addEventListener('focus', () => {
    if (!passwordSuggested && password.value === '') {
        const randomPw = generatePassword();
        pw_random.style.display = 'block';
        pw_random.innerHTML = `Strong password: ${randomPw}`;
        sessionStorage.setItem('password', randomPw);
        passwordSuggested = true; 
    }
})

document.addEventListener('click', (event) => {
    if(!pw_random.contains(event.target) && !password.contains(event.target)) {
        setTimeout(() => pw_random.style.display = 'none', 200);
    }
})

const getRandomPw = () => {
    event.preventDefault();
    password.value = sessionStorage.getItem('password');
    pw_random.style.display = 'none';
}

const showPw = () => {
    password.type = openPw.checked ? 'text' : 'password';
}

let buttonClicked = false;
const login = () => {
    event.preventDefault();

    buttonClicked = true;
    if(buttonClicked) {
        email.addEventListener('keyup', validateEmail);
        password.addEventListener('keyup', validatePassword);
    }

    if(email.value === '' || password.value === '' || !isValidateEmail.value || !isValidatePassword.value) {
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

    buttonClicked = true;
    if(buttonClicked) {
        fullname.addEventListener('keyup', validateFullname);
        email.addEventListener('keyup', validateEmail);
        password.addEventListener('keyup', validatePassword);
    }

    if(fullname.value === '' || email.value === '' || password.value === '' || !isValidateFullname.value || !isValidateEmail.value || !isValidatePassword.value) {
        alertSMS.classList.add('show');
        setTimeout(() => {
            alertSMS.classList.remove('show');
        }, 3000)
        setTimeout(() => {
            validateFullname();
            validateEmail();
            validatePassword();
        }, 300)
        return;
    }
    else {
        registerBtn.classList.add('loading');
        registerBtn.disabled = true;
        fullname.disabled = true;
        email.disabled = true;
        password.disabled = true;
        setTimeout(() => {
            registerBtn.classList.remove('loading');
            registerBtn.disabled = false;
            fullname.disabled = false;
            email.disabled = false;
            password.disabled = false;
            location.href = 'verify.html';
        }, 1000)
    }
}

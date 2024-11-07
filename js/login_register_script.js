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

const invalidName = () => {
    if (fullname.value === '') {
        fullname.style.borderColor = 'var(--errors)';
        lblName.style.color = 'var(--errors)';
    }
    else {
        fullname.style.borderColor = '';
        lblName.style.color = 'var(--main-color)';
    }
}

const invalidEmail = () => {
    if (email.value === '') {
        email.style.borderColor = 'var(--errors)';
        lblEmail.style.color = 'var(--errors)';
    }
    else {
        email.style.borderColor = '';
        lblEmail.style.color = 'var(--main-color)';
    }
}

const invalidPassword = () => {
    if (password.value === '') {
        password.style.borderColor = 'var(--errors)';
        lblPassword.style.color = 'var(--errors)';
    }
    else {
        password.style.borderColor = '';
        lblPassword.style.color = 'var(--main-color)';
    }
}

const checkName = () => {
    const nameValid = fullname.value;
    const namePattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
    if(!namePattern.test(nameValid) && nameValid !== '') {
        fullname.style.borderColor = 'var(--errors)';
        lblName.style.color = 'var(--errors)';
    }
    else {
        fullname.style.borderColor = '';
        lblName.style.color = 'var(--main-color)';
    }
}

const checkEmail = () => {
    let emailcheck = email.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(emailcheck) && emailcheck !== '') {
        email.style.borderColor = 'var(--errors)';
        lblEmail.style.color = 'var(--errors)';
        isEmailValid = false;
    }
    else {
        email.style.borderColor = '';
        lblEmail.style.color = 'var(--main-color)';
        isEmailValid = true;
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

const checkPassword = () => {
    let passwordcheck = password.value;
    const passwordpattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!passwordpattern.test(passwordcheck) && passwordcheck !== '') {
        password.style.borderColor = 'var(--errors)';
        lblPassword.style.color = 'var(--errors)';
        pw_random.style.display = 'none';
        isPasswordValid = false;
    }
    else {
        password.style.borderColor = '';
        lblPassword.style.color = 'var(--main-color)';
        isPasswordValid = true;
    }
}

const showPw = () => {
    if(openPw.checked == true) {
        password.type = 'text';
    }
    else {
        password.type = 'password';
    }
}

const login = () => {
    event.preventDefault();
    if(email.value === '' || password.value === '') {
        alertSMS.style.opacity = '1';
        alertSMS.style.top = '20px';
        setTimeout(() => {
            alertSMS.style.top = '-10px';
            alertSMS.style.opacity = '0'
        }, 2000)
        setTimeout(() => {
            invalidEmail();
            invalidPassword();
        }, 10000)
        return;
    }
    else {
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


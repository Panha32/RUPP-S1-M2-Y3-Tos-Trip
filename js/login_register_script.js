const gotoSearch = (link) => {
    let linkLocation = link.textContent;
    sessionStorage.setItem("linkText", linkLocation);
    location.href = 'search_result.html';
}

let fullname = document.getElementById('name');
let email = document.getElementById('email');
let password = document.getElementById('password');
let lblName = document.getElementById('lblName');
let lblEmail = document.getElementById('lblEmail');
let lblPassword = document.getElementById('lblPassword');
let openPw = document.getElementById('openPw');
let pw_random = document.getElementById('pw-random');

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

let isNameValid = false;
const checkName = () => {
    const nameValid = fullname.value;
    const namePattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
    if(!namePattern.test(nameValid) && nameValid !== '') {
        fullname.style.borderColor = 'var(--errors)';
        lblName.style.color = 'var(--errors)';
        isNameValid = false;
    }
    else {
        fullname.style.borderColor = '';
        lblName.style.color = 'var(--main-color)';
        isNameValid = true;
    }
    return isNameValid;
}

let isEmailValid = false;
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
    return isEmailValid;
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

let isPasswordValid = false;
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
    return isPasswordValid;
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
        alert("Please ensure all required fields are filled out correctly before logging in. Thank you!");
        invalidEmail();
        invalidPassword();
        return;
    }

    checkEmail();
    checkPassword();

    if(!isEmailValid || !isPasswordValid) {
        alert("Please ensure all fields meet the required format.");
        return;
    }
    else {
        location.href = 'homepage.html';
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

    checkName()
    checkEmail();
    checkPassword();

    if(!isNameValid || !isEmailValid || !isPasswordValid) {
        alert("Please ensure all fields meet the required format.");
        return;
    }
    else {
        location.href = 'verify.html';
    }
}


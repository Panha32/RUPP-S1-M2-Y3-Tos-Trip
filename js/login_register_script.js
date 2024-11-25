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
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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
    if(openPw.checked == true) {
        password.type = 'text';
    }
    else {
        password.type = 'password';
    }
}

let buttonClicked = false;

const handleFormSubmission = (inputs, validators, button, alertElement, redirectUrl, delay = 1000) => {
    event.preventDefault();

    buttonClicked = true;
    if(buttonClicked) {
        inputs.forEach((input, index) => {
            input.addEventListener('keyup', validators[index]);
        });
    }

    const allInputValid = inputs.every((input, index) => {
        input.value !== '' && validators[index]()
    });

    if(!allInputValid) {
        alertElement.classList.add('show');
        setTimeout(() => alertElement.classList.remove('show'), 3000);
        setTimeout(() => validators.forEach((validate) => validate()), 300);
        return;
    }

    button.classList.add('loading');
    button.disabled = true;
    inputs.forEach(input => input.disabled = true);

    setTimeout(() => {
        button.classList.remove('loading');
        button.disabled = false;
        inputs.forEach(input => input.disabled = false);
        location.href = redirectUrl;
    }, delay);
}

const login = () => {
    handleFormSubmission([email, password], [validateEmail, validatePassword], loginBtn, alertSMS, 'homepage.html', 2000);
}
const register = () => {
    handleFormSubmission([fullname, email, password], [validateFullname, validateEmail, validatePassword], registerBtn, alertSMS, 'verify.html', 1000);
}
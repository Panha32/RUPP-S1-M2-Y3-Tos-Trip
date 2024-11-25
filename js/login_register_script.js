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

const showAlert = () => {
    alertSMS.classList.add('show');
    setTimeout(() => {
        alertSMS.classList.remove('show');
    }, 3000);
};

const validateAllFields = (inputs, validators, validityRefs) => {
    inputs.forEach((input, index) => validators[index]());
    return validityRefs.every(ref => ref.value === true);
};

const toggleFormState = (inputs, button, disable) => {
    inputs.forEach(input => (input.disabled = disable));
    button.disabled = disable;
    button.classList.toggle('loading', disable);
};

const handleSubmit = (inputs, validators, validityRefs, button, redirectUrl) => {
    event.preventDefault();
    buttonClicked = true;

    inputs.forEach((input, index) => {
        input.addEventListener('keyup', validators[index]);
    });

    if (!validateAllFields(inputs, validators, validityRefs)) {
        showAlert();
        setTimeout(() => validateAllFields(inputs, validators, validityRefs), 300);
        return;
    }

    toggleFormState(inputs, button, true);
    setTimeout(() => {
        toggleFormState(inputs, button, false);
        location.href = redirectUrl;
    }, redirectUrl === 'homepage.html' ? 2000 : 1000);
}

const login = () => {
    const inputs = [email, password];
    const validators = [validateEmail, validatePassword];
    const validityRefs = [isValidateEmail, isValidatePassword];
    handleSubmit(inputs, validators, validityRefs, loginBtn, 'homepage.html');
}

const register = () => {
    const inputs = [fullname, email, password];
    const validators = [validateFullname, validateEmail, validatePassword];
    const validityRefs = [isValidateFullname, isValidateEmail, isValidatePassword];
    handleSubmit(inputs, validators, validityRefs, registerBtn, 'verify.html');
}
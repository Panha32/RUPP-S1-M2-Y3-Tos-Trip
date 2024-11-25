let modalEl = document.getElementById('staticBackdrop');
let modalInstance = new bootstrap.Modal(modalEl);

let fName = document.getElementById('fName');
let lName = document.getElementById('lName');
let email = document.getElementById('email');
let phoneNumber = document.getElementById('phoneNumber');
let lblFname = document.getElementById('lblFname');
let lblLname = document.getElementById('lblLname');
let lblEmail = document.getElementById('lblEmail');
let lblPhoneNumber = document.getElementById('lblPhoneNumber');

const namePattern = /^[A-Za-z]+$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

document.addEventListener("DOMContentLoaded", function() {
    const defaultValue = document.getElementById('email');
    defaultValue.value = "panhacoderjs168@gmail.com";
    defaultValue.style.borderColor = '#99c3f7';
});

function formatString(e) {
    var inputChar = String.fromCharCode(event.keyCode);
    var code = event.keyCode;
    var allowedKeys = [8];
    if (allowedKeys.indexOf(code) !== -1) {
        return;
    }
  
    event.target.value = event.target.value.replace(
        /^([1-9]\/|[2-9])$/g, '0$1/'
    ).replace(
        /^(0[1-9]|1[0-2])$/g, '$1/'
    ).replace(
        /^([0-1])([3-9])$/g, '0$1/$2'
    ).replace(
        /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2'
    ).replace(
        /^([0]+)\/|[0]+$/g, '0' 
    ).replace(
        /[^\d\/]|^[\/]*$/g, ''
    ).replace(
        /\/\//g, '/'
    );
}

function validCard(cardNumber) {
    // Remove all non-num characters (e.g., spaces or hyphens)
    const cleanedCardNumber = cardNumber.replace(/[^0-9]/g, '');

    // Check if the input length is valid (most cards have between 13 and 19 nums)
    if (cleanedCardNumber.length < 13 || cleanedCardNumber.length > 19) {
        return false;
    }

    let sum = 0;
    let shouldDouble = false;

    // Loop through the card number nums, starting from the last num
    for (let i = cleanedCardNumber.length - 1; i >= 0; i--) {
        let num = parseInt(cleanedCardNumber[i], 10);

        if (shouldDouble) {
            num *= 2;
            if (num > 9) {
                num -= 9; // If the result is a two-num number, subtract 9
            }
        }

        sum += num;
        shouldDouble = !shouldDouble; // Toggle the doubling
    }

    // If the total sum is divisible by 10, it's a valid card number
    return sum % 10 === 0;
}

// const n = '4539 1488 0343 6467';
// if (validCard(n)) {
//     console.log('Valid credit card number.');
// } else {
//     console.log('Invalid credit card number.');
// }

const form_control = [
    document.getElementById('fName'), 
    document.getElementById('lName'), 
    document.getElementById('cardName'),
    document.getElementById('email'), 
    document.getElementById('phoneNumber'),
    document.getElementById('cardNumber'), 
    document.getElementById('securityCode'), 
    document.getElementById('expireDate'), 
    document.getElementById('zipCode')
];

const setFieldStyle = (inputElement, labelElement, isValid) => {
    const errorColor = "var(--errors)";
    const defaultColor = "";

    if (isValid) {
        inputElement.style.borderColor = defaultColor;
        labelElement.style.color = defaultColor;
    } else {
        inputElement.style.borderColor = errorColor;
        labelElement.style.color = errorColor;
    }
};

const invalidFirstName = () => {
    setFieldStyle(fName, lblFname, false);
};
const validFirstName = () => {
    setFieldStyle(fName, lblFname, true);
};

const invalidLastName = () => {
    setFieldStyle(lName, lblLname, false);
};
const validLastName = () => {
    setFieldStyle(lName, lblLname, true);
};

const invalidEmail = () => {
    setFieldStyle(email, lblEmail, false);
};
const validEmail = () => {
    setFieldStyle(email, lblEmail, true);
};


const toggleFields = (fields, isDisabled) => {
    fields.forEach((field) => {
        field.disabled = isDisabled;
    });
};
const updateLabelsOpacity = (labels, opacity) => {
    labels.forEach((label) => {
        label.style.opacity = opacity;
    });
};
const updateCursor = (elements, cursorStyle) => {
    elements.forEach((element) => {
        element.style.cursor = cursorStyle;
    });
};
const validateName = (inputElement, invalidFunction, validFunction) => {
    let inputElementValue = inputElement.value.trim();
    if (!inputElementValue || !namePattern.test(inputElementValue)) {
        invalidFunction();
    } else {
        validFunction();
    }
};
  
const firstNameValidation = () => validateName(fName, invalidFirstName, validFirstName);
const lastNameValidation = () => validateName(lName, invalidLastName, validLastName);
function emailValidtation() {
    let emailValue = email.value.trim();
    if (!emailValue || !emailPattern.test(emailValue)) {
        invalidEmail();
    } else {
        validEmail();
    }
}

form_control.forEach(input => {
    input.addEventListener('focus', function () {
        input.style.borderColor = '#3064e0';
    });
    input.addEventListener('blur', function () {
        if (input.value) {
            input.style.borderColor = '#99c3f7'; 
        } else {
            input.style.borderColor = '';  
        }
    });
});

let booking = () => {
    let allInputFilled = true;

    form_control.forEach(input => {
        if(input.value.trim() === '') {
            input.style.borderColor = 'var(--errors)';
            allInputFilled = false;
        }
    })
    if(!allInputFilled) {
        alert("Please fill out all required fields to complete your booking!");
        return;
    }
    modalInstance.show();
}

let closeBooking = () => {
    modalInstance.hide();
    setTimeout(goTo = () => {
        location.href = 'mybooking.html';
    }, 1000)
}
  
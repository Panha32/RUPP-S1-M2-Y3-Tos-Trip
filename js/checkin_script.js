let modalEl = document.getElementById('staticBackdrop');
let modalInstance = new bootstrap.Modal(modalEl);

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
        /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
    ).replace(
        /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
    ).replace(
        /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
    ).replace(
        /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
    ).replace(
        /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
    ).replace(
        /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
    ).replace(
        /\/\//g, '/' // Prevent entering more than 1 `/`
    );
}

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

form_control.forEach(input => {
    input.addEventListener('input', function () {
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
  
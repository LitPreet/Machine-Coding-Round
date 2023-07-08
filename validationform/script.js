const form = document.getElementById('form');
const userName = document.getElementById('Username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('password2');
const submitSection = document.querySelector('.submit-section');
const container = document.querySelector('.container');


//function return false if the input is empty
const isRequired = value => value === '' ? false : true;

// The following isBetween() function returns false if the length argument is not between the min and max argument
const isBetween = (length, min, max) => length > max || length < min ? false : true;

//check the emial using rexEXp
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

//is password strong or not
const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
}

//develop function that show error and success
const showError = (input,message) =>{
    const formField =  input.parentElement.parentElement;
    
    //add the error class
    formField.classList.add("error");
    //remove success class
    formField.classList.remove('succes');

    //show message
    const error = formField.querySelector('#small');
    error.textContent = message;
    console.log(message);

}

const showSuccess = (input) =>{
    const formField =  input.parentElement.parentElement;
    
    //add the error class
    formField.classList.add("succes");
    //remove success class
    formField.classList.remove('error');

    //show message
    const error = document.querySelector('small');
    error.textContent = "";

}

//valid userName
const checkUserName = () =>{
    let valid = false;
    const min = 3;
    const max = 25;
    const username = userName.value.trim();
    
    if(!isRequired(username))
    {
        showError(userName,'Username cannot be empty');
    }
    else if (!isBetween(username.length,min,max))
    {
        showError(userName,`Username must be between ${min} and ${max} characters.`)
    }
    else
    {
        showSuccess(userName);
        valid = true;
    }
    return valid;
}

const checkEmail = () =>{
    let valid = false;
    const EmailValue = email.value.trim();
    if(!isRequired(EmailValue))
    {
        showError(email,'email cannot be empty');
    }
    else if(!isEmailValid(EmailValue))
    {
        showError(email,'Email is not valid')
    }
    else{
        showSuccess(email);
        valid = true;
    }
    return valid;


}


const checkPassword = () => {

    let valid = false;

    const passwordVal = password.value.trim();

    if (!isRequired(passwordVal)) {
        showError(password, 'Password cannot be blank.');
    } else if (!isPasswordSecure(passwordVal)) {
        showError(password, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
    } else {
        showSuccess(password);
        valid = true;
    }

    return valid;
};

const checkConfirmPassword = () => {
    let valid = false;
    // check confirm password
    const confirmPasswordVal = confirmPassword.value.trim();
    const passwordVal = password.value.trim();

    if (!isRequired(confirmPasswordVal)) {
        showError(confirmPassword, 'Please enter the password again');
    } else if (passwordVal !== confirmPasswordVal) {
        showError(confirmPassword, 'Confirm password does not match');
    } else {
        showSuccess(confirmPassword);
        valid = true;
    }

    return valid;
};

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};


//validate form
form.addEventListener('submit',(e) =>{
    e.preventDefault();
let isUsernameValid = checkUserName();
let isEmailValid = checkEmail();
let isPasswordValid = checkPassword();
let isConfirmPasswordValid = checkConfirmPassword();

let isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;

if(isFormValid)
{
submitSection.classList.remove('hidden');
container.classList.add('hidden');
}
else{
    submitSection.classList.add('hidden');
container.classList.remove('hidden');
}

})

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'Username':
            checkUserName();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'password2':
            checkConfirmPassword();
            break;
    }
}));
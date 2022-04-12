const form = document.getElementById('form');
// Get the input fields
var name1 = document.querySelector('#fName');
const lastN = document.getElementById('fLastN');
const email = document.getElementById('fEmail');
var password = document.querySelector('#fPassword');
const address = document.getElementById('fAddress');
var phone = document.querySelector('#fPhone');
//AQUI He MODIFICADO, venia var password = document.querySelector('.password') y es fPassword y con #

// Get the error elements

var errorName = document.getElementById('errorName');
const errorLastN = document.getElementById('errorLastN');
const errorEmail = document.getElementById('errorEmail');
var errorPassword = document.getElementById('errorPassword');
const errorAddress = document.getElementById('errorAddress');
var errorPhone = document.getElementById('errorPhone');

const validations = {
  name: false,
  lastName: false,
  email: false,
  password: false,
  address: false,
  phone: false,
};
form.addEventListener('submit', (e) => {
  e.preventDefault();
});
// Exercise 6
function validate() {
  // Validate fields entered by the user: name, phone, password, and email
  validateName(name1.value);
  validateNameLastName(lastN.value);
  validateEmail(email.value);
  validatePassword(password.value);
  validateAddress(address.value);
  validatePhone(phone.value);

  sendForm();
}

const validateName = (name1) => {
  const regexName = /^[A-Za-z]{3,}$/;
  if (!regexName.test(name1)) {
    errorName.classList.remove('invalid-feedback');
    validations.name = false;
  } else {
    errorName.classList.add('invalid-feedback');
    validations.name = true;
  }
};
const validateNameLastName = (lastN) => {
  const regexName = /^[A-Za-z]{4,}$/;
  if (!regexName.test(lastN)) {
    errorLastN.classList.remove('invalid-feedback');
    validations.lastName = false;
  } else {
    errorLastN.classList.add('invalid-feedback');
    validations.lastName = true;
  }
};

const validateEmail = (email) => {
  const emailRegex =
    /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*){3,}|(".+"){3,})@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailRegex.test(email)) {
    errorEmail.classList.remove('invalid-feedback');
    validations.email = false;
  } else {
    errorEmail.classList.add('invalid-feedback');
    validations.email = true;
  }
};

const validatePassword = (password) => {
  const regexValidateLetter = /^.{0,}[a-zA-Z].{0,}/;
  const regexValidateNumber = /^.{0,}[0-9].{0,}/;
  if (
    !(regexValidateLetter.test(password) && regexValidateNumber.test(password))
  ) {
    errorPassword.classList.remove('invalid-feedback');
    validations.password = false;
  } else {
    errorPassword.classList.add('invalid-feedback');
    validations.password = true;
  }
};

const validatePhone = (phone) => {
  const regexPhone = /^[0-9]{3,}$/;
  if (!regexPhone.test(phone)) {
    errorPhone.classList.remove('invalid-feedback');
    validations.phone = false;
  } else {
    errorPhone.classList.add('invalid-feedback');
    validations.phone = true;
  }
};

const validateAddress = (address) => {
  const regexAddress = /^[A-Za-z]{4,}$/;
  if (!regexAddress.test(address)) {
    errorAddress.classList.remove('invalid-feedback');
    validations.address = false;
  } else {
    errorAddress.classList.add('invalid-feedback');
    validations.address = true;
  }
};

const sendForm = () => {
  const values = Object.values(validations);

  if (values.every((el) => el)) {
    document.getElementById('bird').classList.add('bird-move');
    setTimeout(() => {
      document.getElementById('bird').classList.remove('bird-move');
      document.querySelector('form').submit();
    }, 3000);
  } else {
    form.classList.add('shake');
    document.getElementById('form__border').classList.add('shake-border');
    setTimeout(() => {
      form.classList.remove('shake');
      document.getElementById('form__border').classList.remove('shake-border');
    }, 1000);
  }
};

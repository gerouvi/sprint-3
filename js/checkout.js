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

document.querySelector('form').addEventListener('submit', (e) => {
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
}

const validateName = (name1) => {
  const regexName = /^[A-Za-z]{4,}$/;
  if (!regexName.test(name1)) errorName.classList.remove('invalid-feedback');
  else errorName.classList.add('invalid-feedback');
};
const validateNameLastName = (lastN) => {
  const regexName = /^[A-Za-z]{4,}$/;
  if (!regexName.test(lastN)) errorLastN.classList.remove('invalid-feedback');
  else errorLastN.classList.add('invalid-feedback');
};

const validateEmail = (email) => {
  const emailRegex =
    /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*){3,}|(".+"){3,})@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*){3,}|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailRegex.test(email)) errorEmail.classList.remove('invalid-feedback');
  else errorEmail.classList.add('invalid-feedback');
};

const validatePassword = (password) => {
  const regexValidateLetter = /^.{0,}[a-zA-Z].{0,}/;
  const regexValidateNumber = /^.{0,}[0-9].{0,}/;
  if (
    !(regexValidateLetter.test(password) && regexValidateNumber.test(password))
  )
    errorPassword.classList.remove('invalid-feedback');
  else errorPassword.classList.add('invalid-feedback');
};

const validatePhone = (phone) => {
  const regexPhone = /^[0-9]{3,}$/;
  if (!regexPhone.test(phone)) errorPhone.classList.remove('invalid-feedback');
  else errorPhone.classList.add('invalid-feedback');
};

const validateAddress = (address) => {
  const regexAddress = /^[A-Za-z]{4,}$/;
  if (!regexAddress.test(address))
    errorAddress.classList.remove('invalid-feedback');
  else errorAddress.classList.add('invalid-feedback');
};

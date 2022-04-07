// If you have time, you can move this variable "products" to a json file and load the data in this js. It will look more professional
let products = [];
fetch('js/products.json')
  .then((res) => res.json())
  .then((res) => res.forEach((el) => products.push(el)));

// Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

// Exercise 1
function buy(id) {
  // 1. Loop for to the array products to get the item to add to cart
  // 2. Add found product to the cartList array
  const product = products.find((el) => el.id === id);
  if (product) cartList.push(product);
}

// Exercise 2
function cleanCart() {
  cartList = [];
}

// Exercise 3
function calculateTotal() {
  // Calculate total price of the cart using the "cartList" array
  if (cartList) total = cartList.reduce((acc, curr) => acc + curr.price, 0);
  else total = 0;

  return total;
}

// Exercise 4
function generateCart() {
  // Using the "cartlist" array that contains all the items in the shopping cart,
  // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.
  cart = [];
  const objectReduced = cartList.reduce((acc, curr) => {
    if (!acc[curr.id]) {
      acc = {
        ...acc,
        [curr.id]: {
          ...curr,
          quantity: 1,
        },
      };
      return acc;
    } else {
      acc[curr.id].quantity++;
      return acc;
    }
  }, {});
  const keys = Object.keys(objectReduced);
  keys.forEach((key) => cart.push(objectReduced[key]));
}

// Exercise 5
function applyPromotionsCart() {
  // Apply promotions to each item in the array "cart"
  cart.forEach((el) => {
    if (el.id === 1 && el.quantity >= 3) {
      el.subtotal = el.quantity * el.price;
      el.subtotalWithDiscount = el.quantity * 10;
    } else if (el.id === 3 && el.quantity >= 10) {
      el.subtotal = el.quantity * el.price;
      el.subtotalWithDiscount = (el.subtotal * 2) / 3;
    }
  });
}

// ** Nivell II **
// Exercise 7
function addToCart(id) {
  // Refactor previous code in order to simplify it
  // 1. Loop for to the array products to get the item to add to cart
  // 2. Add found product to the cart array or update its quantity in case it has been added previously.

  const product = products.find((el) => el.id === id);
  const index = cart.findIndex((el) => {
    return el.id === id;
  });

  if (index == -1) {
    product.quantity = 1;
    cart.push(product);
  } else {
    cart[index].quantity++;
  }
}

// Exercise 8

function removeFromCart(id) {
  // 1. Loop for to the array products to get the item to add to cart
  // 2. Add found product to the cartList array

  const elementToReduce = cart.findIndex((el) => el.id === id);

  if (cart[elementToReduce].quantity > 1) cart[elementToReduce].quantity--;
  else cart.splice(elementToReduce, 1);
}

// Exercise 9
function printCart() {
  calculateTotal();
  generateCart();
  applyPromotionsCart();
  // Fill the shopping cart modal manipulating the shopping cart dom
  const modalDiv = document.getElementById('resumCartModal');
  modalDiv.classList.add('resumCartModal');
  while (modalDiv.firstChild) {
    modalDiv.removeChild(modalDiv.firstChild);
  }
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  div.classList.add('modalTitles');
  const definition = document.createElement('span');
  definition.textContent = 'Product';
  const price = document.createElement('span');
  price.textContent = 'Price';
  const quantity = document.createElement('span');
  quantity.textContent = 'Quantity';
  const priceBeforDescount = document.createElement('span');
  priceBeforDescount.textContent = 'Before discount';
  const finalPrice = document.createElement('span');
  finalPrice.textContent = 'Final price';
  div.append(definition);
  div.append(price);
  div.append(quantity);
  div.append(priceBeforDescount);
  div.append(finalPrice);
  fragment.append(div);

  cart.forEach((el) => {
    const div = document.createElement('div');
    div.classList.add('modalRow');
    const item = document.createElement('span');
    item.textContent = el.name;
    div.append(item);
    const price = document.createElement('span');
    price.textContent = `${el.price} €`;
    div.append(price);
    const quantity = document.createElement('span');
    quantity.textContent = el.quantity;
    div.append(quantity);
    // const total = document.createElement('span');
    if (el.subtotal) {
      const subtotal = document.createElement('span');
      subtotal.textContent = `${el.subtotal} €`;
      div.append(subtotal);
      const subtotalWithDiscount = document.createElement('span');
      subtotalWithDiscount.textContent = `${el.subtotalWithDiscount.toFixed(
        2
      )} €`;
      div.append(subtotalWithDiscount);
    } else {
      const discount = document.createElement('span');
      discount.textContent = '-';
      div.append(discount);
      const total1 = document.createElement('span');
      total1.textContent = `${(el.price * el.quantity).toFixed(2)} €`;
      div.append(total1);
    }
    const buttonDelete = document.createElement('button');
    buttonDelete.setAttribute('data-removeidproduct', el.id);
    buttonDelete.textContent = '-';
    div.append(buttonDelete);
    const buttonAdd = document.createElement('button');
    buttonAdd.setAttribute('data-addidproduct', el.id);
    buttonAdd.textContent = '+';
    div.append(buttonAdd);
    fragment.append(div);
  });
  const totalDiv = document.createElement('div');
  const descriptionTotal = document.createElement('span');
  descriptionTotal.textContent = 'Total';
  const amountTotal = document.createElement('span');
  amountTotal.textContent = `${total.toFixed(2)} €`;
  totalDiv.append(descriptionTotal);
  totalDiv.append(amountTotal);
  fragment.append(totalDiv);
  modalDiv.append(fragment);

  const addButtons = document.querySelectorAll('[data-addidproduct]');

  addButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const id = Number(e.target.getAttribute('data-addidproduct'));
      buy(id);
      printCart();
    });
  });

  const removeButtons = document.querySelectorAll('[data-removeidproduct]');
  removeButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const id = Number(e.target.getAttribute('data-removeidproduct'));
      const firstIndexToRemove = cartList.findIndex((el) => el.id === id);
      cartList.splice(firstIndexToRemove, 1);
      printCart();
    });
  });
}

function open_modal() {
  console.log('Open Modal');
  printCart();
}

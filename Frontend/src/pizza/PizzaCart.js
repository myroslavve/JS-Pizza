/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');

//Перелік розмірів піци
var PizzaSize = {
  Big: 'big_size',
  Small: 'small_size',
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
let $cart = document.getElementById('cart-list');
const totalPrice = document.getElementById('total-price');
const clearCartButton = document.getElementById('clear-cart');
const counter = document.getElementById('pizza-in-cart');

function addToCart(pizza, size) {
  if (
    Cart.find(
      (cart_item) => cart_item.pizza.id === pizza.id && cart_item.size === size,
    )
  ) {
    Cart.find(
      (cart_item) => cart_item.pizza.id === pizza.id && cart_item.size === size,
    ).quantity += 1;
  } else {
    Cart.push({
      pizza: pizza,
      size: size,
      quantity: 1,
    });
  }

  //Оновити вміст кошика на сторінці
  updateCart();
}

function removeFromCart(cart_item) {
  //Видалити піцу з кошика
  //TODO: треба зробити
  Cart = Cart.filter(
    (item) =>
      item.pizza.id !== cart_item.pizza.id || item.size !== cart_item.size,
  );

  //Після видалення оновити відображення
  updateCart();
}

function clearCart() {
  //Очистити кошик
  Cart = [];

  //Після видалення оновити відображення
  updateCart();
}

function initialiseCart() {
  //Фукнція віпрацьвуватиме при завантаженні сторінки
  //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
  //TODO: ...
  clearCartButton.onclick = clearCart;

  updateCart();
}

function getPizzaInCart() {
  //Повертає піци які зберігаються в кошику
  return Cart;
}

function updateCart() {
  //Функція викликається при зміні вмісту кошика
  //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

  //Очищаємо старі піци в кошику
  $cart.innerHTML = '';
  const total = Cart.reduce(
    (acc, item) => acc + item.pizza[item.size].price * item.quantity,
    0,
  );
  totalPrice.innerHTML = total + ' грн';
  counter.innerHTML = Cart.reduce((acc, item) => acc + item.quantity, 0);

  //Онволення однієї піци
  function showOnePizzaInCart(cart_item) {
    var html_code = Templates.PizzaCart_OneItem(cart_item);

    const parser = new DOMParser();
    const doc = parser.parseFromString(html_code, 'text/html');
    const node = doc.body.firstChild;

    node.querySelector('.plus').onclick = function () {
      //Збільшуємо кількість замовлених піц
      cart_item.quantity += 1;

      //Оновлюємо відображення
      updateCart();
    };

    node.querySelector('.minus').onclick = function () {
      //Збільшуємо кількість замовлених піц
      cart_item.quantity -= 1;

      if (cart_item.quantity === 0) {
        removeFromCart(cart_item);
      }

      //Оновлюємо відображення
      updateCart();
    };

    node.querySelector('.remove').onclick = function () {
      removeFromCart(cart_item);
    };

    $cart.append(node);
  }

  Cart.forEach(showOnePizzaInCart);
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;

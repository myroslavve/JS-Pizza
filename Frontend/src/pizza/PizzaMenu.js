/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML едемент куди будуть додаватися піци
var $pizza_list = document.getElementById('pizza_list');
const pizzaFilter = document.getElementsByClassName('pizza-types')[0];

function showPizzaList(list) {
  //Очищаємо старі піци в кошику
  $pizza_list.innerHTML = '';

  //Онволення однієї піци
  function showOnePizza(pizza) {
    var html_code = Templates.PizzaMenu_OneItem({ pizza: pizza });

    // Parse html code to DOM element
    // const container = document.createElement('div');
    // container.innerHTML = html_code;
    // const node = container.firstChild;
    const parser = new DOMParser();
    const doc = parser.parseFromString(html_code, 'text/html');
    const node = doc.body.firstChild;
    buySmall = node.querySelector('.buy-small');
    buyBig = node.querySelector('.buy-big');

    if (buyBig)
      buyBig.addEventListener('click', () => {
        PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
      });
    if (buySmall)
      buySmall.addEventListener('click', () => {
        PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
      });

    $pizza_list.append(node);
  }

  list.forEach(showOnePizza);
}

function filterPizza(filter) {
  //Масив куди потраплять піци які треба показати
  var pizza_shown = [];

  Pizza_List.forEach(function (pizza) {
    //Якщо піка відповідає фільтру
    if (
      filter === 'all' ||
      pizza.content[filter] ||
      (filter === 'vegan' && pizza.type === 'Вега піца')
    )
      pizza_shown.push(pizza);

    //TODO: зробити фільтри
  });

  //Показати відфільтровані піци
  showPizzaList(pizza_shown);
  updateFilterLabel(filter, pizza_shown.length);
}

const updateSelectedFilter = (node) => {
  Array.from(pizzaFilter.children).forEach((node) => {
    node.classList.remove('active');
  });
  node.classList.add('active');
};

const updateFilterLabel = (filter, numberOfPizzas) => {
  const filterToLabel = {
    all: 'Усі піци',
    meat: 'М’ясні піци',
    pineapple: 'Піци з ананасами',
    mushroom: 'Піци з грибами',
    ocean: 'Піци з морепродуктами',
    vegan: 'Вега піци',
  };

  const label = document.querySelector('.main-label');
  label.innerHTML = `${filterToLabel[filter]} <span class="indicator">${numberOfPizzas}</span>`;
};

function initialiseMenu() {
  Array.from(pizzaFilter.children).forEach((node) => {
    node.addEventListener('click', () => {
      filterPizza(node.dataset.filter);
      updateSelectedFilter(node);
    });
  });

  //Показуємо усі піци
  showPizzaList(Pizza_List);
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;

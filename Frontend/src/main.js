/**
 * Created by chaika on 25.01.16.
 */

document.addEventListener('DOMContentLoaded', (event) => {
  //This code will execute when the page is ready
  const PizzaMenu = require('./pizza/PizzaMenu');
  const PizzaCart = require('./pizza/PizzaCart');
  const Pizza_List = require('./Pizza_List');
  const Stats = require('./statistics');

  if (document.getElementById('wdr-component')) {
    Stats.initData();
  } else {
    PizzaCart.initialiseCart();
    PizzaMenu.initialiseMenu();
  }
});

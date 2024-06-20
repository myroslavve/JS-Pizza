const initData = () => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  const data = [];
  cart.forEach((element) => {
    data.push({
      type: element.pizza.type,
      title: element.pizza.title,
      quantity: element.quantity,
      weight: element.pizza[element.size].weight,
      price: element.pizza[element.size].price,
      size: element.pizza[element.size].size,
    });
  });
  //   const data = [
  //     {
  //       id: 2,
  //       title: 'BBQ',
  //       type: 'М’ясна піца',
  //       size: 'small_size',
  //       quantity: 2,
  //       weight: 460,
  //       price: 139,
  //     },
  //     {
  //       id: 2,
  //       title: 'BBQ',
  //       type: 'М’ясна піца',
  //       size: 'big_size',
  //       quantity: 2,
  //       weight: 840,
  //       price: 199,
  //     },
  //     {
  //       id: 6,
  //       title: 'Россо Густо',
  //       type: 'Морська піца',
  //       size: 'big_size',
  //       quantity: 2,
  //       weight: 700,
  //       price: 299,
  //     },
  //   ];

  let pivot = new WebDataRocks({
    container: '#wdr-component',
    toolbar: true,
    report: {
      dataSource: {
        data: data,
      },
      slice: {
        rows: [
          { uniqueName: 'type' },
          { uniqueName: 'title' },
          { uniqueName: 'size' },
        ],
        columns: [{ uniqueName: '[Measures]' }],
        measures: [
          {
            uniqueName: 'quantity',
            aggregation: 'sum',
          },
          {
            uniqueName: 'weight',
            aggregation: 'sum',
          },
          {
            uniqueName: 'price',
            aggregation: 'sum',
          },
          {
            uniqueName: 'size',
            aggregation: 'average',
          },
        ],
      },
      options: {
        grid: {
          showGrandTotals: 'columns',
        },
      },
    },
  });
};

exports.initData = initData;

export const calculateDays = (_date1, _date2) => {
  const date1 = new Date(_date1);
  const date2 = new Date(_date2);
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log(diffDays + ' days');
  return diffDays;
};

const helpers = {
  calculateDays
};

export const createOrderRequest = (cart, shippingAddress, billingAddress, shippingAsBilling, gps) => {
  const bAddress = shippingAsBilling
    ? shippingAddress
    : billingAddress;

  const items = cart.items.map((item) => {
    return {
      id: item.id,
      quantity: { count: item.quantity },
      // eslint-disable-next-line camelcase
      bpp_id: cart.bpp.id,
      provider: {
        id: cart.bppProvider.id,
        locations: [
          './retail.kirana/ind.blr/36@mandi.succinct.in.provider_location'
        ]
      }
    };
  });

  const params = {
    context: {
      // eslint-disable-next-line camelcase
      transaction_id: localStorage.getItem('transactionId')
    },
    message: {
      items: items,

      // eslint-disable-next-line camelcase
      billing_info: {
        address: {
          door: bAddress.landmark,
          country: 'IND',
          city: '',
          street: bAddress.address,

          // eslint-disable-next-line camelcase
          area_code: '560078',
          state: '',
          building: ''
        },
        phone: bAddress.mobile,
        name: bAddress.name,
        email: ''
      },

      // eslint-disable-next-line camelcase
      delivery_info: {
        type: 'home_delivery',
        name: shippingAddress.name,
        phone: shippingAddress.mobile,
        email: '',
        location: {
          address: {
            door: shippingAddress.landmark,
            country: 'IND',
            city: '',
            street: shippingAddress.address,

            // eslint-disable-next-line camelcase
            area_code: '560078',
            state: '',
            building: ''
          },
          gps: gps
        }
      }
    }
  };
  return params;
};

export default helpers;

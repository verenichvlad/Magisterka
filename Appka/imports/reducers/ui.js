const defaultState = {
  activeAuthForm: 'login', // or 'signup',
  showNewCarPopup: false,
  showPaymentPopup: false,
  newOrderPopup: {
    ative: false,
    carId: null,
  },
  editOrderPopup: {
    active: false,
    carId: null,
    orderId: null,
  },
  evaluationPopup: {
    active: false,
    order: null,
    car: null,
  },
};

const uiReducer = (state = defaultState, action) => {
  const stateCopy = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case 'SET_AUTH_FORM':
      stateCopy.activeAuthForm = action.activeAuthForm;
      return stateCopy;

    case 'SET_NEW-CAR_POPUP':
      stateCopy.showNewCarPopup = action.active;
      return stateCopy;

    case 'SET_NEW-ORDER_POPUP':
      stateCopy.newOrderPopup = {
        active: action.active,
        carId: action.carId,
      };
      return stateCopy;

    case 'SET_EDIT-ORDER_POPUP':
      stateCopy.editOrderPopup = {
        active: action.active,
        carId: action.carId,
        orderId: action.orderId,
      };
      return stateCopy;

    case 'SET_EVALUATION_POPUP':
      stateCopy.evaluationPopup = {
        active: action.active,
        car: action.car,
        order: action.order,
      };
      return stateCopy;

    case 'SET_PAYMENT_POPUP':
      stateCopy.showPaymentPopup = action.active;
      return stateCopy;

    default: return state;
  }
};

export default uiReducer;

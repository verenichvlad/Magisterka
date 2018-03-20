export const setAuthForm = activeAuthForm => ({
  type: 'SET_AUTH_FORM',
  activeAuthForm,
});

export const setNewOrderPopup = (active, carId) => ({
  type: 'SET_NEW-ORDER_POPUP',
  carId,
  active,
});

export const setEditOrderPopup = (active, carId, orderId) => ({
  type: 'SET_EDIT-ORDER_POPUP',
  carId,
  active,
  orderId,
});

export const setNewCarPopup = active => ({
  type: 'SET_NEW-CAR_POPUP',
  active,
});

export const setEvaluationPopup = (active, car, order) => ({
  type: 'SET_EVALUATION_POPUP',
  active,
  car,
  order,
});

export const setPaymentPopup = active => ({
  type: 'SET_PAYMENT_POPUP',
  active,
});

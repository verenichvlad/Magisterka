const defaultState = {
  userType: '',
};

const allowedUserTypeValues = ['tstation', 'admin', 'cowner', 'partner'];

const authReducer = (state = defaultState, action) => {
  const { type, userType } = action;

  switch (type) {
    case 'SET_USER_TYPE':
      return (allowedUserTypeValues.indexOf(userType) > -1) ? { userType } : state;
    default: return state;
  }
};

export default authReducer;

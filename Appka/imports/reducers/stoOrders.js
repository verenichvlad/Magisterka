const ITEMS_PER_PAGE = 5;

const defaultState = {
  pagesToSkip: 0,
};

export default (state = defaultState, action) => {
  const stateCopy = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case 'CHANGE_PAGE':
      stateCopy.pagesToSkip = action.currentPageNumber * ITEMS_PER_PAGE;
      return stateCopy;
    default:
      return state;
  }
};

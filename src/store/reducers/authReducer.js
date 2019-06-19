const intialState = {
  email: null,
  error: null,
  isLoggedIn: false,
  loadingUser: false,
  authToken: null,
  idToken: null
};

export const authReducer = (state = intialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

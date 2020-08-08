export const reducer = (state, action) => {
  switch (action.type) {
    case "Login":
      return action.payload;
    case "Logout":
      return null;
    default:
      return state;
  }
};

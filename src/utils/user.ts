const checkUserToken = () => localStorage.getItem('token') ?? '';

const deleteTokenInLocalStorage = () => {
  if (localStorage.getItem('token')) localStorage.removeItem('token');
};

export { deleteTokenInLocalStorage, checkUserToken };

// Question
// 혹시 현업에서 로그인 확인은 어떻게 하시는지 여쭤봐도 될까요?
const checkUserToken = () => localStorage.getItem('token') ?? '';

const deleteTokenInLocalStorage = () => {
  if (localStorage.getItem('token')) localStorage.removeItem('token');
};

export { deleteTokenInLocalStorage, checkUserToken };

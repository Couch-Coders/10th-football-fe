const authHeader = () => {
  console.log('auth header');
  const token = localStorage.getItem('token') ?? '';
  return { headers: { Authorization: `Bearer${token}` } };
};

export default authHeader;

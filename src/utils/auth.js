export const isAuthenticated = () => {
  const token = localStorage.getItem('jwt_token');
  return !!token;
};
export function saveAuth(t,u){
  localStorage.setItem('token',t);
  localStorage.setItem('user',JSON.stringify(u));
}
export function clearAuth(){
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}
export function getUser(){
  const u = localStorage.getItem('user');
  return u ? JSON.parse(u) : null;
}

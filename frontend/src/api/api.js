import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
function getToken(){ return localStorage.getItem('token'); }
const client = axios.create({ baseURL: API_BASE });
client.interceptors.request.use(cfg=>{
  const t = getToken();
  if(t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});
export default client;

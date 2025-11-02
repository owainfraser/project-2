import { useState } from 'react';
import client from '../api/api';
import { saveAuth } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [err,setErr]=useState('');
  const nav = useNavigate();
  async function submit(e){
    e.preventDefault();
    try{
      const r = await client.post('/auth/login',{username,password});
      saveAuth(r.data.token, r.data.user);
      nav('/');
    }catch(e){
      setErr(e?.response?.data?.msg || 'login failed');
    }
  }
  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input className="form-control my-2" value={username} onChange={e=>setUsername(e.target.value)} placeholder="username" />
        <input className="form-control my-2" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" type="password" />
        <button className="btn btn-primary">Login</button>
        {err && <div className="text-danger mt-2">{err}</div>}
      </form>
    </div>
  );
}

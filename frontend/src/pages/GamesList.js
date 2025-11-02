import { useEffect, useState } from 'react';
import client from '../api/api';
import { Link } from 'react-router-dom';

export default function GamesList(){
  const [games,setGames] = useState([]);
  useEffect(()=>{ client.get('/games').then(r=>setGames(r.data)); },[]);
  return (
    <div className="container mt-3">
      <h3>Games</h3>
      <ul className="list-group">
        {games.map(g=>(
          <li key={g._id} className="list-group-item">
            <Link to={"/game/"+g._id}><strong>{g.title}</strong></Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

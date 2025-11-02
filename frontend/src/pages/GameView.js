import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../api/api';

export default function GameView(){
  const { id } = useParams();
  const [game,setGame] = useState(null);
  const [copies,setCopies] = useState([]);
  useEffect(()=>{
    client.get('/games/'+id).then(r=>setGame(r.data));
    client.get('/copies/game/'+id).then(r=>setCopies(r.data));
  },[id]);
  if(!game) return <div>loading...</div>;
  return (
    <div className="container mt-3">
      <h3>{game.title}</h3>
      <p>{game.description}</p>
      <h5>Copies</h5>
      <ul className="list-group">
        {copies.map(c=>(
          <li key={c._id} className="list-group-item">{c.status} - {c.location}</li>
        ))}
      </ul>
    </div>
  );
}

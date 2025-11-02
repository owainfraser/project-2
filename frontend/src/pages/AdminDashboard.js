import { Link } from 'react-router-dom';
export default function AdminDashboard(){
  return (
    <div className="container mt-3">
      <h3>Admin Dashboard</h3>
      <ul>
        <li><Link to="/admin/games">Manage Games</Link></li>
        <li><Link to="/admin/copies">Manage Copies</Link></li>
        <li><Link to="/admin/users">Manage Users</Link></li>
      </ul>
    </div>
  );
}

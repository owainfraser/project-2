import { Navigate } from 'react-router-dom';
import { getUser } from '../utils/auth';

export default function ProtectedRoute({ children, adminOnly=false }){
  const user = getUser();
  if(!user) return <Navigate to="/login" replace />;
  if(adminOnly && user.role !== 'admin') return <Navigate to="/" replace />;
  return children;
}

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import GamesList from './pages/GamesList';
import GameView from './pages/GameView';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<ProtectedRoute><GamesList/></ProtectedRoute>} />
        <Route path="/game/:id" element={<ProtectedRoute><GameView/></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminDashboard/></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

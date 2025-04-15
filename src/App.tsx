import './App.css'
import { Route, Routes } from 'react-router';
import { Login } from './components/pages/Login';
import { Dashboard } from './components/pages/Dashboard';
import { AuthRoute } from './routes/AuthRoute';
import { ProtectedRoute } from './routes/ProtectedRoute';

function App() {


  return (
    <Routes>
      <Route path='/login' element={<AuthRoute><Login /></AuthRoute>} />
      <Route path='/' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    </Routes>
  )
}

export default App

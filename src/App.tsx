import './App.css'
import { Navigate, Route, Routes } from 'react-router';
import { Login } from './components/pages/Login';
import { Dashboard } from './components/pages/Dashboard';
import { AuthRoute } from './routes/AuthRoute';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { Cardcontainer } from './components/organisms/Cardcontainer';
import { CreateUser } from './components/molecules/CreateUser';


function App() {


  return (
    <Routes>
      <Route path='/login' element={<AuthRoute><Login /></AuthRoute>} />
      <Route path='/' element={<Navigate to="/dashboard" replace />} />
      <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
        <Route index element={<ProtectedRoute><Cardcontainer /></ProtectedRoute>} />
        <Route path='new' element={<ProtectedRoute><CreateUser /></ProtectedRoute>} />
      </Route>
    </Routes>
  )
}

export default App

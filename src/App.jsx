
import './App.css'
import Navbar from './Common/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import Todo from './Pages/Todo'
import { useSelector } from 'react-redux'


const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return user ? children : <Navigate to="/login" />;
};
function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Auth/>}/>
        <Route path='/login' element={<Auth/>} />
        <Route path='/todo' element={<ProtectedRoute><Todo/></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App

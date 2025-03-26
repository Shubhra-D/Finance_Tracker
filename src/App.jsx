import './App.css'
import Navbar from './Common/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import Todo from './Pages/Todo'
import { useSelector } from 'react-redux'
import { Text } from '@chakra-ui/react'


const ProtectedRoute = ({ children }) => {
  const { user ,loading} = useSelector((state) => state.auth);
  if (loading) return <Text>Loading...</Text>;
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

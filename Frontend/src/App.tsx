import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import { Signin } from './pages/signin'
import { Signup } from './pages/signup'
import DashboardPage from './pages/dashboard'
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/dashboard' element={<DashboardPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App

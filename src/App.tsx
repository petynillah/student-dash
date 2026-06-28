
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Availablebk from './pages/Availablebk'
import Allbooks from './pages/Allbooks'
import Borrowedbk from './pages/Borrowedbk'
import Navbar from './component/Navbar'

function App() {
  
  return (
    <>
      <BrowserRouter>
      <div className='container'>
        <Navbar/>
          <div className='dashboard'>
            <Routes>
              <Route path='availablebk' element={<Availablebk/>}/>
              <Route path='allbooks' element={<Allbooks/>}/>
              <Route path='borrowedbk' element={<Borrowedbk/>}/>
            </Routes>
              </div>
          </div>
      </BrowserRouter>
    </>
  )
}

export default App

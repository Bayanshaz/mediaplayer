import { Route, Routes } from 'react-router-dom'
import './App.css'
 import Landing from './Pages/Landing'
 import Home from './Pages/Home'
 import History from './Pages/History'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {

  return (
    <>
    {/* Header */}
     <Header/>
    {/* Path for Landing (base url : http://localhost:5173/ ),Home (base url : http://localhost:5173/Home ) ,History (base url : http://localhost:5173/History ) */}
    <Routes>
      <Route path='/' element={ <Landing/> } />
      <Route path='/home' element={ <Home/> } />
      <Route path='/history' element={ <History/> } />
    </Routes>
    {/* Footer */}
    <Footer/>
    </>
  )
}

export default App
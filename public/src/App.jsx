import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import RegisterU from './registeruser.jsx'
import RegisterA from './registeradmin.jsx'
import LoginU from './loginuser.jsx'
import LoginA from './loginadmin.jsx'
import HomeU from './userhome.jsx'
import HomeA from './adminhome.jsx'
import Addgame from './addgame.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RegisterU/>}></Route>
        <Route path='/loginadmin' element={<LoginA/>}></Route>
        <Route path='/registeradmin' element={<RegisterA/>}></Route>
        <Route path='/loginuser' element={<LoginU/>}></Route>
        <Route path='/homeuser/:name' element={<HomeU/>}></Route>
        <Route path='/homeadm/:name' element={<HomeA/>}></Route>
        <Route path='/addgame' element={<Addgame/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

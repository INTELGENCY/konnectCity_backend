import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MapBox from './components/MapBox/MapBox'
import AdminPanel from './components/AdminPanel/AdminPanel'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserPanel from './components/UserPanel/UserPanel'

function App() {
  const [count, setCount] = useState(0)

  return (
    // <>
    //   {/* <MapBox/> */}
    //   <AdminPanel/>
    // </>
    <Router>
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/user" element={<UserPanel />} />
    </Routes>
  </Router>
  )
}

export default App
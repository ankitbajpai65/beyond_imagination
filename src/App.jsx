import { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { Routes, Route } from 'react-router-dom';
import UserProvider from './Components/UserProvider';
function App() {
  const [openSidebar, setOpenSidebar] = useState(true);
  return (
    <>
      <UserProvider>
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <Sidebar openSidebar={openSidebar} />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </UserProvider>
    </>
  )
}

export default App

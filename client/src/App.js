import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashoard from './components/Dashboard';
import Navbar from './components/Navbar';
import Editor from './components/Editor';
import Verifies from './components/Verifies';
import Chatbot from './components/Chatbot';
import Create from './components/Create'
import Footer from './components/Footer';
import Contact from './components/Contact';
import NotFound from './components/NotFound';

import avatar from './components/assets/newchatbot.png'

function App() {
  const [showComp, setShowComp] = useState(false);

  const HandleOnClick = () => {
    console.log("working")
    if (showComp === false) {
      setShowComp(true)
    } else {
      setShowComp(false)
    }
  }
  return (
    <div>
      <Navbar />
      <div className='chatbot-model'>
        <button className='chatbot-popper-btn' onClick={HandleOnClick} style={{ borderRadius: "50%" }}>
          <img style={{ borderRadius: "50%" }} src={avatar} alt=">" width={60} />
        </button>
      </div>
      <div>
        {
          showComp === true ?
            <Chatbot />
            : null
        }
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Create />} />
          <Route path='/login' element={<Login />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/dashboard' element={<Dashoard />} />
          <Route path='/ide' element={<Editor />} />
          <Route path='/verify/:uniqueString' element={<Verifies />} />
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;

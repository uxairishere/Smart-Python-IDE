import React, { useEffect, useRef } from 'react'
import Services from './homeComponents/Services'
import eyelogo from './assets/eyelogo.png'
import cover from './assets/cover.png';
import cover2 from './assets/cover7.jpeg';
import globe from './assets/globe.gif';
import dialouge from './assets/dialouge.jpg'
import Intro from './homeComponents/Intro'
import Features from './homeComponents/Features';
import axios from 'axios';



const Home = () => {

  const usersRef = useRef();

  const registeredUsers = async () => {
    const response = await axios.post(process.env.REACT_APP_SERVER_ADDRESS + '/api/getusers')
    const totalUsers = await response.data;
    if(totalUsers.status === 'ok'){
      // console.log("USERS ARE HERE")
      usersRef.current.innerText = totalUsers.total_users + " devs have already signed up - don’t get left behind!";
    }else{
      alert("Cannot get current users")
    }
  }
  
  useEffect(() =>{
    registeredUsers()
  }, [])
  return (
    <div>
      <div className='intro-container text-center'>
        <div className='row' style={{ width: '90%', margin: '0 auto' }}>
          <div className='intro-wrapper col-md-6'>
            <img className='intrologo' width="180" src={eyelogo} />
            <h1 className='introh1'>Smart python ide</h1>
            <p className='introp'>Now code and experience python language by using our AI powered tools <br/> <span className='text-success' style={{opacity: '0.7'}} ref={usersRef}></span> </p>
          
            <a className='btn btn-dark introbutton' href='/ide'><i className='fa fa-code'></i> Start Coding</a>
            <a className='btn btn-light introbutton' style={{ color: 'white' }} href='#'>Read Repository <i className='fa fa-arrow-right'></i></a>
          </div>
          <div className='col-md-6'>
            <img src={cover2} alt=">" width="86%" />
          </div>
        </div>

        <div className='globe-container'>
          <img className='globe-img' src={globe} alt=">" />
        </div>

      </div>

      <Intro />
      <Features />
      <Services />

    </div>
  )
}

export default Home
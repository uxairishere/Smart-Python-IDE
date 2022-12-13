import axios from 'axios'
import React, { useEffect, useState, useRef, useReducer, Component } from 'react'
import chartlogo from './assets/chartlogo.png'
import faliurelogo from './assets/falilogo.png'
import progresslogo from './assets/progresslogo.png'
import chatbotlogo from './assets/chatbotlogo.png'
import NotFound from './NotFound'

import { SuccessAccuracy, ErrorAccuracy } from './functions/Accuracy';


const Dashoard = () => {
  // const [dberror, setDberror] = useEffect('')
  // const [dberror, setDberror] = useEffect('')
  const [user, setUser] = useState('')
  const [dashboard, setDashboard] = useState('')
  const [allUsers, setAllUsers] = useState([])
  const [reducerValue, foreUpdate] = useReducer(x => x + 1, 0);

  const [role, setRole] = useState('')

  const successRef = useRef()
  const errorRef = useRef()

  async function getDashboard() {
    if (user.userdata) {
      const token = localStorage.getItem('token')
      const response = await axios.post(process.env.REACT_APP_SERVER_ADDRESS + '/api/dashboard', { email: user.userdata.email, token: token })

      const data = await response.data;

      setDashboard(data.dashboard)

      console.log("DATA FOR DASHBOARD:" + dashboard)
      console.log(data.allusers)

      var success = dashboard.setSuccess;
      var error = dashboard.setError;
      var getSuccess = SuccessAccuracy(success, error)
      var getError = ErrorAccuracy(success, error)

      successRef.current.innerText = getSuccess + '%'
      errorRef.current.innerText = getError + '%'


      if (data.allusers) {
        setAllUsers(data.allusers)
        console.log('ALL USERS: ' + allUsers)
      }
    }
  }

  // change role 
  function HandleOnChange(e) {
    setRole(e.target.value)
  }

  const HandleClickRole = async (id, role) => {
    const response = await axios.post(process.env.REACT_APP_SERVER_ADDRESS + '/api/changerole', { id: id, role: role })
    const status = await response.data;
    console.log("ROLE CHANGE STATUS: " + status.status)
    foreUpdate()
  }

  // delete handler  
  const HandleDeleteUser = async (id) => {
    const response = await axios.post(process.env.REACT_APP_SERVER_ADDRESS + '/api/deleteuser', { id: id })
    const status = await response.data;
    console.log("DELETE STATUS: " + status.status)
    foreUpdate()
  }

  // getDashboard()
  // useeffects here 
  useEffect(() => {
    if (localStorage.getItem('aboutuser')){
      setUser(JSON.parse(localStorage.getItem('aboutuser')))
    getDashboard()
    // successRef.current.innerHTML = "something"
  }}, [reducerValue])

  function HandleForceUpdate() {
    foreUpdate()
  }

  window.onload = function () {
    foreUpdate()

  }

  console.log(user.userdata)
  return (
    <div className='dash-grid-container' style={{ paddingTop: '5rem' }}>
      {/* <h1 className='text-center'>DASHBOARD</h1> */}
      {user ?
        <div className='dash-grid-wrapper text-center'>
          <div className='dash-grid dash-grid-1'>
            <img className='dash-profile-img' width={100} src={'http://localhost:1337/public/images/' + user.userdata.profileImg} alt='user_profile'></img>
            <h4>{dashboard.name}</h4>
            <p>{dashboard.email}</p>
            <p>ID: {dashboard._id}</p>
            <button onClick={HandleForceUpdate} className='btn btn-success'>Refresh</button>
          </div>

          <div className='dash-grid dash-grid-2'>
            <div style={{ backgroundImage: `url('${faliurelogo}')`, backgroundPosition: 'bottom right', backgroundSize: '30%', backgroundRepeat: 'no-repeat' }}>
              <h4 style={{ fontWeight: '200' }}>Error commits</h4>
              <h1 className='graph-h1 text-danger '>{dashboard.setError}</h1>
            </div>
          </div>

          <div className='dash-grid dash-grid-3'>
            <div style={{ backgroundImage: `url('${chartlogo}')`, backgroundPosition: 'bottom right', backgroundSize: '30%', backgroundRepeat: 'no-repeat' }}>
              <h4 style={{ fontWeight: '200' }}>Success commits</h4>
              <h1 className='graph-h1 text-success '>{dashboard.setSuccess}</h1>
            </div>
          </div>

          <div className='dash-grid dash-grid-4'>
            <div style={{ backgroundImage: `url('${progresslogo}')`, backgroundPosition: 'bottom right', backgroundSize: '30%', backgroundRepeat: 'no-repeat' }}>
              <h4 style={{ fontWeight: '200' }}>Success Accuracy</h4>
              <h1 className='graph-h1 text-success' ref={successRef}></h1>
            </div>
          </div>

          <div className='dash-grid dash-grid-5'>
            <div style={{ backgroundImage: `url('${progresslogo}')`, backgroundPosition: 'bottom right', backgroundSize: '30%', backgroundRepeat: 'no-repeat' }}>
              <h4 style={{ fontWeight: '200' }}>Error Accuracy</h4>
              <h1 className='graph-h1 text-danger' ref={errorRef}></h1>
            </div>
          </div>

          <div className='dash-grid dash-grid-6'>
            <h1>Current Status</h1>
          </div>
          {/* <h1>{JSON.stringify(allUsers)}</h1> */}

        </div>

        :
        <NotFound />
      }


      {/* <p>Control user profiles roles and </p> */}
      <div className='dash-users-container row'>
        {
          allUsers ?
            allUsers.map((val, index) => (
              <div key={index} className='col-md-3'>
                <div className='dash-users-wrapper text-center'>
                  <img className='dash-users-img' src={process.env.REACT_APP_SERVER_ADDRESS + '/public/images/' + val.profileImg} alt=">" />
                  <h1>{val.name}</h1>
                  <p>{val.email}</p>
                  <p>{val.accrole}</p>
                  <h5>Total commits</h5>
                  <h1 className='text-success'>{parseInt(val.setError) + parseInt(val.setSuccess)}</h1>

                  {/* input change role */}
                  <div style={{ width: '90%', margin: '0 auto' }} class="input-group mb-3">
                    <input onChange={HandleOnChange} type="text" className="form-control" placeholder="Enter new role" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                      <button onClick={() => { HandleClickRole(val._id, role) }} className="btn btn-outline-info">Change role</button>
                    </div>
                  </div>

                  {/* delete user  */}
                  <button style={{ width: '90%' }} onClick={() => { HandleDeleteUser(val._id) }} className='btn btn-outline-danger'>Delete profile</button>

                </div>
              </div>
            ))
            : null
        }
      </div>
    </div>
  )
}

export default Dashoard
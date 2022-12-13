import React from 'react'
import chatbotlogo from './assets/chatbotlogo.png'

const NotFound = () => {
  return (
    <div className='text-center ' style={{ padding: '5rem 0' }}>
          {/* <img className='not-user-img' src={chatbotlogo} alt=">"/> */}
          <img src={chatbotlogo} width={270} alt=">" />
          <h1 style={{ fontWeight: '700' }} className='text-info mb-4'>Oh it looks like you are lost!</h1>
          <p className='introp'>Login or create a new account to get full access and starting coding</p>
          <a className='btn btn-light introbutton' href='/login'>Login <i className='fa fa-arrow-right'></i></a>
          <a className='btn btn-info introbutton' style={{ color: 'white' }} href='signup'>Create Account <i className='fa fa-arrow-right'></i></a>
        </div>
  )
}

export default NotFound
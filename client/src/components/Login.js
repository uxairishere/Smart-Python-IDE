import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import newchatbot from './assets/newchatbot.png'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Login = () => {

  AOS.init();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser(event) {
    event.preventDefault();
    const response = await fetch('http://localhost:1337/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    const data = await response.json()

    if (data.user) {
      localStorage.setItem('token', data.user);
      localStorage.setItem('aboutuser', data.aboutuser)
      alert("You are successfuly logged in!")
      navigate('/dashboard')
      window.location.reload(false);
    } else {
      alert("Please check username and password!")
    }
    console.log(data);
  }
  return (
    <div className='login-container'>
      <div className='login-wrapper row'>
        <div className='login-form-wrapper col-md-6'>
          <form onSubmit={loginUser}>
        <h1>Login in to IDE</h1>
        <p className='loginp'>Add you credentials to get logged in</p>

            <input placeholder='ex: johndoe@email.com'
              class="form-control"
              value={email}
              type='email'
              onChange={(e) => { setEmail(e.target.value) }}
            />
            <input
              class="form-control"
              value={password}
              type='password'
              onChange={(e) => { setPassword(e.target.value) }}
              placeholder="Password"
            />
            <input
              type='submit'
              value="Login"
              className='btn btn-dark introbutton login-button'
            />
          </form>
          <a style={{textDecoration: 'none', fontWeight: '700'}} href='/signup'>Create account <i className='fa fa-arrow-right'></i></a>
          <br/>
          <a style={{textDecoration: 'none', fontWeight: '700'}} href='/signup'>Forget password? <i className='fa fa-arrow-right'></i></a>
        </div>

        <div data-aos="fade-left"
     data-aos-duration="3000" className='col-md-6 login-points'>
        {/* <img src={newchatbot} alt=">" width="200"/> */}
        <p className='loginp'><i className='fa fa-check login-icons'></i> Login to unlock true power of ide</p>
        <p className='loginp'><i className='fa fa-check login-icons'></i> Easy error recignition for your code</p>
        <p className='loginp'><i className='fa fa-check login-icons'></i> Powerful AI assistance for you</p>
        <p className='loginp'><i className='fa fa-check login-icons'></i> Now code with help of our advance Ai models</p>
        <p className='loginp'><i className='fa fa-check login-icons'></i> Feel secure with our moderm web authentication</p>
        </div>

      </div>
    </div>
  )
}

export default Login
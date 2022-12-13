import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser(event){
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

    if(data.user){
      localStorage.setItem('token', data.user);
      localStorage.setItem('aboutuser', data.aboutuser)
      alert("You are successfuly logged in!")
      navigate('/dashboard')
      window.location.reload(false);
    }else{
      alert("Please check username and password!")
    }
    console.log(data);
  }
  
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <input
          value={email}
          type='email'
          onChange={(e) => { setEmail(e.target.value) }}
          placeholder="Emal"
        />
        <input
          value={password}
          type='password'
          onChange={(e) => { setPassword(e.target.value) }}
          placeholder="Password"
        />
        <input
          type='submit'
          value="Sign up!"
        />
      </form>
      <code>TODO: convert the theme according to a developer</code>
    </div>
  )
}

export default Login;

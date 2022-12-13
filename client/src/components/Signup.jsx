import React, {useState} from 'react'
import {  useNavigate} from 'react-router-dom'
import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profile, setProfile] = useState(null)

    const formData = new FormData();

    async function registerUser(event){
        event.preventDefault()

        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("image", profile);

        const response = await axios.post('http://localhost:1337/api/register', formData)

        const data = await response.data;
        if (data.status === 'ok') {
            alert('Account Created Successfully');
            navigate('/login')
        } else {
            alert('Error: ' + data.error);
        }
    }
  return (
    <div>
        <h1>Create New Account</h1>
        <form onSubmit={registerUser}>
        <input className='form-control mb-1' type='file' placeholder='Image' onChange={(e) => { setProfile(e.target.files[0]) }} />
            <input 
                value={name}
                type='text'
                onChange={(e) => {setName(e.target.value)}}
                placeholder="Name"
            />
            <input 
                value={email}
                type='email'
                onChange={(e) => {setEmail(e.target.value)}}
                placeholder="Email"
            />
            <input 
                value={password}
                type='password'
                onChange={(e) => {setPassword(e.target.value)}}
                placeholder="Password"
            />
            <input 
                type='submit'
                value="Sign up!"
            />
        </form>
    </div>
  )
}

export default Signup

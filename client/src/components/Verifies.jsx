import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import pythonlogo from './assets/pythonlogo.png'


const Verifies = () => {
    const { uniqueString } = useParams()
    const [user, setUser] = useState('');
    const navigate = useNavigate();


    async function verifyEmail(event) {
        event.preventDefault();
        const response = await axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/verify/${uniqueString}`)
        const data = await response.data
        if (data) {
            localStorage.setItem('aboutuser', data.aboutuser)
            navigate('/')
        }
        console.log(data)
    }
    return (
        <div className='text-center mt-5'>
            <img className='intrologo' width="150" src={pythonlogo} />
            <h3>Please press the "Verify" button to get verified!</h3>
            <p>Do not share this link with anyone</p>
            <button style={{paddingLeft: '2rem', paddingRight: '2rem'}} className='btn btn-success introbutton' onClick={verifyEmail}>Verify</button>
        </div>
    )
}

export default Verifies
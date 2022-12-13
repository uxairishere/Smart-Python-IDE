import React, { useState, useEffect } from 'react'
import avatar from './assets/newchatbot.png'
import avatar2 from './assets/avatar5.png'
import logo from './assets/eyelogo.png'
// import App from '../App'
import axios from 'axios';

import AOS from 'aos';
import 'aos/dist/aos.css';

const Chatbot = () => {
    AOS.init();

    const [isUser, setUser] = useState('')
    const [userTrue, setUserTrue] = useState('')
    useEffect(() => {
        setUser(localStorage.getItem('token'))
        setUserTrue(JSON.parse(localStorage.getItem('aboutuser')))
    }, [])

    const [input, setInput] = useState('')
    const [convo, setConvo] = useState([])


    const HandleOnChange = (event) => {
        setInput(event.target.value)
    }

    const HandleClearConvo = () => {
        setConvo([])
    }

    const HandleHide = () => {
    }

    async function HandleRequest(event) {
        event.preventDefault()
        let temp = convo;
        temp.push(
            {
            user: 'user',
            text: input
        }
        )

        setConvo([...temp])
        setInput('')
        console.log("User: " + input)

        await axios.post(process.env.REACT_APP_CHATBOT_ADDRESS + '/api/chatbot', { message: input.toLowerCase() })
            .then(res => {
                let temp = convo;
                temp.push({
                    user: 'bot',
                    text: res.data.message
                })

                setConvo([...temp])
                console.log("Bot: " + res.data.message)
            })
        console.log(convo)
    }

    return (
        <>
            <div data-aos="fade-up" className='chatbot-container' >

                <div className='chatbot-nav' >
                    <img className='bot-avatar' style={{ display: 'inline-block' }} width={50} src={avatar} alt=">" />
                    <h3 style={{ display: 'inline-block', margin: '10px 0 0 0' }} >Bighero</h3>
                    <a onClick={()=> HandleHide}><i style={{float: 'right', margin: '1.5rem 1.7rem 0 0', fontSize:'1rem', color:'greenyellow'}} className='fa fa-circle blink_me'></i></a>
                    {/* <h1 style={{float: 'right', margin: '1rem 1.7rem 0 0', fontSize:'3rem'}}
                    class="blink_me">
                    .</h1> */}
                </div>

                <div id='scroll' className='chatbot-conv'>
                    <div className='bot-content-wrapper'>
                        <img className='bot-avatar' width={30} src={avatar} alt=">" />
                        <div className='bot-response-alert'>Hi there, I'm Bighero<br/>Let me know how can I help you</div>
                    </div>
                    <img className='chatbot-eye-logo' src={logo} alt="loading..." />
                    {
                        convo.map((entry) => {
                            if (entry.user === "user") {
                                return (
                                    <div style={{ textAlign: 'right' }} className='bot-content-wrapper'>
                                        <div className='bot-content-alert bg-light'>{entry.text}</div>
                                        <img className='bot-avatar' width={30} src={
                                            isUser ? "http://localhost:1337/public/images/" + userTrue.userdata.profileImg
                                                : avatar2
                                        } alt=">" />
                                    </div>
                                )
                            } else {
                                return (
                                    <div className='bot-content-wrapper'>
                                        <img className='bot-avatar' width={30} src={avatar} alt=">" />
                                        <div className='bot-response-alert'>{entry.text}</div>
                                    </div>
                                )
                            }
                        })
                    }
                </div>

                <div className='chatbot-input'>
                    <input style={{ width: '75%', display: 'inline-block' }} onChange={HandleOnChange} type='text' className='form-control bot-input' />
                    <button className='btn btn-dark bot-submit' style={{ display: 'inline-block' }} onClick={HandleRequest}>Send</button>
                </div>

            </div>
        </>
    )
}

export default Chatbot
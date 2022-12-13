import React from 'react'
import chatbot from '../assets/newchatbot.png'
import chatbotchat from '../assets/chatbotchat2.jpg'

const Features = () => {
    return (
        <div className='feature-container text-center'>
            <h2 className='heading-h2'>Start coding using our Services</h2>
            <p className='heading-p'>Here are our powerful services Smart Code provides for your ease in coding and building something intersting.</p>
            <div className='fe-chatbot-container'>
                {/* 
                <div className='col-md-4'>
                    <img className='fe-chatbotchat' src={chatbotchat} alt="?" />
                </div> */}
                <div className='fe-chatbot-wrapper row'>
                    <div className='col-md-6 fe-chat-middle'>
                        <img className='fe-chatbot-img logo-light-spread' src={chatbot} alt=">" />
                        <h1 className='fe-h1'>BigHero Chatbot Assistance</h1>
                        <button className='btn btn-light introbutton'>Repository</button>
                    </div>

                    <div style={{ textAlign: 'left' }} className='col-md-6 fe-chatbot-desc'>
                        <p className='fe-p'><i className='fa fa-check login-icons'></i> Personal assistance for programmers</p>
                        <p className='fe-p'><i className='fa fa-check login-icons'></i> Know more about python coding and functions</p>
                        <p className='fe-p'><i className='fa fa-check login-icons'></i> Quick assistance for your current project</p>
                        <p className='fe-p'><i className='fa fa-check login-icons'></i> Trained with our best datasets</p>
                        <p className='fe-p'><i className='fa fa-check login-icons'></i> Have knowledge of every data structure</p>
                        <p className='fe-p'><i className='fa fa-check login-icons'></i> Will provide quick help for you</p>
                        <p className='fe-p'><i className='fa fa-check login-icons'></i> User frindly interface for you</p>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Features
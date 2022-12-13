import React from 'react'
import avatar from '../assets/pythonlogo.png'
import codelogo from '../assets/codelogo.png'
import chatbotlogo from '../assets/chatbotlogo.png'
import solutionlogo from '../assets/solutionlogo.png'
import chartlogo from '../assets/chartlogo.png'


import AOS from 'aos';
import 'aos/dist/aos.css';


const Intro = props => {
    AOS.init();
    return (
        <div className='intro-grid-container text-center'>
            <h2 className='heading-h2'>Start coding using our Services</h2>
            <p className='heading-p'>Here are our powerful services Smart Code provides for your ease in coding and building something intersting.</p>

            <div className='grid-wrapper'>
                <div data-aos="fade-right" className='grid-div grid-1'>
                    <img className='grid-logo' width={220} src={chatbotlogo} alt="logo" />
                    {/* <div className='gradiant-background-div'></div> */}
                    <h1>Python Editor</h1>
                    <p className='grid-p'>by Smart Code</p>
                    <p className='grid-p'>Now start and learn python coding easily</p>
                    <a className='btn btn-dark introbutton' href='/ide'><i className='fa fa-code'></i> Start Coding</a>
                </div>

                <div data-aos="fade-down" className='grid-div grid-2'>
                    <img className='' width={150} src={codelogo} alt="logo" />
                    <h4>Powerful coding experince</h4>
                    <p className='grid-p'>Now write our powerful react IDE</p>
                </div>

                <div data-aos="fade-up" className='grid-div grid-3'>
                    <img className='mb-3' width={110} src={solutionlogo} alt="logo" />
                    <h4>Best solution on web</h4>
                    <p className='grid-p'>Our powerful ai will find best solution for you available on internet</p>
                </div>

                <div data-aos="fade-down" className='grid-div grid-4'>
                    <img className='mb-3' width={220} src={chatbotlogo} alt="logo" />
                    <h4>Talk with our Ai Chatbot</h4>
                    <p className='grid-p'>Our chatbot tech will fix everythin for you</p>
                </div>

                <div className='grid-div grid-5'>
                    <img className='mb-3' width={120} src={chartlogo} alt="logo" />
                    <h4>Talk with our Ai Chatbot</h4>
                    <p className='grid-p'>Our chatbot tech will fix everythin for you</p>
                </div>
            </div>
        </div>
    )
}

export default Intro
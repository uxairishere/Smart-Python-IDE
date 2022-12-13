import React from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Services = () => {
    AOS.init();
    return (
        <div id='services' className='service-main'>
            <div className='service-container container'>
                <h1 className='text-center mb-5' >Smart Python IDE Services</h1>
                <div className='row'>
                    {/* card 1  */}
                    <div data-aos="fade-up"  className='col-md-4'>
                        <card className='service-card card'>
                        <div className='card-inner'>
                            <i class="fa fa-eye service-icon text-warning"></i>
                            <h3 className='serviceh3'>Idetify Errors Quickly</h3>
                            <p className='about-desc about-p service-p'>In python it's a big headache to find the errors and how to fix it. So the Smart IDE is here to help</p>
                            <h3 className='serviceh3'>Things IDE Use</h3>
                            <p className='about-desc about-p service-p'>Will update in future</p>
                            <h3 className='serviceh3'>Tools I use</h3>
                            <p className='about-desc about-p service-p'>Python, NLP Model, Node, Express</p>
                            </div>
                        
                        </card>
                    </div>
                    {/* card 1  */}
                    <div data-aos="fade-up" className='col-md-4'>
                        <card className='service-card card'>
                        <div className='card-inner'>
                            <i class="fa fa-code service-icon text-warning"></i>
                            <h3 className='serviceh3'>Quick Solution Suggestions</h3>
                            <p className='about-desc about-p service-p'>After locating an error IDE will help you to resolve the error by providing a solution link.</p>
                            <h3 className='serviceh3'>Build Approach</h3>
                            <p className='about-desc about-p service-p'>Our advance dataset</p>
                            <h3 className='serviceh3'>Tools I use</h3>
                            <p className='about-desc about-p service-p'>Yeah Python and web tools</p>
                            </div>
                        
                        </card>
                    </div>{/* card 1  */}
                    <div data-aos="fade-up" className='col-md-4'>
                        <card className='service-card card'>
                        <div className='card-inner'>
                            <i class="fa fa-mobile service-icon text-warning"></i>
                            <h3 className='serviceh3'>Your Progress Report</h3>
                            <p className='about-desc about-p service-p'>After successfuly creating an account the IDE will provide you your progress report on your dashboard.</p>
                            <h3 className='serviceh3'>Thing it uses</h3>
                            <p className='about-desc about-p service-p'>Will update in future</p>
                            <h3 className='serviceh3'>Tools I use</h3>
                            <p className='about-desc about-p service-p'>Yeah again will update soon</p>
                            </div>
                        
                        </card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services
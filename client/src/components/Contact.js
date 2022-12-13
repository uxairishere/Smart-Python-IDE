import React, { useState } from 'react'
import profile_img from './assets/globe.gif'
import axios from 'axios'
import AOS from 'aos';
import 'aos/dist/aos.css';


const Contact = () => {
  AOS.init();

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  async function HandleOnSubmit() {
    document.querySelector("#contact-submit").innerHTML = "Please wait"
    const res = await axios.post(process.env.REACT_APP_SERVER_ADDRESS + '/api/email/contact', { fullname, email, subject, body })
    const data = await res.data;
    if (data.status === 'ok') {
      document.querySelector("#contact-submit").innerHTML = "Send Message"
      document.getElementById("mailAlert").classList.remove("d-none")
      setTimeout(() => {
        document.getElementById("mailAlert").classList.add("d-none")
      }, 3000);
    } else {
      console.log("ERROR OCCURED ON CONTACT ROUTE");
    }
  }
  return (
    <div id="sign-up" className='contact__container'>
      <div id='mailAlert' className='alert alert-success contact-alert d-none text-center fixed-top'>
        <i className='fa fa-check' style={{ fontSize: '3rem', color: 'greenyellow' }}></i><br />
        Your message has been send successfully to the developers.<br /> We will contact you as soon as possible
      </div>
      <div className='contact__heading'>
        <div className='contact__heading-text'>
          <h1>
            Talk to our Developers team
          </h1>
          <h3>We'll help you find the right path and solution for your problem.</h3>
        </div>
      </div>
      <div className='contact__form'>
        <div className='contact__form-inputs text-center'>
          <input placeholder='Full Name'
            class="form-control contact__inputs1"
            type='text'
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
          />

          <input
            class="form-control contact__inputs1"
            type='email'
            placeholder='@email.com'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            class="form-control contact__inputs1"
            type='text'
            placeholder='Subject'
            onChange={(e) => setSubject(e.target.value)}
            value={subject}

          />
          <textarea
            placeholder='How can we help?'
            class="form-control contact__textare mt-3"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>

          <input
            type='submit'
            className='btn btn-dark introbutton login-button'
            style={{ width: '70%', margin: ' auto' }}
            onClick={() => { HandleOnSubmit() }}
            id="contact-submit"
          />
        </div>
        <div className='Privacy__term'>
          <hr></hr>
          <small>By submitting this form, I confirm that I have read
            and understood the<a href='#'> Privacy</a> Statement.</small>
        </div>
      </div>
      <div className='contact__about'>

        <div className='contact__about-text'>
          <div className='k'>
            <p>"With Our Website you will Be able to identify Error easily
              which may lead you to right path and save your time"</p>
            <div className='g'>
              <img width={70} src={profile_img} alt='i' style={{ borderRadius: '50%' }} />
            </div>
            <h5>- Smart Code Team</h5>
          </div>
          <hr></hr>
          <div className='o'>
            <h3>Looking for customer support?</h3>
            <h6>
              We’re here to help! Get in touch if you have technical, account, or billing questions.
            </h6>
            <h6>Visit <a href='#'>IDE</a></h6>
          </div>
        </div>

      </div>
      <div className='col-md-9 contact__img'>
        <a href='https://github.com/'><i className='fa fa-github contact_icons'></i></a>
        <a href='https://www.linkedin.com/in/'><i className='fa fa-linkedin contact_icons'></i></a>
        <a><i className='fa fa-facebook contact_icons'></i></a>
        <a href='https://www.instagram.com/'><i className='fa fa-instagram contact_icons'></i></a>
      </div>

    </div>
  )
}

export default Contact
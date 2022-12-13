import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

import './Create.css'
import eyelogo from './assets/eyelogo.png'
import { BsFillCheckCircleFill } from "react-icons/bs"
import { GoLinkExternal } from "react-icons/go"

const Create = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profile, setProfile] = useState(null)

    const formData = new FormData();

    async function registerUser(event) {
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
        <div className='signup-m-container'>
            <div className='content__text'>
                <div className='content__text-container'>
                    <div className='content__tag'>
                        <img src={eyelogo} width="60" /> Smart Code
                    </div>
                    <div className='content__text-text'>
                        <div className='content__text-icon'>

                            <h5><BsFillCheckCircleFill className='create__icons' /> Instant edge deploys</h5>
                            <div className="content__para">
                                <small>Push to git and your website is live.Zero configuration required.</small>
                            </div>
                        </div>
                        <div className='content__text-icon'>

                            <h5><BsFillCheckCircleFill className='create__icons' /> Collaborate with previews</h5>
                            <div className="content__para">
                                <small>Every pull request gets its own preview URL. Share them to gather feedback or run tests.</small>
                            </div>
                        </div>
                        <div className='content__text-icon'>

                            <h5><BsFillCheckCircleFill className='create__icons' /> Turn static to dynamic</h5>
                            <div className="content__para">
                                <small>Generate blazing fast pages and augment them with rich JavaScript that brings your apps alive.</small>
                            </div>
                        </div>
                        <div className='content__text-icon'>

                            <h5><BsFillCheckCircleFill className='create__icons' /> Ship directly to the edge</h5>
                            <div className="content__para">
                                <small>Always fast. Always online. Always a hit.</small>
                            </div>
                        </div>

                    </div>
                    <div className='content__img-text'>
                        <a>PROUDLY SERVING DEVELOPERS</a>
                        <div className='content__img'>
                            <p className='content__img-a'>

                            </p>
                        </div>
                    </div>


                </div>
            </div>
            <div className='login__option'>
                <div className='login__text'>
                    <h1>Join the next gen python platform</h1>
                    <div >
                        <form className='login__input' onSubmit={registerUser}>
                            {/* set_profile_image */}
                            <input className='form-control custom-file-input' type='file' placeholder='Image' onChange={(e) => { setProfile(e.target.files[0]) }} />
                            {/* full_name  */}
                            <input
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
                                type="text"
                                placeholder='Full Name'
                                class="form-control"
                            />

                            {/* email  */}
                            <input
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                type="email"
                                placeholder='@email.com'
                                class="form-control"
                            />
                            {/* password  */}
                            <input
                                value={password}
                                type='password'
                                onChange={(e) => { setPassword(e.target.value) }}
                                placeholder='Password'
                                class="form-control"
                            />
                            {/* submit  */}
                            <button
                                type='submit'
                                className='btn btn-dark introbutton login-button sign__button'
                            >Create account</button>
                        </form>
                    </div>

                    <div className='login__text-link'>
                        <a>By clicking continue, you agree to our <br></br>
                            <a href='#' className='login__a-line'>Term of Services  <GoLinkExternal /></a>and<a href='#' className='login__a-line'> Privacy <GoLinkExternal /></a>
                        </a>

                    </div>
                    <div className='login__text-link'>
                        <hr></hr>
                        <a>Already have an account?<a href='#' className='login__a-line'> Log in</a></a>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Create
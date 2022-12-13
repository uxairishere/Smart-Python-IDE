import React, { useEffect, useState } from 'react'
import logocode from './assets/logonew.jpeg'
import eyelogo from './assets/eyelogo.png'



const Navbar = () => {
    // onscroll property 
    function HandleScroll() {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
          // document.getElementById("navigation").classList.add('fixed-top')
          document.getElementById("navigation").style.backgroundColor = 'rgba(25,25,25, 0.8)'
        } else {
          // document.getElementById("navigation").classList.remove('fixed-top')
          document.getElementById("navigation").style.backgroundColor = '#191919';
        }
      }
    
      window.onscroll = function() {HandleScroll()};

    const [isUser, setUser] = useState('')
    const [userTrue, setUserTrue] = useState('')
    useEffect(() => {
        setUser(localStorage.getItem('token'))
        setUserTrue(JSON.parse(localStorage.getItem('aboutuser')))
    }, [])
    return (
        <>
            <nav id="navigation" style={{ zIndex: '3', backgroundColor: '#191919', transition: 'all 1s' }} className="navbar navbar-expand-lg navbar-dark text-white fixed-top">
                <div className="container-fluid container">
                    <a className="navbar-brand" href="/"><img className='' width="90" src={eyelogo} /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {
                isUser && userTrue.userdata.isValid === false ?
                    <div class="alert alert-info text-center verify-alert-div fixed-top" role="alert">
                        Please verify yourself with the link we send you to your email account!
                    </div>
                    : null
            }
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-md-auto gap-2 text-center">
                            <li className="nav-item rounded">
                                <a className="nav-link" aria-current="page" href="/">
                                    <i className='fa fa-home text-warning' style={{ fontSize: '1.3rem' }}></i></a>
                            </li>
                            <li className="nav-item rounded">
                                <a className="nav-link" href="#services"><i className="bi bi-telephone-fill me-2"></i>Services</a>
                            </li>
                            <li className="nav-item rounded">
                                <a className="nav-link" href="/dashboard"><i className="bi bi-telephone-fill me-2"></i>Dashboard</a>
                            </li>
                            <li className="nav-item rounded">
                                <a className="nav-link" href="/ide"><i className="bi bi-telephone-fill me-2"></i>IDE</a>
                            </li>
                            <li className="nav-item rounded">
                                <a className="nav-link" href="/contact"><i className="bi bi-telephone-fill me-2"></i>Contact</a>
                            </li>
                            {
                                isUser ?
                                    <div class="dropdown">
                                        <button class="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img width="25" style={{ borderRadius: '50%' }} src={"http://localhost:1337/public/images/" + userTrue.userdata.profileImg} alt="Profile Image" />
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-dark ">
                                            <li><a class="dropdown-item">Signed in as <br /><em className='text-success'>{userTrue.userdata.name}</em></a></li>
                                            <li><a class="dropdown-item" href="/dashboard">Your Profile</a></li>
                                            <li><a class="dropdown-item" href="/dashboard">Your dashboard</a></li>
                                            <li><button className='dropdown-item text-danger' onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('aboutuser'); window.location.reload(false) }}>Logout</button></li>
                                        </ul>
                                    </div>
                                    :
                                    <>
                                        <li className="nav-item rounded">
                                            <a className="nav-link" href="/login"><i className="bi bi-telephone-fill me-2"></i>Sign in</a>
                                        </li>
                                        <li className="nav-item rounded">
                                            <a className="nav-link" href="/signup"><i className="bi bi-telephone-fill me-2"></i>Create Account!</a>
                                        </li>
                                    </>

                            }
                            <ul className='navbar-nav'>

                            </ul>
                        </ul>
                    </div>
                </div>
            </nav>
            
        </>

    )
}

export default Navbar
import React, { useRef, useState, useEffect } from 'react'
import Editor from "@monaco-editor/react";
import axios from "axios";
import qs from 'qs';
import "./assets/Editorstyle.css";
import pythonlogo from './assets/pythonlogo.png'
import chartlogo from './assets/chartlogo.png'
import faliurelogo from './assets/falilogo.png'
import progresslogo from './assets/progresslogo.png'

import Speech from 'react-speech';

import { SuccessAccuracy, ErrorAccuracy } from './functions/Accuracy';



export default function Editorcomp() {
  // window.location.reload(false)
  useEffect(() => {
    setcodetext("print('hello world')")
    paragraphref.current.innerText = "Uxair Abbas"
    setUser(JSON.parse(localStorage.getItem('aboutuser')))
  }, [])

  const [codetext, setcodetext] = useState("")
  const [stdin, setstdin] = useState("")

  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')

  const [output, setOutput] = useState('')
  const [error_links, setError_links] = useState([])

  const editorRef = useRef(null);
  const paragraphref = useRef(null);
  const error_line_Ref = useRef('');

  const errorRef = useRef(null);
  const successRef = useRef(null);

  const successAccuRef = useRef(null)
  const errorAccuRef = useRef(null)


  function handleEditorChange(value, event) {
    setcodetext(value)
    editorRef.current = value;
  }

  function stdinchange(value, event) {
    setstdin(value)
  }

  function showValue() {
    // checkinguser
    if (user) {
      setEmail(user.userdata.email)
    } else {
      setEmail("notuser");
    }

    // sending code 
    axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/sendwithexe`, {
      params: {
        category: codetext,
        isUser: email
      }
    }).then((response) => {
      // on error detection 
      if (response.data.success == false) {

        setOutput(response.data.output)
        paragraphref.current.innerText = response.data.output;

        error_line_Ref.current.innerText = 'Error is on line no. ' + response.data.error_line;
        // console.log("RESPONSE FROM MODEL: " + response.data.error_line)
        setError_links(response.data.error_links)
        console.log("ERROR LINKS: " + error_links)


        if(user){
          errorRef.current.innerText = "Total Errors: " + response.data.setError;
        successRef.current.innerText = "Total Success: " + response.data.setSuccess;

        var success = response.data.setSuccess;
        var error = response.data.setError;

        successAccuRef.current.innerText = SuccessAccuracy(success, error) + '%';
        errorAccuRef.current.innerText = ErrorAccuracy(success, error) + '%';
        }
        

      }
      else {
        // on success detection 
        setOutput('')
        paragraphref.current.innerText = response.data.output;
        errorRef.current.innerText = response.data.setError;
        successRef.current.innerText = response.data.setSuccess;
        error_line_Ref.current.innerText = '';

        setError_links(null)

        if(user){
          var success = response.data.setSuccess;
          var error = response.data.setError;
          successAccuRef.current.innerText = SuccessAccuracy(success, error) + '%';
        errorAccuRef.current.innerText = ErrorAccuracy(success, error) + '%';
        }

      }
    }).catch(function (error) { console.log(error) });
  }

  // speech 
  const textstyle = {
    
  }
  return (
    <>
      <div style={{ marginTop: "5rem" }} className='row ide-main'>
        <div className='controllers-wrapper col-md-12'>
          <img style={{ padding: '0' }} className='intrologo controller-logo' width="40" src={pythonlogo} />
          <p className='controllers-p'>main.py</p>
          <button onClick={showValue} class="btn btn-success ide-submit">RUN <i className='fa fa-play'></i></button>
        </div>

        <div className="editor-wrapper col-md-6">
          <Editor
            height="70vh"
            width="100%"
            defaultLanguage="python"
            defaultValue='print("Hello world")'
            theme="light"
            quickSuggestions="true"
            onChange={handleEditorChange}
          />
        </div>

        {/* output console container */}
        <div className='out-console-wrapper col-md-6'>
          <div style={{ height: '35vh' }} className="output bg-dark text-white">
            <div className='output-wrapper'>
              {/* error desc  */}
              <p style={{ color: "greenyellow" }} ref={paragraphref} ></p>
              {/* error line */}
              <p style={{ color: "white" }} ref={error_line_Ref} ></p>
              {/* error links */}
              {error_links ?
                error_links.map((val, idx) => (
                  
                  <a href={val} target="_blank" className='btn btn-warning' style={{marginRight: '1rem'}}>Solution here</a>
                  
                ))
                :
                null
              }
              <br/>
              {output != '' ?
              <button className='btn btn-outline-info mt-3'>Speak <i className='fa fa-music'></i> <Speech text={output} voice="Google UK English Female" style={{width: '10rem'}} /></button>
              : null}
            </div>
          </div>

          <div className="console">
            <Editor s
              height="35vh"
              width="100%"
              theme="vs-dark"
              onChange={stdinchange}
            />
          </div>
        </div>
      </div>

      {user ?
        <div style={{ color: 'black' }} className='graph-cards-container row'>
          <div style={{ backgroundImage: `url('${chartlogo}')` }} className='graph-cards col-md-3'>
            {/* <img src={chartlogo} alt=">" className="graph-imgs" width="270"/> */}
            <h4 style={{ fontWeight: '200' }}>Success Acc:</h4>
            <h1 className='graph-h1 text-success' ref={successAccuRef}></h1>
          </div>

          <div style={{ backgroundImage: `url('${faliurelogo}')`, backgroundPosition: 'center', backgroundSize: '80%', backgroundRepeat: 'no-repeat' }} className='graph-cards col-md-3'>
            <h4 style={{ fontWeight: '200' }}>Error Acc:</h4>
            <h1 className='graph-h1 text-danger ' ref={errorAccuRef}></h1>
          </div>

          <div style={{ backgroundImage: `url('${progresslogo}')`, backgroundSize: '11rem', backgroundPosition: 'bottom center', backgroundRepeat: 'no-repeat' }} className='graph-cards col-md-3'>
            <h4 className='text-info'>Total Errors: </h4>
            <h1 className='text-danger text-bold' ref={errorRef}></h1>
            <h4 className='text-info'>Total Success: </h4>
            <h1 className='text-success' ref={successRef}></h1>
          </div>
        </div>
        : null}


    </>
  )
}



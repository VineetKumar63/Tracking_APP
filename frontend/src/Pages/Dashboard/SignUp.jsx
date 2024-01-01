import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
import { auth } from '../../firebase.js';
import 'firebase/auth';

function SignUP() {

  const navigate = useNavigate();
  auth.languageCode = 'en'
  const [input, setInput] = useState({
    user_name: "",
    mobile: "",
    email: "",
  });

  /////registered data///////
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { user_name, mobile, email } = input;
    if (user_name === "") {
      toast.error("Enter your name")
    } else if (mobile === "") {
      toast.error("Enter your mobile no.")
    } else if (!/^[0-9]+$/.test(mobile)) {
      toast.error("Enter valid mobile no.")
    } else if (email === "") {
      toast.error("Enter your email")
    } else if (!email.includes("@")) {
      toast.error("Enter valid email")
    } else {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {'size': 'normal',
      'callback': (response) => {
      },
      'expired-callback': () => {
      }
    });
    const number = '+91' + input.mobile;
    const appVerifier = window.recaptchaVerifier;

      signInWithPhoneNumber(auth, number, appVerifier)
        .then(function (e) {
          let code = prompt('enter the otp', '');
          if (code == null) return;
          e.confirm(code)
            .then(function (result) {
              console.log(result.user, 'user')
              // document.querySelector('mobile').textContent = "number verified"
              axios
                .post('http://localhost:5555/api/user/signup', input)
                .then(result => {
                  console.log(result)
                  if (result.data.affectedRows == 1) {
                    alert("User Added Successfully")
                    navigate('/')
                  }
                })
                .catch(err => {
                  console.log(err)
                })
            }).catch((error) => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error);
        })
    }}
    return (
      <>
        <section>
          <div className='form_data'>
            <div className='form_heading'>
              <h1>Hello, Please Registered</h1>
              <p>Hi,we are Happy . You are going to be a part of a family.</p>
            </div>
            <form>
              <div className='form_input'>
                <label htmlFor="user_name">Name</label>
                <input type="text" name="user_name" id="" onChange={(e) => setInput({ ...input, user_name: e.target.value })} placeholder='Enter your name' />
              </div>
              <div className='form_input'>
                <label htmlFor="mobile">Mobile no</label>
                <input type="tel" name="mobile" id="" onChange={(e) => setInput({ ...input, mobile: e.target.value })} placeholder='Enter your mobile no.' />
              </div>
              <div className='form_input'>
                <label htmlFor="email">Email Id</label>
                <div className='two'>
                  <input type="mail" name="email" onChange={(e) => setInput({ ...input, email: e.target.value })} id="" placeholder='Enter email id' />
                </div>
              </div>
              <button className='btn' onClick={handleSubmit}>Sign Up</button>
              <p>Already have an account <NavLink to='/'>Log in</NavLink></p>
            </form>              
            <div id="recaptcha-container"></div>

          </div>
          <ToastContainer />
        </section>
      </>
    )
}

export default SignUP

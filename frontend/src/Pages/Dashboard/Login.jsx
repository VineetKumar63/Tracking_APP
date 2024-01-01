import React, { useState } from 'react'
import "./../../Styles/mix.css"
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../firebase';

function Login() {
  const [spinner, setSpinner] = useState(false);
  const [mobile, setMobile] = useState();
  const navigate = useNavigate()
  const sendOtp = async (e) => {
    e.preventDefault();
    if (mobile === "") {
      toast.error("Enter your mobile");
    }else if (!/^[0-9]{10}$/.test(mobile)) {
      toast.error("Enter a valid 10-digit mobile number");
    } else {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'normal',
        'callback': (response) => {
        },
        'expired-callback': () => {
        }
      });
      const number = '+91' + mobile;
      const appVerifier = window.recaptchaVerifier;

      signInWithPhoneNumber(auth, number, appVerifier)
        .then(function (e) {
          let code = prompt('enter the otp', '');
          if (code == null) return;
          e.confirm(code)
            .then(function (result) {
              console.log(result.user, 'user')
              axios
                .post(`http://localhost:5555/api/user/signin/${mobile}`)
                .then(result => {
                  console.log(result)
                  if (result.data.user === 1) {
                    toast.success("WELCOME")
                    navigate('/dashboard')
                  } else if (result.data.user === 0) {
                    alert("user not sigined up")
                    navigate('/signup')
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
    }
  }

  return (
    <>
      <section>
        <div className='form_data'>
          <div className='form_heading'>
            <h1>Welcome Back</h1>
            <p>Hi,we are glad you're back. Please Login</p>
          </div>
          <form>
            <div className='form_input'>
              <label htmlFor="contact">Mobile</label>
              <input type="tel" name="contact" id="contact" onChange={(e) => setMobile(e.target.value)} placeholder='enter user mobile no' pattern="[0-9]{10}"
                maxLength={10} />
            </div>
            <button className={`btn ${spinner ? 'disabled' : ''}`} onClick={sendOtp} disabled={spinner}>
              Log in
              {spinner && <span><Spinner animation="border" role="status" /></span>}
            </button>
            <div id="recaptcha-container"></div>
            <p>Dont've have an account <NavLink to='/signup'>Sign up</NavLink></p>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  )
}

export default Login
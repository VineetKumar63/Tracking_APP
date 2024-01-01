import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { auth } from '../../firebase';


function Otp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const mobile = useLocation().state;
  window.recaptchaVerifier = new RecaptchaVerifier(auth
    , 'recaptcha-container', {
      'size': 'normal',
    'callback': (response) => {
    },
    'expired-callback': () => {
    }
  });
  
  const number = '+91' + mobile;
  const appVerifier = window.recaptchaVerifier;
  const handleLogin = async () => {
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, number, appVerifier);
      const code = otp;
      const result = await confirmationResult.confirm(code);

      console.log(result.user, 'user');
      toast.success("OTP Verified");
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      toast.error("Error verifying OTP. Please try again.");
    }
  };

return (
  <>
    <section>
      <div className='form_data'>
        <div className='form_heading'>
          <h1>Hey, Please Enter OTP </h1>
        </div>
        <form>
          <div className='form_input'>
            <label htmlFor="otp">OTP</label>
            <input type="text" name="otp" id="" onChange={(e) => setOtp(e.target.value)} placeholder='enter OTP' required/>
          </div>
          <button className='btn' onClick={handleLogin}>Submit</button>
        </form>
      </div>
      <ToastContainer />
    </section>
  </>
)
}
export default Otp
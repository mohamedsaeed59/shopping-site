import React, { useState } from 'react';
import styles from "./auth.module.scss";
import forgotImg from "../../assets/forgot.png";
import { Link } from 'react-router-dom';
import Card from '../../components/card/Card';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/Config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Reset = () => {
  const [email, setEmail] = useState("");

  const resetPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email).then(() => {
      toast.success("Check your email for a reset link")
    }).catch((error) => {
      toast.error(error.message);
    })
  };

  return (
    <>
    <ToastContainer />
    <section className={`container ${styles.auth}`}>
       <div className={styles.img}>
          <img src={forgotImg} alt='forget' width="400" />
        </div> 
        <Card>
            <div className={styles.form}>
                <h2>Reset Password</h2>
                <form onSubmit={resetPassword}>
                 <input type='text' placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)}/> 
                 <button type='submit' className='--btn --btn-primary --btn-block'>Reset Password</button>
                 <div className={styles.links}>
                  <p><Link to="/login">- Login</Link></p>
                  <p><Link to="/register">- Register</Link></p>
                 </div>
                </form>
            </div>
        </Card>
    </section>
    </>
  )
}

export default Reset;
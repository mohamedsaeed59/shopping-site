import React, { useState } from 'react';
import styles from "./auth.module.scss";
import registerImg from "../../assets/register.png";
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';
import Loader from "../../components/loader/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebase/Config";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    if(password !== cpassword){
      toast.error("Passwords don't match");
    }
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setIsLoading(false);
      toast.success("Registration Successful");
      navigate("/login");
    })
    .catch((error) => {
      toast.error(error.message);
      setIsLoading(false);
    })
  }
  return (
    <>
    {isLoading && <Loader />}
    <ToastContainer />
    <section className={`container ${styles.auth}`}>
        <Card>
            <div className={styles.form}>
                <h2>Register</h2>
                <form onSubmit={registerUser}>
                <input type='text' placeholder='Enter an Email' required value={email} onChange={(e) => setEmail(e.target.value)} /> 
                <input type='password' placeholder='Enter a Password' required value={password} onChange={(e) => setPassword(e.target.value)} /> 
                <input type='password' placeholder='Confirm a Password' required value={cpassword} onChange={(e) => setCpassword(e.target.value)} /> 
                <button className='--btn --btn-primary --btn-block'>Register</button>
                </form>
                <span className={styles.register}>
                    <p>Already have account?</p>
                    <Link to="/login">Login</Link>
                </span>
            </div>
        </Card>
        <div className={styles.img}>
          <img src={registerImg} alt='Register' width="400" />
        </div> 
    </section>
    </>
  )
}

export default Register;
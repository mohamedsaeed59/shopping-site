import React, { useEffect, useState } from 'react';
import styles from "./Header.module.scss";
import { Link, useNavigate } from 'react-router-dom';
import {FaShoppingCart, FaTimes, FaUserCircle} from "react-icons/fa";
import {HiOutlineMenuAlt3} from "react-icons/hi";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {auth} from "../../firebase/Config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '../../redux/slice/authSlice';
import ShowOnLogin, { ShowOnLogout } from '../hiddenLink/hiddenLink';

const logo = (
    <div className={styles.logo}>
      <Link to="/"><h2>e<span>Shop</span>.</h2></Link>
    </div>
);

const cart = (
  <span className={styles.cart}>
    <Link to="/cart">
      Cart <FaShoppingCart size={20} />
      <p>0</p>
    </Link>
  </span>
);

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        if(user.displayName == null){
          const uName = user.email.slice(0, -10);
          setDisplayName(uName);
        }else{
          setDisplayName(user.displayName);
        }
        dispatch(SET_ACTIVE_USER({
          email: user.email,
          userName: user.displayName,
          userId: user.uid,
        }))
      }else{
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    })
  },[dispatch]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    signOut(auth).then(() => {
      toast.success("Logout Successfully");
    }).catch((error) => {
      toast.error(error.message);
      navigate("/");
    })
  }

  return (
    <>
    <ToastContainer />
    <header>
      <div className={styles.header}>
        {logo}
        <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}>
          <div className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` : `${styles["nav-wrapper"]}`} onClick={hideMenu}></div>
          <ul>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color='#fff' onClick={hideMenu}/>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          <div className={styles["header-right"]}>
            <span className={styles.links}>
              <ShowOnLogout>
                 <Link to="/login">Login</Link>
              </ShowOnLogout>
              <ShowOnLogin>
                <a href='#home'>
                  <FaUserCircle size={16}/>
                  Hi {displayName}
                </a>
              </ShowOnLogin>
              <ShowOnLogout>
                <Link to="/register">Register</Link>
              </ShowOnLogout>
              <ShowOnLogin>
                  <Link to="/order-history">My Orders</Link>
              </ShowOnLogin>
              <ShowOnLogin>
                  <Link to="/" onClick={logoutUser}>Logout</Link>
              </ShowOnLogin>
            </span>
            {cart}
          </div>
        </nav>
        <div className={styles["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu}/>
        </div>
      </div>
    </header>
    </>
  )
}

export default Header;
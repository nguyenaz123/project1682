import FaceIcon from "@mui/icons-material/Face";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { clearErrors, login, register } from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";
import "./LoginRegister.css";
import defaultAvt from "../../images/Profile.png"

const LoginRegister = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation();
  const {error, loading, isAuthenticated} = useSelector((state) => state.user);
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState(defaultAvt);
  const [avatarPreview, setAvatarPreview] = useState(defaultAvt);

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  }

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  }

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({...user, [e.target.name] : e.target.value});
    }
  }

  const redirect = location.search ? `/${location.search.split("=")[1]}` : "/account";

useEffect(() => {
  if (error) {
    alert.error(error);
    dispatch(clearErrors());
  }

  if (isAuthenticated) {
    navigate(redirect);
    console.log(redirect); 
  }
}, [dispatch, error, alert, isAuthenticated, navigate, redirect]);


  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");
      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");
      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  }

  return (
    <Fragment>
      {loading ? <Loader/> :
      <Fragment>
        <div className="LoginRegisterContainer">
          <div className="LoginRegisterBox">
            <div>
              <div className="login_register_toggle">
                <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
              </div>
              <button ref={switcherTab}></button>
            </div>
            <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
              <div className='loginEmail'>
                <MailOutlineIcon />
                <input
                  type='email'
                  placeholder='Email'
                  required
                  value={loginEmail}
                  onChange={(e)=> setLoginEmail(e.target.value)}/>
              </div>
              <div className='loginPassword'>
                <LockOpenIcon />
                <input
                  type='password'
                  placeholder='Password'
                  required
                  value={loginPassword}
                  onChange={(e)=> setLoginPassword(e.target.value)}/>
              </div>
              <Link to='/password/forgot'>Forget Password?</Link>
              <input type='submit' className='loginBtn' value="Login"/>
            </form>
            <form
              className="registerForm"
              ref={registerTab}
              encType="multipart/form-data"
              onSubmit={registerSubmit}
            >
              <div className="registerName">
                <FaceIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={name}
                  onChange={registerDataChange}
                />
              </div>
              <div className="registerEmail">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={registerDataChange} />
              </div>
              <div className='registerPassword'>
                <LockOpenIcon />
                <input
                  type='password'
                  placeholder='Password'
                  required
                  name="password"
                  value={password}
                  onChange={registerDataChange} />
              </div>
              <div id="registerImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={registerDataChange}/>
              </div>
              <input
                type="submit"
                value="Register"
                className="registerBtn"
              />
            </form>
          </div>
        </div>
      </Fragment>}
    </Fragment>
  );
}

export default LoginRegister;

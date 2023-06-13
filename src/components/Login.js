import React, { useState, useEffect,useContext } from 'react';
import {FcGoogle} from 'react-icons/fc';
import { icons } from 'react-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import {LogContext } from '../context/LogContext';
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn, setIsLoggedIn } = useContext(LogContext);
  const navigate = useNavigate()

  // useEffect(() => {
   
  //   if (isLoggedIn) {
  //     setIsLoggedIn(true);
  //   }
  // }, [isLoggedIn]);
  
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      // Make an HTTP POST request to the login API endpoint with form data
      const response = await axios.post('http://10.224.0.67:8000/auth/token', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Handle the response from the API
      // console.log('Login successful');
      console.log(response.data);
      const result = response.data;

      // Reset the email and password fields
      setUsername('');
      setPassword('');
      // After successful authentication
      setIsLoggedIn(true);
      localStorage.setItem('fullname', result.fullname)
      localStorage.setItem('email', result.email)
      localStorage.setItem('token', result.token)
      localStorage.setItem('role', result.role)

      navigate("/")

    } catch (error) {
      // Handle error
      console.error('Login failed:', error);
    }
  };


  const handleForgotPassword = () => {
    // Handle forgot password logic here
    console.log('Forgot Password');
  };

  const handleSignUp = () => {
    // Handle sign up logic here
    console.log('Sign Up');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '32.9em', marginTop :'-1.525em' }}>
      <div style={{ width: '23.875em', backgroundColor: 'white', padding: '1.25em', boxShadow :'0px 1px 8px rgba(0, 0, 0, 0.25)', borderRadius :'10px' }}>
        <h2 style={{ color: '#7E22CE', textAlign: 'center' , font :'Roboto'}}>User Login</h2>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <button style={{ width: '60%',  height : '20%', marginBottom: '0.125em',padding:'0.93em',marginTop:'0.525em', gap:'0.9375em',background:'#F6F8FC', border:'none', borderRadius:'10px' }}>
          <FcGoogle/>    
          Sign in with Google
        </button>
        </div>

        <div style={{ color: 'black', textAlign: 'center', paddingTop:'1.25em',paddingBlock:'1.25em', fontSize:'0.81em'}}>OR LOGIN WITH MAIL</div>

        <div >
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ justifyContent:'center',alignItems:'center',width: '100%',fontFamily:'unset',fontStyle:'normal',lineHeight:'24px', height : '1.875em',paddingLeft:'0px' ,color:'8B8B8B', marginBottom: '0px',fontWeight:'550',fontWeight:'500',fontSize: '1em', background:'#F6F8FC', border:'none' }}
            required
          />
          <button type="button" onClick={handleForgotPassword} style={{ width: '49%' ,fontFamily:'unset',marginLeft: '14.5em',fontStyle:'normal',lineHeight:'24px',color :'#8B8B8B', padding:'1em 0.5625em' , background : 'none' }}>Forget Password?</button>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', height : '1.875em', marginBottom: '1.25em',color:'8B8B8B',fontFamily:'unset',fontStyle:'normal',lineHeight:'24px', background:'#F6F8FC' ,fontWeight:'500',fontSize: '1em', border:'none'}}
            required
          />
          
          <div style={{ display: 'flex', justifyContent: 'center' , paddingTop :'0.25em'}}>
            <button type="submit" style={{ width: '100%' ,justifyContent:'center', paddingTop:'0.525em', fontFamily:'unset',fontStyle:'normal',lineHeight:'24px',background : '#7E22CE' , color:'white', fontWeight : '500' , padding:'0.525em'}}>Login</button>
            {/* <button type="button" onClick={handleForgotPassword} style={{ width: '49%' , padding:'15px'}}>Forgot Password</button> */}
          </div>
        </form>
        </div>
        <p style={{ textAlign: 'center' , color:'#7E22CE',fontWeight:'550' }}>
          Don't have an account ,<NavLink to="/signup"> <button onClick={handleSignUp} style={{ fontWeight:'549',color: '#7E22CE', border: 'none', background: 'none', padding: '0' }}>Sign up</button></NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
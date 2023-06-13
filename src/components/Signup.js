import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { icons } from 'react-icons';
import Footer from "./Footer";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState('patient');
  const [ageError, setAgeError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [fullnameError, setFullnameError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here
    console.log('Signup with:', email, password);
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here
    console.log('Forgot Password');
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    // Username validation
    const usernamePattern = /^[A-Za-z][A-Za-z0-9_]{2,9}$/;
    if (!username.match(usernamePattern)) {
      setUsernameError('Username should start from an alphabet and other characters can be alphabets, numbers or an underscore and have a length b/2 3-10 characters');
      return;
    }
    setUsernameError('');


    // Age validation
    const agePattern = /^\d{2}$/;
    if (!age.match(agePattern)) {
      setAgeError('Please enter a valid 2-digit age.');
      return;
    }
    setAgeError('');

    // Full name validation
    const fullNameRegEX = /^[a-zA-Z]+ [a-zA-Z]+$/
    if (!fullname.match(fullNameRegEX)) {
      setFullnameError('Full name is not valid');
      return;
    }
    setFullnameError('');

    // Gender validation
    if (!gender) {
      setGenderError('Please select a gender.');
      return;
    }
    setGenderError('');

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailPattern)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');

    // Password validation
    const passwordPattern =/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (!password.match(passwordPattern)) {
      setPasswordError('Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters.');
      return;
    }
    setPasswordError('');
    // Handle sign up logic here
    console.log('Sign Up');

    const userData = {
      username: username,
      email: email,
      full_name: fullname,
      gender: gender,
      age: parseInt(age),
      // phone_number: '', // Add phone number if available
      password: password,
      user_role: "USER",
    };

    axios.post('http://10.224.0.67:8000/auth/create/user', userData)
      .then(response => {
        // Handle successful signup response
        console.log('Signup successful', response.data);
       setUsername('');
       setFullname('');
       setEmail('');
       setGender('');
       setAge('');
       setPassword('');
       setRole('');
      //  setIsLoggedIn(true);
       localStorage.setItem('isLoggedIn', true);
       localStorage.setItem('fullName', fullname);
      })
      .catch(error => {
        // Handle signup error
        console.error('Signup error', error);
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '32.9em', marginTop: '0em' }}>
      <div style={{ width: '23.875em', backgroundColor: 'white', padding: '1.25em', boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.25)', borderRadius: '10px', overflow: "auto" }}>
        <h2 style={{ color: '#7E22CE', marginTop:'0.1em',textAlign: 'center', font: 'Roboto' }}>User Registration</h2>
        {/* <button style={{ width: '100%', height : '20%', marginBottom: '2px',padding:'15px' , gap:'15px',background:'#F6F8FC', border:'none' }}><FcGoogle/>    Sign in with Google</button> */}

        {/* <div style={{ color: 'black', textAlign: 'center', paddingTop:'15px' }}>Or LogIn with Mail</div> */}

        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', height: '30px', marginBottom: '0.4375em', marginTop: '0.1625em', fontFamily: 'unset', fontStyle: 'normal', lineHeight: '24px', background: '#F6F8FC', fontSize: '16px', fontWeight: '500', border: 'none' }}
            required
          />
          {usernameError && <p style={{ color: 'red', fontSize: '12px' }}>{usernameError}</p>}

          <input
            type="text"
            placeholder="Fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            style={{ width: '100%', height: '1.875em', marginBottom: '0.4375em', marginTop: '0px', fontFamily: 'unset', fontStyle: 'normal', lineHeight: '24px', background: '#F6F8FC', fontSize: '16px', fontWeight: '500', border: 'none' }}
            required
          />
          {fullnameError && <p style={{ color: 'red', fontSize: '12px' }}>{fullnameError}</p>}
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', height: '1.875em', marginBottom: '0.4375em', marginTop: '0px', fontFamily: 'unset', fontStyle: 'normal', lineHeight: '24px', background: '#F6F8FC', fontSize: '16px', fontWeight: '500', border: 'none' }}
            required
          />
          {emailError && <p style={{ color: 'red', fontSize: '12px' }}>{emailError}</p>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', height: '1.875em', marginBottom: '0.4375em', marginTop: '0px', fontFamily: 'unset', fontStyle: 'normal', lineHeight: '24px', background: '#F6F8FC', fontSize: '16px', fontWeight: '500', border: 'none' }}
            required
          />
          {passwordError && <p style={{ color: 'red', fontSize: '12px' }}>{passwordError}</p>}

          <div style={{ display: 'flex', marginBottom: '0.625em' }}>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              style={{ width: '50%', height: '1.875em', marginRight: '0em', color: 'grey', marginBottom: '0.4375em', marginTop: '0px', fontFamily: 'unset', fontStyle: 'normal', lineHeight: '24px', background: '#F6F8FC', border: 'none', fontSize: '16px', borderBottom: '1px solid #000000', fontWeight: '500' }}
              required
            >
              <option value="" style={{ fontFamily: 'unset' }}>Select Gender</option>
              <option value="male" style={{ fontFamily: 'unset' }}>Male</option>
              <option value="female" style={{ fontFamily: 'unset' }}>Female</option>
            </select>
            {genderError && <p style={{ color: 'red', fontSize: '12px' }}>{genderError}</p>}

            <input
              type="text"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              style={{ width: '50%', height: '1.875em', marginBottom: '0.4375em', marginLeft: '1.55em', fontFamily: 'unset', fontStyle: 'normal', lineHeight: '24px', marginTop: '0px', background: '#F6F8FC', fontSize: '16px', border: 'none', fontWeight: '500', borderBottom: '1px solid #000000' }}
              required
            />
            {ageError && <p style={{ color: 'red', fontSize: '12px' }}>{ageError}</p>}

          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25em', fontFamily: 'unset', fontStyle: 'normal', lineHeight: '24px' }}>
            <label style={{ marginRight: '0.625em' }}>
              <input
                type="radio"
                name="role"
                value="patient"
                checked={role === 'patient'}
                onChange={() => setRole('patient')}
              />
              Patient
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="doctor"
                checked={role === 'doctor'}
                onChange={() => setRole('doctor')}
              />
              Doctor
            </label>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="submit" style={{ width: '100%', background: '#7E22CE', color: 'white', padding: '0.5em', fontWeight: '500', fontFamily: 'unset', fontStyle: 'normal', lineHeight: '24px', borderRadius: '8px' }}>Signup</button>
            {/* <button type="button" onClick={handleForgotPassword} style={{ width: '49%' , padding:'15px'}}>Forgot Password</button> */}
          </div>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.6875em', color: '#7E22CE', fontWeight: '500' }}>
          Already have an account ,  <NavLink to="/login" style={{color:'#7E22CE'}}>Login</NavLink>
        </p>
        
      </div>
  
    </div>
  );
};

export default SignUp;
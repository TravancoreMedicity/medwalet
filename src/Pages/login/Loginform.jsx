import React, { memo, useCallback, useMemo, useState } from 'react'
import { Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { succesNofity, errorNofity, sanitizeToNumbers } from '../../Constant/Constant';
import { ToastContainer } from 'react-toastify';
import { axioslogin } from '../../AxiosConfig/Axiox';




function Loginform() {

  const navigate = useNavigate()
    
  const [userInput, setUserInput] = useState({
    empid: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    empidError: '',
    passwordError: ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeToNumbers(value);
    handleError(name, sanitizedValue);
    setUserInput((prev) => {
      return { ...prev, [name]: sanitizedValue }
    })
  }

  const handleError = (name, value) => {
    if (name === "empid") {
      if (value === "") {
        setErrors((prev) => ({
          ...prev,
          empidError: "The field is empty"
        }))
      } else {
        setErrors((prev) => ({
          ...prev,
          empidError: ""
        }))
      }
    }
    if (name === "password") {
      if (value === "") {
        setErrors((prev) => ({
          ...prev,
          passwordError: "The password field is empty"
        }))
      } else {
        setErrors((prev) => ({
          ...prev,
          passwordError: ""
        }))
      }
    }
  };


  const useLoginDetail = useMemo(() => {
    return {
      emp_username: userInput.empid,
      emp_password: userInput.password
    }
  },[userInput])

  const handleloginform = useCallback(async () => { 
    try {

      if (userInput.empid === null || userInput.empid === undefined || userInput.empid === "") {
        setErrors((prev) => ({
          ...prev,
          empidError: "Employee Id Field is required"
        }))
      }

      if (userInput.password === null || userInput.password === undefined || userInput.password === "") {
        setErrors((prev) => ({
          ...prev,
          passwordError: "Password Field is required"
        }));
        return;
      }
      const result = await axioslogin.post("/employee/login", useLoginDetail)
      const { token, message, emp_id, success } = await result.data;

      if (success === 0) {
        errorNofity("User does not Exist")
        return
      }
      const loggedDetl = {
        token: token,
        empid: emp_id,
      }
      sessionStorage.setItem('userDetl', JSON.stringify(loggedDetl));
      succesNofity(message)
      navigate('/Home/Dashboard')
    } catch (err) {
      console.log('Error during login:', err);
      errorNofity('Internal server Error')
    }
  }, [useLoginDetail,userInput.empid,userInput.password,navigate]);



  return (
    <Paper
      sx={{
        borderRadius: 2,
        boxShadow: { xs: 0, sm: 3, lg: 3, xl: 3 },
        width: { lg: '450px', md: '400px', sm: "400px", xs: '90%' },
        minHeight: { lg: "320px", md: '280px', xs: '280px' }, bgcolor: "white",
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <ToastContainer />
      <Typography sx={{
        display: { xs: 'none', sm: 'block' },
        color: 'black',
        fontFamily: { xs: 'fantasy', sm: "cursive" },
        fontSize: { xs: 12, sm: 16 },
        fontWeight: { xs: 100, sm: 400 }
      }}>Login to Medvalet</Typography>
      <TextField
        sx={{ width: { xs: '100%', sm: '90%' }, marginTop: { xs: 3, sm: 2 }, height: 30, marginBottom: errors.empidError ? 5 : 2, }}
        id="outlined-emloyee-input"
        label="Employee Id"
        type="text"
        size='small'
        name='empid'
        autoComplete="current-password"
        onChange={handleChange}
        error={!!errors.empidError}
        helperText={errors.empidError}
        value={userInput.empid}

      />
      <TextField
        sx={{
          width: { xs: '100%', sm: '90%' }, marginTop: { xs: 3, sm: 2 }, height: 30,
          marginBottom: errors.passwordError ? 5 : 2,
        }}
        id="outlined-password-input"
        label="Password"
        type="password"
        size='small'
        name='password'
        autoComplete="current-password"
        onChange={handleChange}
        error={!!errors.passwordError}
        helperText={errors.passwordError}
        value={userInput.password}
      />
      <Button sx={{
        marginTop: { xs: 4, sm: 2 },
        width: { xs: '99%', sm: '90%' },
        height: { lg: 55, sm: 40, xs: 40 },
        fontWeight: { xs: 200, sm: 400 },
        borderRadius: { xs: 10, sm: 2 }
      }}
        variant="contained"
        onClick={handleloginform}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleloginform()
          }
        }}
      >LogIn Here</Button>
      <Typography
        sx={{
          display: { xs: 'block', sm: 'none' },
          marginTop: 1,
          // fontWeight: 400,
          color: 'black',
          fontFamily: { sm: "cursive" },
          fontSize: { xs: 12, sm: 16 },
          fontWeight: { xs: 100, sm: 400 }
        }}
      >I acknowledge the rules and agree to comply.</Typography>
      <Link
        variant="contained"
        sx={{
          marginTop: { sm: 1 },
          // fontWeight: 400,
          fontFamily: { sm: "cursive" },
          cursor: 'pointer',
          fontSize: { xs: 11, sm: 14, lg: 16 },
          fontWeight: { xs: 200, sm: 400 },
          color: 'black'
        }}
        onClick={() => console.log("clicked me")}>Forget Password?</Link>
    </Paper>
  )
}

export default memo(Loginform) 
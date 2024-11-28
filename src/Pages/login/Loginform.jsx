import React, { useCallback, useState } from 'react'
import { Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { succesNofity, errorNofity } from '../../Constant/Constant';
import { ToastContainer } from 'react-toastify';
import { axioslogin } from '../../AxiosConfig/Axiox';





function Loginform() {







  const navigate = useNavigate()
  const [empid, setEmpId] = useState('');
  const [password, setPassword] = useState('')
  const [empidError, setEmpidError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  const useLoginDetail = {
    emp_username: empid,
    emp_password: password
  }

  const handleusername = (e) => {
    let value = e.target.value
    if (!/^\d+$/.test(value)) {
      setEmpidError("Employee ID should only contain numbers");
    } else {
      setEmpidError("");
    }
    setEmpId(value)
  }


  const handleloginform = useCallback(async () => {
    try {

      if (empid === "") {
        setEmpidError("Employee Id  is Blank");
      } else if (password === "") {
        setPasswordError("Password Field is required")
      } else {
        const result = await axioslogin.post("/employee/login", useLoginDetail)
          .then((response) => {
            return response
          })
          .catch((error) => {
            return error
          })

        const data = result.data;
     
        if (data.success  === 0) {
          errorNofity("User does not Exist")
        } else {
          console.log(data);
          const loggedDetl = {
            user: data.user,
            token: data.token,
            empno: data.emp_no,
            empid: data.emp_id,
            empname: data.emp_name,
            empdeptsec: data.emp_sec,
            empsecid: data.emp_secid,
            empdept: data.emp_dept,
            empdeptname: data.dept_name,
            apptoken: data.app_token,
            logOut: data.logOutTime
          }
         // sessionStorage.setItem('userDetl', JSON.stringify({ token: data.token }));
         sessionStorage.setItem('userDetl', JSON.stringify(loggedDetl));
          succesNofity('Login suceessFully')
          navigate('/Home/Dashboard')
        }
      }


    } catch (err) {
      console.error('Error during login:', err);
      // throw new Error("Internal server Error Occured")
    }
  }, [empid, password]);



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
        fontFamily: "cursive",
        fontWeight: 400,
        color: 'black',
        fontFamily: { xs: 'fantasy', sm: "cursive" },
        fontSize: { xs: 12, sm: 16 },
        fontWeight: { xs: 100, sm: 400 }
      }}>Login to Medvalet</Typography>
      <TextField
        sx={{ width: { xs: '100%', sm: '90%' }, marginTop: { xs: 3, sm: 2 }, height: 30, marginBottom: empidError ? 5 : 2, }}
        id="outlined-password-input"
        label="Employee Id"
        type="text"
        autoComplete="current-password"
        onChange={handleusername}
        error={!!empidError}
        helperText={empidError}
        value={empid}
      />
      <TextField
        sx={{
          width: { xs: '100%', sm: '90%' }, marginTop: { xs: 3, sm: 2 }, height: 30,
          marginBottom: passwordError ? 5 : 2,
        }}
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        onChange={(e) => setPassword(e.target.value)}
        error={!!passwordError}
        helperText={passwordError}
        value={password}
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
      >LogIn Here</Button>
      <Typography
        sx={{
          display: { xs: 'block', sm: 'none' },
          marginTop: 1,
          fontWeight: 400,
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

export default Loginform
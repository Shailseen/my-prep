import {
    Grid,
    Paper,
    Avatar,
    TextField,
    Button,
    Typography,
    Link,
  } from "@mui/material";
  import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
  import { useState } from "react";
  import { useAuth } from "../../contexts/AuthContext";
  

  
  export const SignUpPage = () => {
    const { signup, currentUser } = useAuth();
    const [inputLogin, setInputLogin] = useState({
      email: "",
      password: "",
      confrimPassword: "",
      name: "",
    });
    const paperStyle = {
      padding: 20,
      height: "70vh",
      width: 280,
      margin: "20px auto",
    };
  
    const confirmPasswordHandler = (e) => {
      setInputLogin({ ...inputLogin, confrimPassword: e.target.value });
    };
    const passwordHandler = (e) => {
      setInputLogin({ ...inputLogin, password: e.target.value });
    };
    const emailHandler = (e) => {
      setInputLogin({ ...inputLogin, email: e.target.value });
    };
    const nameHandler = (e) => {
      setInputLogin({ ...inputLogin, name: e.target.value });
    };
  
    const avatarStyle = { backgroundColor: "#1bbd7e" };
    const btnstyle = { margin: "8px 0" };
    const headerStyle = { textAlign: "left", color: "grey" };
    const inputStyle = {marginBottom: "1rem"}
    return (
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h3 style={headerStyle}>SIGN UP</h3>
          </Grid>
          <TextField
            style={inputStyle}
            label="Name"
            type="text"
            placeholder="Enter your name"
            fullWidth
            required
            onChange={(e) => nameHandler(e)}
          />
          <TextField
          style={inputStyle}
            label="Email"
            type="email"
            placeholder="Enter your email"
            fullWidth
            required
            onChange={(e) => emailHandler(e)}
          />
          <TextField
          style={inputStyle}
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            onChange={(e) => passwordHandler(e)}
          />
          <TextField
          style={inputStyle}
            label="Enter confirm password"
            placeholder="Enter confirm password"
            type="password"
            fullWidth
            required
            onChange={(e) => confirmPasswordHandler(e)}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={() => signup(inputLogin.email, inputLogin.password,inputLogin.name)}
          >
            Sign up
          </Button>
          <Typography>
            Already have an account?<Link to="/login" className="link"> Sign In</Link>
          </Typography>
        </Paper>
      </Grid>
    );
  };
  
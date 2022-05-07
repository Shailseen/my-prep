import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { useState } from "react";

export const LoginPage = () => {
    const [inputLogin, setInputLogin] = useState({ email: "", password: "" });
    const passwordHandler = (e) => {
      setInputLogin({ ...inputLogin, password: e.target.value });
    };
    const emailHandler = (e) => {
      setInputLogin({ ...inputLogin, email: e.target.value });
    };

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const headerStyle = {
    textAlign: "left",
    color: "grey",
  };
  const avatarStyle = { backgroundColor: "var(--primary-color)" };
  const btnstyle = { margin: "8px 0" };
  const txtStyle = { color: "grey", fontSize: "large", textAlign: "center" };
  const linkStyle = { textDecoration: "none" };
  const inputStyle = { marginBottom: "1rem" };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h3 style={headerStyle}>LOGIN</h3>
        </Grid>
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          style={inputStyle}
            onChange={(e) => emailHandler(e)}
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
          style={inputStyle}
            onChange={(e) => passwordHandler(e)}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
        >
          Log in
        </Button>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
        >
          Log in as Guest credential
        </Button>
        <Typography style={txtStyle}>
          Need an account?
          <Link to="/" style={linkStyle}>
            {" "}
            SIGN UP
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

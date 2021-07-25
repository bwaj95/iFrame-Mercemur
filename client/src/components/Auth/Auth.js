import {
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import { register, login } from "../../actions/auth";

const Auth = () => {
  const classes = useStyles();
  const initialData = { email: "", password: "" };
  const [formData, setFormData] = useState(initialData);

  const [isSignup, toggleSignUp] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  //console.log("AuthData User: ", user);
  // console.log("ls pro: ", localStorage.getItem("profile"));
  // console.log(
  //   "ls token: ",
  //   JSON.parse(localStorage.getItem("profile")).token
  // );

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
    if (user) history.replace("/iframes");
  }, [user, history]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) dispatch(register(formData, history));
    else dispatch(login(formData, history));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                name="email"
                label="Email"
                autoFocus
                type="text"
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                name="password"
                label="Password"
                type="password"
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <Button
            color="secondary"
            fullWidth
            variant="contained"
            onClick={() => toggleSignUp((prev) => !prev)}
          >
            {isSignup ? "Have an account? Sign In." : "New Here? Sign Up."}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;

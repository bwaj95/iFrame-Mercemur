import React, { useEffect, useState } from "react";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";

const Navbar = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const handleLogout = () => {
    dispatch({ type: LOGOUT });
    setUserData(null);
    history.replace("/");
  };

  return (
    <AppBar className={classes.appBar} position="sticky" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          iFrame-Mercemur
        </Typography>
      </div>

      <Toolbar className={classes.toolbar}>
        {userData === null ? (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        ) : (
          <div className={classes.purple}>
            <Typography className={classes.userName} variant="h6">
              {userData?.user?.email}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

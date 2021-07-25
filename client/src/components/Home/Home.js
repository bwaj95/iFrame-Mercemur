import { CircularProgress, Paper } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import useStyles from "./styles";

const Home = () => {
  const history = useHistory();
  const classes = useStyles();

  const [user, setUserData] = useState(null);

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("profile")));

    if (user === null) history.replace("/user");
    else history.replace("/iframes");
  }, [user, history]);

  return (
    <Paper className={classes.loadingPaper} elevation={6}>
      <CircularProgress size="7em" />
    </Paper>
  );
};

export default Home;

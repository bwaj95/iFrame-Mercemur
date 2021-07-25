import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Paper,
  Grid,
  Typography,
  Box,
} from "@material-ui/core";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Iframe from "react-iframe";
import { postFrames, getFrameById } from "../../actions/iframes";

import useStyles from "./styles";

const Frame = () => {
  const classes = useStyles();

  const [user, setUserData] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("profile")));
  }, []);
  if (user === null) history.replace("/user");

  const selectedData = useSelector((state) => state.iframes);
  console.log("Selected Data: ", selectedData);

  const [currentUrl, setCurrentUrl] = useState("");
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (id) {
      //console.log("ID: ", id);
      dispatch(getFrameById(id));
    }
  }, [id, dispatch]);

  const handleCurrentUrl = (e) => {
    e.preventDefault();
    setCurrentUrl(e.target.value);
    setShareUrl("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("CurrentURL: ", currentUrl);
    dispatch(postFrames({ url: currentUrl.toString() }));
  };

  const setShareLink = () => {
    setShareUrl(`http://localhost:3000/iframes/${selectedData.id}`);
    console.log(shareUrl);
  };

  return (
    <Box>
      <Paper className={classes.paper}>
        <Grid>
          <form
            autoComplete="off"
            noValidate
            className={`${classes.form} ${classes.root}`}
            onSubmit={handleSubmit}
          >
            <TextField
              name="url"
              label="Url"
              value={currentUrl}
              onChange={handleCurrentUrl}
              variant="outlined"
              fullWidth
            />
            <Button
              className={classes.buttonSubmit}
              variant="contained"
              color="primary"
              size="large"
              type="submit"
            >
              Submit
            </Button>
          </form>

          {selectedData.id && (
            <Box className={classes.iframeBox}>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={setShareLink}
              >
                Share
              </Button>{" "}
              &nbsp;
              <Typography
                component={Link}
                to={`/iframes/${selectedData.id}`}
              >{`${shareUrl}`}</Typography>
            </Box>
          )}
        </Grid>
      </Paper>
      <Grid style={{ marginTop: "5px" }}>
        <Iframe
          className={classes.iframe}
          url={selectedData.url}
          id={selectedData.id}
          width="60%"
          height="60%"
          display="inline"
          position="absolute"
        />
      </Grid>
    </Box>
  );
};

export default Frame;

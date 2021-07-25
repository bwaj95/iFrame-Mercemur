import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "center",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  buttonSubmit: {
    margin: "20px 20px",
  },
  share: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
  },
  iframeBox: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    marginTop: "1px",
  },
}));

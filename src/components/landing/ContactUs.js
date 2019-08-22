import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 500,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: "none",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
}));

const ContactUs = ({ contactUs }) => {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Typography variant="h4" id="modal-title">
        Contact Us
      </Typography>
      <Typography variant="subtitle1" id="simple-modal-description">
        {contactUs}
      </Typography>
    </div>
  );
};
export default ContactUs;

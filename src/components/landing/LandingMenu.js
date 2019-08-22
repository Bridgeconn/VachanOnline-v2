import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import FeedbackIcon from "@material-ui/icons/Feedback";
import RoomIcon from "@material-ui/icons/Room";
import BuildIcon from "@material-ui/icons/Build";
import Modal from "@material-ui/core/Modal";
import Drawer from "@material-ui/core/Drawer";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Feedback from "./Feedback";
import Subscribe from "./Subscribe";

const useStyles = makeStyles(theme => ({
  list: {
    width: 250
  },
  menuButton: {
    marginRight: theme.spacing(2)
  }
}));

const LandingMenu = props => {
  const classes = useStyles();
  return (
    <>
      <Drawer open={props.menu} onClose={props.toggleDrawer(false)}>
        <div
          className={classes.list}
          role="presentation"
          onClick={props.toggleDrawer(false)}
          onKeyDown={props.toggleDrawer(false)}
        >
          <List>
            <ListItem button onClick={props.toggleModal("aboutUs", true)}>
              <ListItemIcon>
                <BuildIcon />
              </ListItemIcon>
              <ListItemText primary={props.menus[0]} />
            </ListItem>
            <ListItem button onClick={props.toggleModal("contactUs", true)}>
              <ListItemIcon>
                <RoomIcon />
              </ListItemIcon>
              <ListItemText primary={props.menus[1]} />
            </ListItem>
            <ListItem button onClick={props.toggleModal("feedback", true)}>
              <ListItemIcon>
                <FeedbackIcon />
              </ListItemIcon>
              <ListItemText primary={props.menus[2]} />
            </ListItem>
            <ListItem button onClick={props.toggleModal("subscribe", true)}>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={props.menus[3]} />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <Modal
        open={props.modal.aboutUs}
        onClose={props.toggleModal("aboutUs", false)}
      >
        <div>
          <AboutUs aboutUs={props.aboutUs} />
        </div>
      </Modal>
      <Modal
        open={props.modal.contactUs}
        onClose={props.toggleModal("contactUs", false)}
      >
        <div>
          <ContactUs contactUs={props.contactUs} />
        </div>
      </Modal>

      <Modal
        open={props.modal.feedback}
        onClose={props.toggleModal("feedback", false)}
      >
        <div>
          <Feedback />
        </div>
      </Modal>
      <Modal
        open={props.modal.subscribe}
        onClose={props.toggleModal("subscribe", false)}
      >
        <div>
          <Subscribe />
        </div>
      </Modal>
    </>
  );
};
export default LandingMenu;

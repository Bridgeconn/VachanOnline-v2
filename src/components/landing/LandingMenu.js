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

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const LandingMenu = (props) => {
  const classes = useStyles();

  const menus = ["About us", "Contact us", "Feedback", "Subscribe"];

  const [modal, setMenuModal] = React.useState({
    aboutUs: false,
    contactUs: false,
    feedback: false,
    subscribe: false,
  });
  const toggleModal = (name, value) => () => {
    setMenuModal({ ...modal, [name]: value });
  };
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
            <ListItem button onClick={toggleModal("aboutUs", true)}>
              <ListItemIcon>
                <BuildIcon />
              </ListItemIcon>
              <ListItemText primary={menus[0]} />
            </ListItem>
            <ListItem button onClick={toggleModal("contactUs", true)}>
              <ListItemIcon>
                <RoomIcon />
              </ListItemIcon>
              <ListItemText primary={menus[1]} />
            </ListItem>
            <ListItem button onClick={toggleModal("feedback", true)}>
              <ListItemIcon>
                <FeedbackIcon />
              </ListItemIcon>
              <ListItemText primary={menus[2]} />
            </ListItem>
            <ListItem button onClick={toggleModal("subscribe", true)}>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={menus[3]} />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <Modal open={modal.aboutUs} onClose={toggleModal("aboutUs", false)}>
        <div>
          <AboutUs />
        </div>
      </Modal>
      <Modal open={modal.contactUs} onClose={toggleModal("contactUs", false)}>
        <div>
          <ContactUs />
        </div>
      </Modal>
      <Modal open={modal.feedback} onClose={toggleModal("feedback", false)}>
        <div>
          <Feedback />
        </div>
      </Modal>
      <Modal open={modal.subscribe} onClose={toggleModal("subscribe", false)}>
        <div>
          <Subscribe />
        </div>
      </Modal>
    </>
  );
};
export default LandingMenu;

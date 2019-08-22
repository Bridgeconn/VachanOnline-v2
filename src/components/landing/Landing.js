import React from "react";
import BibleIndex from "../landing/BibleIndex";
import PageHeader from "./PageHeader";
import Banner from "./Banner";
import LandingFooter from "./LandingFooter";
import Grid from "@material-ui/core/Grid";
import LandingMenu from "./LandingMenu";
import "./Landing.css";
import LandingAboutUs from "./LandingAboutUs";

const Landing = props => {
  let footerData = {
    links: ["About us", "Contact us", "Feedback"],
    copyright: "copyright@2019 VachanOnline",
    subscribe: "Subscribe"
  };

  const [menu, setMenu] = React.useState(false);
  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setMenu(open);
  };
  const [modal, setMenuModal] = React.useState({
    aboutUs: false,
    contactUs: false,
    feedback: false,
    subscribe: false
  });
  const toggleModal = (name, value) => () => {
    //uncomment below lines to start using modals for about us etc
    //setMenuModal({ ...modal, [name]: value });
  };
  let menus = ["About us", "Contact us", "Feedback", "Subscribe"];
  let aboutUs =
    "VachanOnline.com is the premier Bible study website in Indian languages." +
    " It is part of The Vachan Project to provide free access to digital " +
    "scripture engagement resources. It is an initiative of Friends of Agape " +
    "(FOA), USA. The content herein is not for reuse or redistribution" +
    " in any other format or platform without explicit permission.";
  let contactUs = "Address Email Mobile No";
  return (
    <Grid>
      <PageHeader toggleDrawer={toggleDrawer} />
      <LandingMenu
        menu={menu}
        toggleDrawer={toggleDrawer}
        menus={menus}
        modal={modal}
        toggleModal={toggleModal}
        aboutUs={aboutUs}
        contactUs={contactUs}
      />
      <Banner />
      <BibleIndex />
      <LandingAboutUs aboutUs={aboutUs} />
      <LandingFooter {...footerData} toggleModal={toggleModal} />
    </Grid>
  );
};
export default Landing;

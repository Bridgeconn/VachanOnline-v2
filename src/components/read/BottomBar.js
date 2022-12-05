import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "./MenuItem";
import * as views from "../../store/views";

const BottomBar = (props) => {
  return (
    <AppBar position="fixed" color="inherit" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <div className="bottomBar">
          <MenuItem
            icon="import_contacts"
            title="Parallel Bible"
            item={views.PARALLELBIBLE}
          />
        </div>
        <div className="bottomBar">
          <MenuItem
            icon="comment"
            title="Commentaries"
            item={views.COMMENTARY}
          />
        </div>
        <div className="bottomBar">
          <MenuItem icon="search" title="Search Bible" item={views.SEARCH} />
        </div>
        <div className="bottomBar">
          <MenuItem
            icon="event"
            title="Reading Plans"
            item={views.READINGPLANS}
          />
        </div>
        <div className="bottomBar">
          <MenuItem icon="more_vert" title="Drawer" />
        </div>
      </Toolbar>
    </AppBar>
  );
};
export default BottomBar;

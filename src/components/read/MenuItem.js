import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { connect } from "react-redux";
import { BLACK, GREY, WHITE } from "../../store/colorCode";
import * as views from "../../store/views";
import { SETVALUE } from "../../store/actions";
import { styled } from "@mui/system";
import { Box } from "@mui/material";
const I = styled("i")(({ theme }) => ({
  [`&.material-icons`]: {
    fontSize: "36px",
    [theme.breakpoints.down("md")]: {
      fontSize: "28px",
    },
  },
}));
const MenuItem = (props) => {
  const { icon, title, item, mobileView, parallelView, uid, setValue, base } =
    props;
  const [popover, setPopover] = React.useState(null);

  function handlePopoverOpen(event) {
    setPopover(event.currentTarget);
  }

  function handlePopoverClose() {
    setPopover(null);
  }
  //Function to handle menu click
  const onClick = (view, uid) => {
    //if user not logged in then open sign in popup for personalized features
    if (
      [views.NOTE, views.BOOKMARK, views.HIGHLIGHT].includes(view) &&
      uid === null
    ) {
      setValue("openLogin", true);
      return;
    }
    //if closing commentary then reset selected commentary
    if (parallelView === view && view === views.COMMENTARY) {
      setValue("commentary", {});
    }
    setValue("parallelView", parallelView === view ? "" : view);
  };
  const open = Boolean(popover);
  return (
    <ListItem
      sx={{
        backgroundColor: {
          lg: WHITE,
          xs:
            base === "drawer" && parallelView === item
              ? "rgba(0,0,0,0.1)"
              : WHITE,
        },
        cursor: "pointer",
        paddingTop: { lg: 1.375, xs: base === "drawer" ? 1 : 0.5 },
        paddingRight: { lg: 0, xs: base === "drawer" ? 1.25 : 0.875 },
        paddingBottom: { lg: 0.625, xs: base === "drawer" ? 1 : 0 },
        paddingLeft: { lg: 1.625, xs: base === "drawer" ? 2.5 : 0.875 },
        "&:hover": {
          backgroundColor:
            parallelView === item
              ? { lg: "tranparent", xs: "transparent" }
              : { lg: "tranparent", xs: "rgba(0,0,0,0.1)" },
        },
        boxShadow: parallelView === item ? "inset 1px 0px 3px 1px " + GREY : 0,
      }}
    >
      <ListItemIcon
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        variant="outlined"
        sx={{ minWidth: 44, color: BLACK }}
      >
        <Box
          onClick={() => onClick(item, uid)}
          sx={{
            display: base === "drawer" ? "flex" : "block",
            alignItems: base === "drawer" ? "center" : "flext-start",
            textAlign: base === "bottom" ? "center" : "left",
          }}
        >
          <I className="material-icons" title={title}>
            {icon}
          </I>
          {base === "bottom" || base === "drawer" ? (
            <Typography
              sx={{
                color: "#000",
                fontSize: base === "drawer" ? "1rem" : "0.65rem",
                paddingX: base === "drawer" ? 0 : 0.625,
                paddingY: base === "drawer" ? 0 : 0,
                marginX: base === "drawer" ? 1.875 : 0,
                marginY: base === "drawer" ? 0.625 : 0,
                textTransform: base === "drawer" ? "capitalize" : "capitalize",
              }}
            >
              {title}
            </Typography>
          ) : null}
          {mobileView ? null : (
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: "none",
                marginTop: -0.75,
                marginLeft: -1.25,
                [`.MuiPopover-paper`]: {
                  paddingX: 1.875,
                  paddingY: 1.25,
                  backgroundColor: WHITE,
                },
              }}
              open={open}
              anchorEl={popover}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <Typography sx={{ fontSize: "18px", color: BLACK }}>
                {title}
              </Typography>
            </Popover>
          )}
        </Box>
      </ListItemIcon>
    </ListItem>
  );
};
const mapStateToProps = (state) => {
  return {
    parallelView: state.local.parallelView,
    uid: state.local.userDetails.uid,
    mobileView: state.local.mobileView,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setValue: (name, value) =>
      dispatch({ type: SETVALUE, name: name, value: value }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);

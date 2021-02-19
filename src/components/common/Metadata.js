import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import { BLUETRANSPARENT } from "../../store/colorCode";

const useStyles = makeStyles((theme) => ({
  info: {
    padding: 0,
    width: "30px",
    marginTop: 20,
    marginRight: 4,
    color: BLUETRANSPARENT,
    cursor: "pointer",
  },
  paper: {
    width: "40%",
    minWidth: 550,
    [theme.breakpoints.only("xs")]: {
      width: "95%",
      minWidth: "unset",
    },
  },
  metadataTitle: {
    fontSize: "1.3em",
    padding: "11px 0 0 12px",
  },
  metadataTitleBar: {
    backgroundColor: BLUETRANSPARENT,
    color: "#fff",
  },
  metadataHeading: {
    fontSize: 17,
    lineHeight: "28px",
    display: "block",
    paddingLeft: 5,
    fontWeight: 600,
  },
  metadataText: {
    lineHeight: "28px",
    fontSize: 16,
    paddingLeft: 14,
  },
  metadataRow: {
    "&:last-child": {
      marginBottom: 2,
    },
    "&:nth-child(even)": {
      backgroundColor: "#eaeaea",
    },
  },
  closeButton: {
    color: "inherit",
  },
}));
export default function Metadata({ metadataList, title, abbreviation }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  //metadata information popup
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const checkLink = (text) => {
    return text.startsWith("http") ? (
      <Link href={text} key={text} target="_blank">
        {text + " "}
      </Link>
    ) : (
      text + " "
    );
  };
  return (
    <>
      {metadataList ? (
        <>
          <Tooltip title="Information">
            <div
              aria-describedby={id}
              onClick={handleClick}
              className={classes.info}
            >
              <i className="material-icons md-23">info_outline</i>
            </div>
          </Tooltip>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            classes={{
              paper: classes.paper,
            }}
          >
            <Paper>
              <Grid
                justify="space-between" // Add it here :)
                container
                className={classes.metadataTitleBar}
              >
                <Grid item>
                  <Typography
                    type="title"
                    color="inherit"
                    className={classes.metadataTitle}
                  >
                    {metadataList[title] +
                      " (" +
                      metadataList[abbreviation] +
                      ")"}
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    className={classes.closeButton}
                    size="medium"
                    onClick={() => {
                      setAnchorEl(null);
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid container>
                {Object.keys(metadataList)
                  .sort()
                  .map((item, i) => {
                    return item.trim() !== "" &&
                      metadataList[item].trim() !== "" ? (
                      <Grid
                        container
                        item
                        xs={12}
                        key={i}
                        alignItems="flex-start"
                        justify="flex-end"
                        className={classes.metadataRow}
                      >
                        <Grid item xs={4} className={classes.metadataHeading}>
                          {item}:
                        </Grid>
                        <Grid item xs={8} className={classes.metadataText}>
                          {metadataList[item].split(" ").map(checkLink)}
                        </Grid>
                      </Grid>
                    ) : (
                      ""
                    );
                  })}
              </Grid>
            </Paper>
          </Popover>
        </>
      ) : (
        ""
      )}
    </>
  );
}

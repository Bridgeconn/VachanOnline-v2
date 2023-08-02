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
import { BLACK } from "../../store/colorCode";

const useStyles = makeStyles((theme) => ({
  info: {
    padding: 0,
    width: "30px",
    marginTop: 20,
    marginRight: 4,
    color: BLACK,
    cursor: "pointer",
  },
  paper: {
    width: "40%",
    minWidth: 550,
    [theme.breakpoints.down("sm")]: {
      width: "95%",
      minWidth: "unset",
    },
  },
  metadataTitle: {
    fontSize: "1.3em",
    padding: "11px 0 0 12px",
  },
  metadataTitleBar: {
    boxShadow: theme.shadows[4],
    marginBottom: 4,
    color: BLACK,
  },
  metadataHeading: {
    fontSize: 17,
    lineHeight: "28px",
    display: "block",
    fontWeight: 600,
  },
  metadataText: {
    lineHeight: "28px",
    fontSize: 16,
    paddingLeft: 14,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 5,
    },
  },
  metadataRow: {
    paddingLeft: 5,
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
  metaDataBox: {
    [theme.breakpoints.down("sm")]: {
      height: "80vh",
      overflow: "scroll",
    },
  },
}));
export default function Metadata({
  metadataList,
  title,
  abbreviation,
  mobileView,
}) {
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
                justifyContent="space-between" // Add it here :)
                container
                className={classes.metadataTitleBar}
              >
                <Grid item>
                  <Typography
                    type="title"
                    color="inherit"
                    className={classes.metadataTitle}
                  >
                    {mobileView
                      ? metadataList[abbreviation]
                      : metadataList[title] +
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
              <Grid container className={classes.metaDataBox}>
                {Object.keys(metadataList)
                  .sort()
                  .map((item, i) => {
                    const ignoredKeys = ["baseUrl", "Latest", "VerseLabel"];
                    if (ignoredKeys.includes(item)) {
                      return null;
                    } else {
                      return item.trim() !== "" &&
                        metadataList[item].trim() !== "" ? (
                        <Grid
                          container
                          item
                          xs={12}
                          key={i}
                          alignItems="flex-start"
                          className={classes.metadataRow}
                        >
                          <Grid item md={4} className={classes.metadataHeading}>
                            {item} :
                          </Grid>
                          <Grid item md={8} className={classes.metadataText}>
                            {metadataList[item].split(" ").map(checkLink)}
                          </Grid>
                        </Grid>
                      ) : (
                        ""
                      );
                    }
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

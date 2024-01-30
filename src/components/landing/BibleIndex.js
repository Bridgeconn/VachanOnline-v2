import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import BookCombo from "../common/BookCombo";
import Version from "../common/Version";
import BigTooltip from "../common/BigTooltip";
import { BLACK, GREY, WHITE } from "../../store/colorCode";
import { useTranslation } from "react-i18next";
import { Dialog, Grid } from "@material-ui/core";
import WhatsNew from "./WhatsNew";
import FeaturesList from "./FeaturesList";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    marginBottom: -50,
    [theme.breakpoints.down("xs")]: {
      marginBottom: -10,
    },
  },
  bibleIndex: {
    margin: "auto",
    position: "relative",
    bottom: 70,
    height: "auto",
    padding: "15px 30px",
    backgroundColor: WHITE,
    [theme.breakpoints.down("xs")]: {
      bottom: 25,
      width: "100%",
    },
  },
  button: {
    margin: theme.spacing(1.5),
    backgroundColor: "#fff",
    boxShadow: "1px 1px 1px 1px " + GREY,
    height: "42px",
    "& hover": {
      textDecoration: "none",
    },
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      width: "60%",
      marginTop: 0,
      marginBottom: 2,
    },
    [theme.breakpoints.only("sm")]: {
      margin: theme.spacing(1.5),
    },
  },
  heading: {
    color: BLACK,
    textAlign: "center",
    fontSize: 20,
    paddingTop: 10,
  },
  readContainer: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      whiteSpace: "nowrap",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  landingButton: {
    textTransform: "capitalize",
    width: "100%",
  },
}));

const BibleIndex = (props) => {
  const classes = useStyles();
  const { panel1, setValue, versionBooks, versionSource } = props;
  const [whatsNewOpen, setWhatsNewOpen] = React.useState(false);
  const [featuresOpen, setFeaturesOpen] = React.useState(false);
  const { version, book, bookCode, sourceId, chapter, verseData, language } =
    panel1;

  const { t } = useTranslation();
  const openWhatsNew = () => {
    setWhatsNewOpen(true);
  };

  const whatsNewClose = () => {
    setWhatsNewOpen(false);
  };
  const openFeatures = () => {
    setFeaturesOpen(true);
  };

  const featuresClose = () => {
    setFeaturesOpen(false);
  };
  return (
    <>
      <div className={classes.container}>
        <Paper className={classes.bibleIndex} elevation={3}>
          <Typography variant="h5" gutterBottom className={classes.heading}>
            {t("landingSelectBibleHeading")}
          </Typography>
          <div className={classes.readContainer}>
            <Version
              setValue={props.setValue}
              version={version}
              landingPage={true}
              bookCode={bookCode}
              chapter={chapter}
              verseData={verseData}
              language={language}
            />
            {bookCode !== "" && bookCode !== undefined ? (
              <BookCombo
                book={book}
                bookCode={bookCode}
                bookList={versionBooks[versionSource[sourceId]]}
                chapter={chapter}
                setValue={setValue}
                minimal={false}
                landingPage={true}
              />
            ) : (
              ""
            )}
            <Link
              to={{
                pathname: "/study",
              }}
            >
              <BigTooltip title={t("landingStartBtnToolTip")}>
                <Button variant="contained" className={classes.button}>
                  {t("landingStartBtn")}
                </Button>
              </BigTooltip>
            </Link>
          </div>
        </Paper>
      </div>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ width: "100%", marginTop: -23 }}
      >
        <Grid item>
          <Button
            variant="outlined"
            size="medium"
            color="default"
            className={classes.landingButton}
            onClick={openWhatsNew}
          >
            {t("WhatsNew")}
          </Button>
        </Grid>
        <Grid item style={{ marginLeft: 10 }}>
          <Button
            variant="outlined"
            size="medium"
            color="default"
            className={classes.landingButton}
            onClick={openFeatures}
          >
            {t("featuresList")}
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={whatsNewOpen}
        onClose={whatsNewClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth={true}
        maxWidth="md"
      >
        <WhatsNew handleClose={whatsNewClose} />
      </Dialog>
      <Dialog
        open={featuresOpen}
        onClose={featuresClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth={true}
        maxWidth="md"
      >
        <FeaturesList handleClose={featuresClose} />
      </Dialog>
      {/* <Button variant="outlined" className={classes.landingButton1}>
          What's New
        </Button>
        <Button variant="outlined" className={classes.landingButton2}>
          Features List
        </Button> */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    panel1: state.local.panel1,
    versionBooks: state.local.versionBooks,
    versionSource: state.local.versionSource,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setValue: (name, value) =>
      dispatch({ type: actions.SETVALUE1, name: name, value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BibleIndex);

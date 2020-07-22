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
import { BLUE } from "../../store/colorCode";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    marginBottom: -30,
  },
  bibleIndex: {
    margin: "auto",
    position: "relative",
    bottom: 70,
    height: "auto",
    padding: "15px 30px",
    boxShadow: "2px 2px 3px #968e8e",
    backgroundColor: BLUE,
    [theme.breakpoints.down("xs")]: {
      bottom: 25,
      width: "100%",
    },
  },
  button: {
    margin: theme.spacing(1.5),
    backgroundColor: "#fff",
    border: "1px solid #fff",
    "& hover": {
      textDecoration: "none",
    },
    [theme.breakpoints.only("xs")]: {
      marginLeft: "20%",
      width: "60%",
      marginTop: 0,
    },
  },
  heading: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    paddingTop: 10,
  },
}));

const BibleIndex = (props) => {
  let label = "Read";
  const classes = useStyles();
  const { panel1, setValue, versionBooks, versionSource } = props;
  const { version, book, bookCode, sourceId, chapter } = panel1;
  return (
    <div className={classes.container}>
      <Paper className={classes.bibleIndex}>
        <Typography variant="h5" gutterBottom className={classes.heading}>
          Read Bible
        </Typography>
        <Version
          setValue={props.setValue}
          version={version}
          landingPage={true}
        />
        {bookCode !== "" && bookCode !== undefined ? (
          <BookCombo
            book={book}
            bookCode={bookCode}
            bookList={versionBooks[versionSource[sourceId]]}
            chapter={chapter}
            setValue={setValue}
            minimal={false}
            sourceId={sourceId}
            landingPage={true}
          />
        ) : (
          ""
        )}
        <Link
          to={{
            pathname: "/read",
            // hash: "#book",
            // search: "?search=term",
          }}
        >
          <Button variant="contained" className={classes.button}>
            {" "}
            {label}
          </Button>
        </Link>
      </Paper>
    </div>
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

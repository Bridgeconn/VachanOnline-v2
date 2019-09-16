import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import Notes from './Notes';
import Highlights from './Highlights';
import Bookmarks from './Bookmarks';
import History from './History';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: 100,
        paddingLeft: 15,

    },
    title: {

        paddingBottom: 0,
        marginBottom: 5,
        borderBottom: "1px solid #f1ecec",
        display: "flex",
    },
    tab: {
        width: "90px",
        minWidth: "91px",
        marginRight: 3,
        textTransform: "none",
        borderRight: "1px solid #ccc",
        "&:last-child": {
            border: "none"
        }

    },
}));
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={1}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function MyContent() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    function handleChange(event, newValue) {
        setValue(newValue);
    }
    return (

        <div className={classes.root}>
            <Typography variant="h6" className={classes.title} >My Content</Typography>

            <AppBar position="static" color="default">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" indicatorColor="secondary"
                    textColor="secondary">
                    <Tab label="Notes(3)" {...a11yProps(0)} className={classes.tab} />
                    <Tab label="Highlights(4)" {...a11yProps(1)} className={classes.tab} />
                    <Tab label="Bookmarks(2)" {...a11yProps(2)} className={classes.tab} />
                    <Tab label="History" {...a11yProps(3)} className={classes.tab} />
                </Tabs></AppBar>
            <TabPanel value={value} index={0}>
                <Notes />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Highlights />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Bookmarks />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <History />
            </TabPanel>

        </div>



    );
}

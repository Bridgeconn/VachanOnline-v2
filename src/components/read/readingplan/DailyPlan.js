import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
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
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        padding: 0
    },
    tab: {
        width: "60px",
        minWidth: "60px",
        marginRight: 7,
        textTransform: "none",
        border: "1px solid #ccc",

    },
}));

export default function DailyPlan() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab label="Day 1" {...a11yProps(0)} className={classes.tab} />
                    <Tab label="Day 2" {...a11yProps(1)} className={classes.tab} />
                    <Tab label="Day 3" {...a11yProps(2)} className={classes.tab} />
                    <Tab label="Day 4" {...a11yProps(3)} className={classes.tab} />
                    <Tab label="Day 5" {...a11yProps(4)} className={classes.tab} />
                    <Tab label="Day 6" {...a11yProps(5)} className={classes.tab} />
                    <Tab label="Day 7" {...a11yProps(6)} className={classes.tab} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} >
                <p> Isaiah 1:1-9</p>
                <p> Isaiah 1:10-20</p>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <p>Isaiah 1:21-31</p>
                <p>Isaiah 2:1-4</p>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <p> Isaiah 2:1-41</p>
                <p>Isaiah 2:22-4:1</p>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <p>Isaiah 4:2-6</p>
                <p>Isaiah  5:1-7</p>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <p>Isaiah 5:8-30</p>
                <p>Isaiah 6:1-13</p>
            </TabPanel>
            <TabPanel value={value} index={5}>
                <p>Isaiah 1:21-31</p>
                <p>Isaiah 6:1-13</p>
            </TabPanel>
            <TabPanel value={value} index={6}>
                <p>Isaiah 1:21-31</p>
                <p>Isaiah 2:1-4</p>
            </TabPanel>
        </div>
    );
}

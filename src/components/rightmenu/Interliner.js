import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: 100,
        paddingLeft: 15,

    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    titles: {
        paddingLeft: 2,
        paddingBottom: 0,
        marginBottom: 5,
        borderBottom: "1px solid #f1ecec",
        display: "flex",
        width: "100%",
        color: "red"
    },
    title: {
        paddingLeft: 25,
        paddingBottom: 2,
        marginBottom: 20,
        borderBottom: "1px solid #f1ecec",
        display: "flex",
        width: "100%"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    card: {
        minWidth: 120,
        width: 120,
        display: "inline-block",
        marginRight: 6,
        marginTop: 10
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },

    pos: {
        marginBottom: 0,
        color: "blue"
    },
}));

export default function Interliner() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        age: '',

    });

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    function handleChange(event) {
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
    }

    return (
        <>
            <form className={classes.root} autoComplete="off">
                <Typography variant="h6" className={classes.title} >Commentries</Typography>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-simple">Age</InputLabel>
                    <Select
                        value={values.age}
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                        Age
        </InputLabel>
                    <Select
                        value={values.age}
                        onChange={handleChange}
                        labelWidth={labelWidth}
                        inputProps={{
                            name: 'age',

                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </form>


            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.titles} color="textSecondary" gutterBottom>
                        Bible
        </Typography>
                    <Typography className={classes.title1} component="h6">
                        Jesus
        </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        G1240
        </Typography>
                    <Typography color="textSecondary">
                        adjective
        </Typography>
                </CardContent>

            </Card>

            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.titles} color="textSecondary" gutterBottom>
                        Bible
        </Typography>
                    <Typography className={classes.title1} component="h6">
                        Jesus
        </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        G1240
        </Typography>
                    <Typography color="textSecondary">
                        adjective
        </Typography>
                </CardContent>

            </Card>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.titles} color="textSecondary" gutterBottom>
                        Bible
        </Typography>
                    <Typography className={classes.title1} component="h6">
                        Jesus
        </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        G1240
        </Typography>
                    <Typography color="textSecondary">
                        adjective
        </Typography>
                </CardContent>

            </Card>
        </>

    );
}

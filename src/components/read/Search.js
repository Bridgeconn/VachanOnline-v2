import React from 'react'
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';


const useStyles = makeStyles(theme => ({
    bible: {
        top: 100,
        position: "absolute",
        width: "100%"

    },
    title: {
        paddingLeft: 25,
        paddingBottom: 2,
        borderBottom: "1px solid #f1ecec",
        display: "flex",
        width: "100%"
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        border: "1px solid #ddd",
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(0),
            width: 'auto',
        },
    },
    grow: {
        width: "100%",
        display: "inline-block",
        borderBottom: "1px solid #ddd"
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 2),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 320,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    formControl: {
        marginLeft: 32,
        marginTop: 12,
        minWidth: 350,
        maxWidth: 350,
    },
    formControl1: {
        marginLeft: 32,
        marginTop: 35,
        minWidth: 350,
        maxWidth: 350,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
    result: {
        width: "100%",
        marginTop: 10,
        "& p": {
            marginLeft: 32
        },
    },
    icon: {
        display: "inline-block",
        right: 0

    }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Bible',
    'Commentary',
    'Interlinear',
    'Articles',
    'Dictionary',

];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
export default function Search() {
    const classes = useStyles();
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
    function handleChange(event) {
        setPersonName(event.target.value);
    }
    const [values, setValues] = React.useState({
        predefinedvalues: '',

    });

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    function handleChange1(event) {
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
    }
    const [state, setState] = React.useState({
        open: false,
        age: '',
    });
    const handleChange2 = name => event => {
        setState({ ...state, [name]: Number(event.target.value) });
    };
    const handleChange3 = name => event => {
        setState({ ...state, [name]: Number(event.target.value) });
    };



    return (
        <div className={classes.bible}>

            <Typography variant="h6" className={classes.title} >Search</Typography>

            {/* ...............Search 1................ */}
            <div className={classes.grow}>
                <Toolbar>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                </Toolbar>
                <div className={classes.result}>
                    <p>उस जीवन के वचन के विषय में जो आदि से था, जिसे हमने सुना, और जिसे अपनी आँखों से देखा, वरन् जिसे हमने ध्यान से देखा और हाथों से छुआ।</p></div>
            </div>
            {/* ...............Search 1................ */}
            {/* ...............Search 2................ */}

            <FormControl className={classes.formControl}>
                <p>Search In- Select Multiple</p>

                <Select
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={selected => (
                        <div className={classes.chips}>
                            {selected.map(value => (
                                <Chip key={value} label={value} className={classes.chip} />
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >
                    {names.map(name => (
                        <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                            {name}
                        </MenuItem>
                    ))}

                </Select>

            </FormControl>
            {/* <div className={classes.icon}><i className="material-icons"> arrow_forward_ios</i></div> */}


            {/* ...............close Search 2................ */}
            {/* ...............Search 3................ */}
            <FormControl variant="outlined" className={classes.formControl1} autoComplete="off">
                <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                    Search Predefined List
                       </InputLabel>
                <Select
                    value={values.age}
                    onChange={handleChange1}
                    input={<OutlinedInput labelWidth={labelWidth} name="age" id="outlined-age-simple" />}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Whole Bible</MenuItem>
                    <MenuItem value={20}>New Testement</MenuItem>
                    <MenuItem value={30}>Old Testement</MenuItem>
                </Select>

            </FormControl>

            {/* ...............close Search 3................ */}

            {/* ...............close Search 4................ */}
            <FormControl className={classes.formControl} autoComplete="off">
                <div>Select a range of biblical books</div>
                <InputLabel htmlFor="from">From</InputLabel>
                <Select
                    native
                    value={state.age}
                    onChange={handleChange2('age')}
                    input={<Input id="from" />}
                >
                    <option value="" />
                    <option value={10}>Mathew</option>
                    <option value={20}>Mark</option>
                    <option value={30}>Luke</option>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl} autoComplete="off">

                <InputLabel htmlFor="to">To</InputLabel>
                <Select
                    native
                    value={state.age}
                    onChange={handleChange3('age')}
                    input={<Input id="to" />}
                >
                    <option value="" />
                    <option value={10}>Mathew</option>
                    <option value={20}>Mark</option>
                    <option value={30}>Luke</option>
                </Select>
            </FormControl>


            {/* ...............close Search 4................ */}


        </div>
    );
}

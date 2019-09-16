import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
export default function History() {
    return (
        <div>
            <FormControlLabel control={<Checkbox value="checkedC" />} label="Mathew 2:1" />
            <DeleteIcon style={{ float: "right", marginTop: 8 }} />
        </div>
    )
}

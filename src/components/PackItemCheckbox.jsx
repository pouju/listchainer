import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Typography } from '@material-ui/core';


const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);




const PackItem = ({ packs }) => {
    const [packed, setPack] = React.useState(false)
    
    return (
        <>
            <Typography color='textSecondary'>
                {packed ? packs + 1 : packs } packed this item
            </Typography>
            <FormControlLabel 
                control={<GreenCheckbox checked={packed.checked} onChange={() => setPack(!packed)} name="packed" />}
                label="Pack"
            />
        </>
    )
}

export default PackItem


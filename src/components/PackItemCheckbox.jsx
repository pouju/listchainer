import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);




const PackItem = () => {
    const [state, setState] = React.useState({
        packed: false,
    });
    
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    
    return (
        <FormControlLabel
            control={<GreenCheckbox checked={state.packed} onChange={handleChange} name="packed" />}
            label="Pack"
        />
    )
    
}

export default PackItem


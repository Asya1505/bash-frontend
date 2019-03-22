import React, {Component} from 'react'
import Messages from '../Messages'
import RightMenu from '../RightMenu'
import Grid from '@material-ui/core/Grid';

class Main extends Component{

    render(){
        return(
        <Grid container
            // spacing={40}
            direction="row"
            justify="center"
            alignItems="flex-start">
            <Grid item xs={6}>
                <Messages />
            </Grid>    
            <Grid item xs={2}>
                <RightMenu/>            
            </Grid>    
        </Grid>
        );
    }
}

export default Main;
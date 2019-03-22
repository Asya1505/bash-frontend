import React, {Component, Fragment} from 'react'
import { Route} from 'react-router-dom'
import AddMessage from '../AddMessage'
import Main from '../Main'


class AppRouter extends Component{
    render(){
        return (
            <Fragment >
                <Route path="/" component={Main} exact/>
                <Route path="/add" component={AddMessage} exact/>
            </Fragment>);
    }
}

export default AppRouter;
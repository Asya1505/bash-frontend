import React, {Component, Fragment} from 'react'
import  {connect} from 'react-redux'
import {getIsLoadingMessages, getMessages, getError} from '../../selectors/selectors';
import { showRequest } from '../../actions/actions'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider';
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";

const theme = createMuiTheme();

class Messages extends Component{

    constructor(props) {
        super(props);
        const { showRequest } = this.props;
        showRequest([0,'']);
    }

    handleClick = (offset, sort) => {
        this.setState({ offset });
        const { showRequest } = this.props;
        showRequest([offset, sort]);
    }

    render(){
        const { isLoading, error, messages} = this.props;
            
        if (isLoading) return <p>Идет загрузка...</p>;
        if (error) return <p>Произошла ошибка</p>;

        return (
            <div className=""> 
                {messages.content ?
                (<div><List>
                    {messages.content.map(messages => (
                        <Fragment  key={messages.id}>
                            <ListItem>
                                <ListItemText
                                primary={messages.creationDate +"  "+ messages.authorName}
                                secondary={messages.text}
                                />
                            </ListItem>
                            <Divider />
                        </Fragment>
                    ))}                    
                </List>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <Pagination
                    offset={messages.number}
                    total={messages.totalPages}
                    nextPageLabel={`ВПЕРЕД >`}
                    previousPageLabel={`< НАЗАД`}
                    currentPageColor={`inherit`}
                    onClick={(e, offset) => this.handleClick(offset, messages.sort)}
                    />
                </MuiThemeProvider></div>)
                : 
                <p>Записей пока нет</p>}
            </div>);
    }
}

const mapStateToProps = state => ({
    messages: getMessages(state),
    isLoading: getIsLoadingMessages(state),
    error: getError(state),
});

const mapDispatchToProps = { showRequest };
  
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Messages);
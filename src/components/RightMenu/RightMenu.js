import React, {Component, Fragment} from 'react'
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';
import { showRequest} from '../../actions/actions'
import  {connect} from 'react-redux'


class RightMenu extends Component{

    buttonClick = () => {
        const { showRequest } = this.props;
        showRequest([0,"creationDate"]);
    }

    render(){
        return(
            <Fragment>
            <p><Button                         
                    onClick= {this.buttonClick}
            >Сортировка по: Дате
            </Button>
            </p><p>
            <Link component={RouterLink} to="/add">
                + Добавить цитату
            </Link>
            </p>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({    
});

const mapDispatchToProps = { showRequest };
  
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RightMenu);
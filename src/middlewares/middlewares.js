import { showRequest, showSuccess, showFailure} from '../actions/actions'
import {show} from '../api'

export const showMiddleware = store => next => action => {
    if (action.type === showRequest.toString()) {
      show(action.payload[0],action.payload[1])
        .then(shows => {
          store.dispatch(showSuccess(shows));
        })
        .catch(error => {
          store.dispatch(showFailure(error));
        });
    }    
    return next(action);
};
  
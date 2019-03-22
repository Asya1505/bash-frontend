import { createSelector } from 'reselect';

export const getIsLoadingMessages = state => state.show.isLoading;
export const getError = state => state.show.error;
export const getMessages = createSelector(
    state => state.show.elements,
    elements => {
        return elements;
    }    
);

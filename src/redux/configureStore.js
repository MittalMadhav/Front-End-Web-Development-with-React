import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createForms} from 'react-redux-form';
import { reducerDishes } from './reducerDishes';
import { reducerComments } from './reducerComments';
import { reducerPromotions } from './reducerPromotions';
import { reducerLeaders } from './reducerLeaders';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {InitialFeedback} from './forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: reducerDishes,
            comments: reducerComments,
            promotions: reducerPromotions,
            leaders: reducerLeaders,
            ...createForms({
                feedback: InitialFeedback 
            })
        }),
        applyMiddleware(thunk,logger)
    );

    return store;
}
import {createStore, combineReducers, applyMiddleware} from 'redux';
import { reducerDishes } from './reducerDishes';
import { reducerComments } from './reducerComments';
import { reducerPromotions } from './reducerPromotions';
import { reducerLeaders } from './reducerLeaders';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: reducerDishes,
            comments: reducerComments,
            promotions: reducerPromotions,
            leaders: reducerLeaders
        }),
        applyMiddleware(thunk,logger)
    );

    return store;
}
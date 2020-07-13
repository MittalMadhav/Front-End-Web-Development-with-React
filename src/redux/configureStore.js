import {createStore, combineReducers} from 'redux';
import { reducerDishes } from './reducerDishes';
import { reducerComments } from './reducerComments';
import { reducerPromotions } from './reducerPromotions';
import { reducerLeaders } from './reducerLeaders';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: reducerDishes,
            comments: reducerComments,
            promotions: reducerPromotions,
            leaders: reducerLeaders
        })
    );

    return store;
}
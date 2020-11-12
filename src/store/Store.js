import { createStore, applyMiddleware } from 'redux';
import {reducer} from '@/reducer/Reducer';

// middleware可以自己定义，例如下面的logger
const logger = store => next => action => {
     // what you do before action, 
         // example: logger. console.log("dispatching", action);
     let result = next(action);
         // what you can do after action    
     //console.log('next state', store.getState());
     return result;
}

export default applyMiddleware(logger)(createStore)(reducer);


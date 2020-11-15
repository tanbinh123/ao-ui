import { createStore, applyMiddleware } from 'redux';
import {reducer} from '@/reducer/Reducer';
import thunk from 'redux-thunk';

// middleware可以自己定义，例如下面的logger
// const logger = store => next => action => {
//      // what you do before action, 
//          // example: logger. console.log("dispatching", action);
//      let result = next(action);
//          // what you can do after action    
//      //console.log('next state', store.getState());
//      return result;
// }

// 设置调试工具
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
// 设置中间件
// const enhancer = composeEnhancers(
//   applyMiddleware(thunk)
// );



export default applyMiddleware(thunk)(createStore)(reducer);


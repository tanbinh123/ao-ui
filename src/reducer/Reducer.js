// import * as actions from '@/action/Actions';
import * as actionType from '@/action/ActionType';
import { combineReducers } from 'redux'
// import * as reducers from './reducers'  // 会导出reducers文件中所有export的内容

import {postsLogin, userInfo, menus} from '@/reducer/LoginReducer';

const initialState = {
  todos: "todo list"
};

export function todoApp(state, action) {
    if (typeof state === 'undefined') {
      return initialState
    }

    switch(action.type) {
        case actionType.ADD_TODO:
          return Object.assign({}, state, {
            visibilityFilter: action.filter
          })
        default:
          return state
    }
  }

export const reducer = combineReducers({
    todoApp,
    postsLogin,
    userInfo,
    menus
  });
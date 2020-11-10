import * as actions from '../action/Actions';

const initialState = {
  todos: "todo list"
};

export default function todoApp(state, action) {
    if (typeof state === 'undefined') {
      return initialState
    }

    switch(action.type) {
        case actions.ADD_TODO:
        return {
            ...state,
            todos: action.text
        }
        default:
          return state
    }
  }
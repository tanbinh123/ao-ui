import {ADD_TODO, LOGIN} from './ActionType';

// action 创建函数
export function addTodo(text) {
    return {
      type: ADD_TODO,
      text: text
    }
}
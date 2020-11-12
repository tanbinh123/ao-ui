import {ADD_TODO, LOGIN} from './ActionType';

export function login(user) {
    console.log("user: ", user);
    return {
      type: LOGIN,
      user: user
    }
}
import * as actionType from './ActionType';
import {login, getInfo} from '@/service/login';
import {setToken} from '@/utils/auth';

// export function LoginAction(user) {
//   return {
//     type: actionType.SET_USER_INFO,
//     user: user
//   }
// }

export function fetchBeforeAction() {
  return {
    type: actionType.FETCH_POSTS_REQUEST
  }
}

export function fetchSuccessAction(user) {
  return {
    type: actionType.FETCH_POSTS_SUCCESS,
    user: user
  }
}

export function fetchFailureAction(error) {
  return {
    type: actionType.FETCH_POSTS_FAILURE,
    error: error
  }
}

export function toLogin(user) {
    console.log("toLogin user: ", user);
    return (dispatch) => {
      dispatch(fetchBeforeAction());
      return login(user.username, user.password, user.code, user.uuid).then(res => {
        // dispatch(LoginAction(res));
        console.log("login action res: ", res);
        setToken(res.token, user.rememberMe);
        dispatch(fetchSuccessAction(res.user));
        // dispatch(getUserInfo())
        return res;
      },
      error => {
        dispatch(fetchFailureAction(error));
        return error;
      }
      );
    }
}

function setUserInfo(user, roles) {
  return {
    type: actionType.SET_USER_INFO,
    user: user,
    roles: roles
  }
}


export function getUserInfo() {
  return (dispatch) => {
    return getInfo().then(res=> {
      dispatch(setUserInfo(res.user, res.roles));
      return res;
    }, error => {
      return error;
    })
  }
}
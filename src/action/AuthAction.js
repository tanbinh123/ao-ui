import * as actionType from './ActionType';
import {login, getInfo, logout} from '@/service/login';
import {buildMenus} from '@/service/system/menu';
import {setToken, removeToken} from '@/utils/auth';
import menu from '../service/system/menu';
import { menus } from '../reducer/LoginReducer';
import { remove } from 'js-cookie';

export function fetchBeforeAction() {
  return {
    type: actionType.FETCH_POSTS_REQUEST
  }
}

export function fetchSuccessAction(user, menus) {
  return {
    type: actionType.FETCH_POSTS_SUCCESS,
    user: user,
    menus: menus

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
      return login(user.username, user.password, user.code, user.uuid).then(async res => {
        setToken(res.token, user.rememberMe);
        const menus = await buildMenus();
        dispatch(fetchSuccessAction(res.user, menus));
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

// 获取用户信息
export function getUserInfo() {
  return (dispatch) => {
    return getInfo().then(async res=> {
      const menus = await buildMenus();
      dispatch(fetchSuccessAction(res, menus))
      return res;
    }, error => {
      return error;
    })
  }
}

function setMenus(menus) {
  return {
    type: actionType.SET_MENUS,
    menus: menus,
  }
}

export function loadMenus() {
  return (dispatch) => {
    return buildMenus().then(res => {
      console.log('loading menus : ', res);
      dispatch(setMenus(res))
    })
  }
}

export function clearUserInfo() {
  return {
    type: actionType.FETCH_POSTS_SUCCESS,
    user: {user: {}, roles: [], menus: []},
    menus: []
  }
}

export function Logout() {
  return dispatch => {
    return logout().then(res => {
      dispatch(clearUserInfo());
      removeToken();
      return res;
    });
  }
}
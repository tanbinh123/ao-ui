import React from 'react'



import { Redirect, Route } from "react-router-dom";
import { useAuth } from '@hooks/use-auth.js';

/**
 * 校验是否登录
 * @param permits
 */
export const checkLogin = (permits) =>
    (process.env.NODE_ENV === 'production' && !!permits) || process.env.NODE_ENV === 'development';

export function PrivateRoute({ children, authority, ...rest }) {
    console.log('PrivateRoute authority: ', authority);
    let auth = useAuth();  // 正式环境从登录用户中获取
    console.log("PrivateRoute auth : ", auth);
    // let auth = {roles : ["ROLE_USER", "ROLE_ADMIN"]};  // 测试
    let isAuth = true;

    // let auth = {roles : ["ROLE_USER_TEST"]};
    const authorities = authority && authority.length > 0 ? authority : ["ROLE_USER"];  // 访问路由所需的权限
    isAuth = auth.roles && auth.roles.length > 0 ? authorities.filter(ele => auth.roles.indexOf(ele) !== -1).length > 0 : false;

    return (
      <Route
        {...rest}
        render={({ location }) =>
        isAuth ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  /**
   * 
   * @param {*} authority  角色数组[]
   */ 
  export function Authority({children, authority, ...rest}) {
    let auth = useAuth();  // 正式环境从登录用户中获取
    console.log("Authority auth: ", auth);
    // let auth = {roles : ["ROLE_USER", "ROLE_ADMIN"]};  // 测试
    let isAuth = true;
    const authorities = authority && authority.length > 0 ? authority : ["ROLE_USER"];  // 访问路由所需的权限
    isAuth = auth.roles && auth.roles.length > 0 ? authorities.filter(ele => auth.roles.indexOf(ele) !== -1).length > 0 : false;

    return isAuth && children;
  }


import { Redirect, Route } from "react-router-dom";
import { useAuth } from '@hooks/use-auth.js';

/**
 * 校验是否登录
 * @param permits
 */
export const checkLogin = (permits) =>
    (process.env.NODE_ENV === 'production' && !!permits) || process.env.NODE_ENV === 'development';

// 获取登录用户的权限
export const getPermits = (auth) => {
    return auth ? auth.permissions : null;
};

// 当前用户是否有所需权限
export const requireAuth = (permit, component) => {
    const permits = getPermits();
    if (!permits || !permits.includes(permit)) return <Redirect to={'404'} />;
    return component;
};

export const requireLogin = (component, permit) => {
    const permits = getPermits();
    if (!checkLogin(permits)) {
        // 线上环境判断是否登录
        return <Redirect to={'/login'} />;
    }
    return permit ? requireAuth(permit, component) : component;
};

export function PrivateRoute({ children, authority, ...rest }) {
    console.log('PrivateRoute authority: ', authority);
    // let auth = useAuth();  // 正式环境从登录用户中获取
    let auth = {roles : ["ROLE_USER", "ROLE_ADMIN"]};  // 测试
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
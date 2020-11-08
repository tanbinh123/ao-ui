import React from 'react';

import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";

import routes from './config';
// import { ProvideAuth, useAuth } from '@hooks/use-auth.js';
// import RouteWrapper from './RouteWrapper';
import { PrivateRoute } from './permission';


export function createRoutes() {
    // let auth = useAuth();  // 登录信息
    // 后端请求返回的路由信息
    const smenus = [];
    return renderRouters(routes);
}

export function renderRouters(routes) {
    // let auth = useAuth();  // 登录信息
    return routes.map((route, key) => {
        // let isAuth = true;
        // if(route.auth) {
        //     let auth = {roles : ["ROLE_USER_TEST"]};
        //     const authority = route.authority && route.authority.length > 0 ? route.authority : ["ROLE_USER"];  // 访问路由所需的权限
        //     isAuth = auth.roles && auth.roles.length > 0 ? authority.filter(ele => auth.roles.indexOf(ele) !== -1).length > 0 : false;
        // }

        if (!route.routes || route.routes.length <= 0) {
            return route.auth ? (<PrivateRoute authority={route.authority} path={route.path} key={key} >
                <route.component />
            </PrivateRoute>) : (<Route
                key={key}
                path={route.path}
                component={() => {
                    return <route.component />;
                }
                }
            >
            </Route>);
        } else {
            return route.auth ? (

                <PrivateRoute authority={route.authority} path={route.path} key={key} >
                    <route.component> {renderRouters(route.routes)} </route.component>
                </PrivateRoute>

            ) : (
                    <Route
                        path={route.path}
                        key={key}
                        render={props =>
                            <route.component {...props}>
                                {
                                    renderRouters(route.routes)
                                }
                            </route.component>
                        }
                    >
                    </Route>
                );
        }
    })
}
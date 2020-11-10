import React from 'react';
import loadable from '@loadable/component'

import { Route } from "react-router-dom";

import routes from './config';
import { PrivateRoute } from './permission';

import icons from './icons';

// 将后端返回的菜单数组生成为路由数组
export function menusToRoutes(menus) {
    console.log('test route......')
    if(!menus) {
        menus = [
        ];
    } 
    menus = [
        {
            path: "/test",
            label: "test route",
            icon: "UserOutlined",
            hidden: false,
            auth: false,
            authority: [],
            component: "LoginLayout"
          },
    ];
    return menus.map(menu => {
        console.log('icons[menu.icon]: ', icons[menu.icon])
        const route = {
            path: menu.path,
            label: menu.label,
            auth: menu.auth ? menu.auth : false,
            authority: menu.authority ? menu.authority : [],
            icon: icons[menu.icon],
            hidden: menu.hidden,
            component: loadable(() => import("@/" + menu.component)),
            routes: menu.children && menu.children.length > 0 ? menusToRoutes(menu.children) : [] 
        }
        return route;
    })
}

export function mergeRoutes(menus) {
    const menuRoutes = menusToRoutes(menus);
    console.log('menuRoutes: ', menuRoutes);
    return routes.concat(menuRoutes);
}

export function allMenus() {
    return mergeRoutes([]);
}


export function createRoutes() {
    // 后端请求返回的路由信息
    const menus = [];

    const routeList = mergeRoutes(menus);
    console.log("routeList: ", routeList);

    // routes
    return renderRouters(routeList);
}

export function renderRouters(routes) {
    return routes.map((route, key) => {

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
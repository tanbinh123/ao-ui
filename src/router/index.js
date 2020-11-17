import React from 'react';
import loadable from '@loadable/component'

import { Route } from "react-router-dom";

import routes from './config';
import { PrivateRoute } from './permission';

import icons from './icons';
import store from '@/store/Store';

// 将后端返回的菜单数组生成为路由数组
export function menusToRoutes(menus) {
    console.log('test route......', menus)
    if(!menus) {
        menus = [
        ];
    }
    return menus.map(menu => {
        const route = {
            path: menu.path,
            label: menu.name,
            auth: menu.auth ? menu.auth : false,
            authority: menu.authority ? menu.authority : [],
            // icon: icons[menu.icon],    // 测试时注释
            hidden: menu.hidden,
            // component: loadable(() => import("@/" + menu.component)),   // 测试时注册
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

export function createRoutes() {
    // 后端请求返回的路由信息
    const menus = store.getState().postsLogin.menus;

    const routeList = mergeRoutes(menus);

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
            </Route>)
            ;
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
                )
                ;
        }
    })
}
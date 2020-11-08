import loadable from '@loadable/component'

const routes = [
    {
        path: "/login",
        name: "登录页面",
        hiden: false,
        auth: false,
        authority: [],
        component: loadable(() => import("@/layouts/LoginLayout"))
      },
      {
        path: "/user",
        auth: true,
        authority: ["ROLE_TEST", "ROLE_ADMIN"],
        component: loadable(() => import("@/layouts/AdminLayout")),
        routes: [
          {
            path: "/user/center",
            auth: true,
            authority: [],
            component: loadable(() => import("@/pages/UserCenter")),
          },
          {
            path: "/user/email",
            auth: false,
            authority: [],
            component: loadable(() => import("@/pages/UserEmail")),
          }
        ]
      }
];

export default routes
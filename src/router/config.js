import loadable from '@loadable/component'

/**
 * 
 * {
            path: '/app/ui',
            label: 'UI',
            icon: 'scan',
            children: [
                { path: '/app/ui/buttons', label: '按钮', component: 'Buttons' },
                { path: '/app/ui/icons', label: '图标', component: 'Icons' },
                { path: '/app/ui/spins', label: '加载中', component: 'Spins' },
                { path: '/app/ui/modals', label: '对话框', component: 'Modals' },
                { path: '/app/ui/notifications', label: '通知提醒框', component: 'Notifications' },
                { path: '/app/ui/tabs', label: '标签页', component: 'Tabs' },
                { path: '/app/ui/banners', label: '轮播图', component: 'Banners' },
                { path: '/app/ui/wysiwyg', label: '富文本', component: 'WysiwygBundle' },
                { path: '/app/ui/drags', label: '拖拽', component: 'Drags' },
                { path: '/app/ui/gallery', label: '画廊', component: 'Gallery' },
                { path: '/app/ui/map', label: '地图', component: 'MapUi' },
            ],
        },
 */

const routes = [
    {
        path: "/login",
        label: "登录页面",
        icon: loadable(() => import("@ant-design/icons/UserOutlined")),
        hidden: true,
        auth: false,
        authority: [],
        component: loadable(() => import("@/layouts/LoginLayout"))
      },
      {
        path: "/admin",
        label: "用户管理",
        icon: loadable(() => import("@ant-design/icons/UserOutlined")),
        auth: true,
        authority: ["ROLE_TEST", "ROLE_ADMIN", "admin"],
        component: loadable(() => import("@/layouts/AdminLayout")),
        routes: [
          {
            path: "/admin/center",
            label: "用户中心",
            icon: loadable(() => import("@ant-design/icons/UserOutlined")),
            auth: true,
            authority: ["admin"],
            component: loadable(() => import("@/pages/UserCenter")),
          },
          {
            path: "/admin/email",
            label: "邮箱",
            icon: loadable(() => import("@ant-design/icons/UserOutlined")),
            auth: false,
            authority: ["admin"],
            component: loadable(() => import("@/pages/UserEmail")),
          }
        ]
      }
];

export default routes
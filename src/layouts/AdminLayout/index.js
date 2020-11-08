import React from 'react'

import './index.less'
// import { RouteWithSubRoutes } from '../../router'

// import { createRoutes as Routes } from '@/router';
import { Layout } from 'antd';
// import { SmileOutlined } from '@ant-design/icons';

const { Content, Footer } = Layout;

export default function AdminLayout({ children }) {
    return (
        // <div>
        //     <Switch>
        //         {routes.map((route, i) => (
        //         <RouteWithSubRoutes key={i} {...route} />
        //         ))}
        //     </Switch>
        // </div>
        
        <Layout>
            {/* {!responsive.isMobile && checkLogin(auth.permissions) && (
                <SiderCustom collapsed={collapsed} />
            )} */}
            {/* <ThemePicker /> */}
            <Layout>
                {/* <HeaderCustom toggle={toggle} collapsed={collapsed} user={auth || {}} /> */}
                <Content className="app_layout_content">
                    <h2>admin layout</h2>
                    {/* <Routes auth="true" /> */}
                    {children}
                </Content>
                <Footer className="app_layout_foot">
                    {/* <Copyright /> */}
                </Footer>
            </Layout>
        </Layout>
    )
}
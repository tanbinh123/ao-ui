import React from 'react'

import './index.less'
// import { RouteWithSubRoutes } from '../../router'

// import { createRoutes as Routes } from '@/router';
import { Layout } from 'antd';
// import {Authority} from '@/router/permissions';
import { Authority } from '@/router/permission';
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
                    <Authority authority={["ROLE_TEST"]}>
                        <h3>this is Authority.</h3>
                    </Authority>
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
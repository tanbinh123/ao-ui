import React, {useState} from 'react'
import { Link } from 'react-router-dom';

import './index.less'
// import { RouteWithSubRoutes } from '../../router'

// import { createRoutes as Routes } from '@/router';
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MailOutlined
  } from '@ant-design/icons';
// import {Authority} from '@/router/permissions';
import { Authority } from '@/router/permission';
// import { SmileOutlined } from '@ant-design/icons';

import routes from '@/router/config'
import {allMenus} from '@/router/index';


const { Header, Sider, Content, Footer } = Layout;
const menus = allMenus();
console.log("menus : ", menus);

const renderMenuItem = (
    item // item.route 菜单单独跳转的路由
) => (
    <Menu.Item key={item.path} icon={<item.icon />} >
        <Link to={(item.path) + (item.query || '')}>
            <span className="nav-text">{item.label}</span>
        </Link>
    </Menu.Item>
);

const renderSubMenu = (item) => {
    return (
        <Menu.SubMenu
            key={item.path}
            icon={<item.icon />}
            title={
                <span>
                    {/* {item.icon && <Icon type={item.icon} />} */}
                    <span className="nav-text">{item.label}</span>
                </span>
            }
        >
            {item.routes && item.routes.map((sub) => (sub.routes ? renderSubMenu(sub) : renderMenuItem(sub)))}
        </Menu.SubMenu>
    );
};

export default function AdminLayout({ children }) {

    const [collapsed, setCollapsed] = useState(false);

    const toggle = () => {
        setCollapsed(!collapsed);
      };


    return (

        <Layout style={{"height": "100%"}}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />

          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              {
                menus.map(item => 
                    !item.hidden && ((item.routes && item.routes.length) > 0 ? renderSubMenu(item) :  renderMenuItem(item))
                )
              }
            
          
            
            {/* <Menu.Item key="1" icon={<UserOutlined />}>
                <Link to={"/user/email"}>
                                        Email
                                    </Link>
            </Menu.Item> */}
            {/* <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item> */}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
              <i className="fa fa-address-book-o" aria-hidden="true"></i>
            {children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>

        // <div>
        //     <Switch>
        //         {routes.map((route, i) => (
        //         <RouteWithSubRoutes key={i} {...route} />
        //         ))}
        //     </Switch>
        // </div>
        
        // <Layout>
        //     {/* {!responsive.isMobile && checkLogin(auth.permissions) && (
        //         <SiderCustom collapsed={collapsed} />
        //     )} */}
        //     {/* <ThemePicker /> */}
        //     <Layout>
        //         {/* <HeaderCustom toggle={toggle} collapsed={collapsed} user={auth || {}} /> */}
        //         <Content className="app_layout_content">
        //             <h2>admin layout</h2>
        //             <Authority authority={["ROLE_TEST"]}>
        //                 <h3>this is Authority.</h3>
        //             </Authority>
        //             {/* <Routes auth="true" /> */}
        //             {children}
        //         </Content>
        //         <Footer className="app_layout_foot">
        //             {/* <Copyright /> */}
        //         </Footer>
        //     </Layout>
        // </Layout>
    )
}
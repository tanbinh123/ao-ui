import React, {useState} from 'react'
import { Link } from 'react-router-dom';

import './index.less'
import { Layout, Menu,Dropdown, Avatar } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MailOutlined,
    DownOutlined
  } from '@ant-design/icons';
// import {Authority} from '@/router/permissions';
import { Authority } from '@/router/permission';
import { connect, useSelector, useDispatch } from 'react-redux';
// import { SmileOutlined } from '@ant-design/icons';
import * as authAction from '@/action/AuthAction';

import hw from '@/assets/imgs/hw.jpg';

// import routes from '@/router/config'
const { Header, Sider, Content, Footer } = Layout;

const renderMenuItem = (
    item // item.route 菜单单独跳转的路由
) => (
    <Menu.Item key={item.path} icon={item.icon ? <item.icon /> : <UploadOutlined />} >
        <Link to={(item.path) + (item.query || '')}>
            <span className="nav-text">{item.label || item.meta.title || item.name}</span>
        </Link>
    </Menu.Item>
);

const renderSubMenu = (item) => {
    return (
        <Menu.SubMenu
            key={item.path}
            icon={item.icon ? <item.icon /> : <UserOutlined /> }
            title={
                <span>
                    {/* {item.icon && <Icon type={item.icon} />} */}
                    <span className="nav-text">{item.label || (item.meta && item.meta.title) || item.name}</span>
                </span>
            }
        >
            {item.routes && item.routes.map((sub) => (sub.routes ? renderSubMenu(sub) : renderMenuItem(sub)))}

            {
              item.children && item.children.map((sub) => (sub.children ? renderSubMenu(sub) : renderMenuItem(sub)))
            }
        </Menu.SubMenu>
    );
};

function AdminLayout(props) {

    const [collapsed, setCollapsed] = useState(false);

    const { menus } = useSelector(state => ({
      menus: state.postsLogin.menus ? state.postsLogin.menus : []
  }));

  console.log('AdminLayout menus: ', menus);

  const dispatch = useDispatch();

    const toggle = () => {
        setCollapsed(!collapsed);
      };


    return (

        <Layout style={{"height": "100%"}}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
            <img src={hw} alt="" style={{width: "100%", height: "62px"}} />
          </div>

          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              {
                menus.map(item => 
                    !item.hidden && (((item.routes && item.routes.length > 0) || item.children && item.children.length > 0) ? renderSubMenu(item) :  renderMenuItem(item))
                )
              }
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}

            <div style={{float: "right", marginRight: "36px"}}>
            <Dropdown overlay={
              <Menu>
              <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                  用户中心
                </a>
              </Menu.Item>
              <Menu.Item>
                <a rel="noopener noreferrer" href="#" onClick={(event)=> {
                  event.preventDefault();
                  dispatch(authAction.Logout())
                }}>
                  退出
                </a>
              </Menu.Item>
            </Menu>
            }>
              {/* <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                Hover me <DownOutlined />
              </a> */}
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
            </Dropdown>
            </div>
            
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
}

// const mapStateToProps = state => {
//   return {
//     // user: state.postsLogin.user,
//     // isFetching: state.postsLogin.isFetching ? true : false,
//     // errorMessage: state.postsLogin.errorMessage,
//     menus: state.postsLogin.menus ? state.postsLogin.menus : []
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     // todoLogin: user => {
//     //   return dispatch(actions.toLogin(user))
//     // }
//   }
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AdminLayout)
export default AdminLayout;
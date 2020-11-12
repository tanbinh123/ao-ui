import React, {useState} from 'react';

import { connect } from 'react-redux';
import * as actions from '@/action/AuthAction';

import { Form, Input, Button, Checkbox, Layout, Card, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.less';

const { Header, Footer, Content } = Layout;




function LoginLayout(props) {


    const [captchaSrc, setCaptchaSrc] = useState("https://www.oschina.net/action/user/captcha")

    const onFinish = values => {
        console.log('Received values of form: ', values);
        props.todoLogin(values);
    };

    return (

        <Layout className="layout-style">
            <Header className='header-layout-background'>ao-admin</Header>
            <Content>

                <Card tbordered={false} style={{ width: 362, margin: "auto", marginTop: 50 }}>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: '请输入登录名!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="登录名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '请输入密码!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="登录密码"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Row gutter={8}>
                                <Col span={12}>
                                    <Form.Item
                                        name="captcha"
                                        noStyle
                                        rules={[{ required: true, message: '请输入验证码!' }]}
                                    >
                                        <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入验证码" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <img onClick={()=>{setCaptchaSrc(captchaSrc + "?t=" + Math.random())}} src={captchaSrc} alt="" />
                                </Col>
                            </Row>
                        </Form.Item>

                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>记住我</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="#">
                                忘记密码？
            </a>
                        </Form.Item>


                        

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
            </Button>
            或 <a href="#">现在注册!</a>
                        </Form.Item>
                    </Form>
                </Card>


            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    );

}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        todoLogin: user => {
            dispatch(actions.login(user))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginLayout)
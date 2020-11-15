import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '@/action/AuthAction';
import Cookies from 'js-cookie'

import { Form, Input, Button, Checkbox, Layout, Card, Row, Col, notification, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import Config from '@/settings'
import { getCodeImg } from '@/service/login';
import { encrypt } from '@/utils/rsaEncrypt'

import { useHistory } from "react-router-dom";

import './index.less';

const { Header, Footer, Content } = Layout;

function LoginLayoutComp(props) {

  // https://www.oschina.net/action/user/captcha
  const [captchaSrc, setCaptchaSrc] = useState("");
  const [uuid, setUuid] = useState("");
  const [cookiePass, setCookiePass] = useState("");
  // const [loginForm, setLoginForm] = useState({
  //     username: "",
  //     password: "",
  //     rememberMe: false,
  //     code: ""
  // })

  const [form] = Form.useForm();

  let history = useHistory();


  useEffect(() => {
    console.log('isFetching: ', props.isFetching);
    console.log('props.store: ', props.store);
    getCode();
    getCookie();
    point();
    // errorMessage

  }, []);

  const onFinish = values => {
    console.log('Received values of form: ', values);

    const user = { ...values, uuid: uuid };
    if (user.password !== cookiePass) {
      user.password = encrypt(values.password);
    }

    if (values.rememberMe) {
      Cookies.set('username', user.username, { expires: Config.passCookieExpires })
      Cookies.set('password', user.password, { expires: Config.passCookieExpires })
      Cookies.set('rememberMe', user.rememberMe, { expires: Config.passCookieExpires })
    } else {
      Cookies.remove('username')
      Cookies.remove('password')
      Cookies.remove('rememberMe')
    }

    props.todoLogin(user).then(res => {
      console.log('onFinish res: ', res);
      if(res) {
        history.push("/user");
      }
    }, error => {
      console.log("onFinish error: ", error);
    }
    );
  };

  const getCode = () => {
    getCodeImg().then(res => {
      // console.log(res);
      setUuid(res.uuid);
      setCaptchaSrc(res.img);
    })
  }

  const getCookie = () => {
    const username = Cookies.get('username')
    let password = Cookies.get('password')
    const rememberMe = Cookies.get('rememberMe')
    // 保存cookie里面的加密后的密码
    setCookiePass(password === undefined ? '' : password);
    password = password === undefined ? form.getFieldValue("password") : password
    // setLoginForm({
    //   username: username === undefined ? loginForm.username : username,
    //   password: password,
    //   rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
    //   code: ''
    // });
    form.setFieldsValue({
      username: username === undefined ? form.getFieldValue("username") : username,
      password: password,
      rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
      code: ''
    });
  }

  const point = () => {
    const point = Cookies.get('point') !== undefined
    if (point) {
      notification.open({
        message: '提示',
        description: '当前登录状态已过期，请重新登录',
        onClick: () => {
          // console.log('Notification Clicked!');
        },
      });

      Cookies.remove('point')
    }
  }

  return (

    <Spin size="large" tip="Loading..." spinning={props.isFetching}>
    <Layout className="layout-style">
      
      <Header className='header-layout-background'>ao-admin</Header>
      <Content>
        <Card tbordered={false} style={{ width: 362, margin: "auto", marginTop: 50 }}>
          <Form
            name="normal_login"
            className="login-form"
            form={form}
            // initialValues={{ ...loginForm }}
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
                    name="code"
                    noStyle
                    rules={[{ required: true, message: '请输入验证码!' }]}
                  >
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入验证码" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <img onClick={() => { getCode() }} src={captchaSrc} alt="" />
                </Col>
              </Row>
            </Form.Item>

            <Form.Item>
              <Form.Item name="rememberMe" valuePropName="checked" noStyle>
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
    </Spin>
  );

}

const mapStateToProps = state => {
  console.log('state: ', state);
  return {
    user: state.postsLogin.user,
    isFetching: state.postsLogin.isFetching ? true : false,
    errorMessage: state.postsLogin.errorMessage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    todoLogin: user => {
      return dispatch(actions.toLogin(user))
    }
  }
}

const LoginLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginLayoutComp);

export default LoginLayout;
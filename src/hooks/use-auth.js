import React, { useState, useEffect, useContext, createContext } from 'react'
import store from '@/store/Store';
import * as AuthAction from '@/action/AuthAction';
import { useSelector } from 'react-redux';

// import * as firebase from 'firebase/app'

// firebase.initializeApp({
//     apiKey: "",
//     authDomain: "",
//     projectId: "",
//     appID: ""
// });

const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    // const userInfo = store.getState().postsLogin;
    // if(!userInfo || userInfo.roles.length <= 0) {
    //     const user = await store.dispatch(AuthAction.getUserInfo());
    //     return user;
    // }
    
    const {userInfo} = useSelector(state => ({
        userInfo: state.postsLogin
    }), []);
    let userData = userInfo;
    if(userInfo.roles.length <= 0) {
        const user = sessionStorage.getItem('userInfo');
        userData = JSON.parse(user);
    }

    console.log('useAuth: userinfo : ', userInfo);

    useEffect(() => {
        if(userInfo.roles.length <= 0) {
            store.dispatch(AuthAction.getUserInfo());
        }
        return () => {};
    }, [])

    return userData;
}

function useProvideAuth() {
    const [user, setUser] = useState(null);

    const signin = (email, password) => {
        // 请求登录接口，登录用户，存储用户信息到state
        setUser({email: email, password: password});
        return {email: email, password: password};
    };

    const signup = (email, password) => {
        // 注册接口
        setUser({email: email, password: password});
        return {email: email, password: password};
    };

    const signout = () => {
        // 退出登录，清空state
        setUser(false);
    };

    const sendPasswordResetEmail = email => {
        return true;
      };
    
      const confirmPasswordReset = (code, password) => {
        return true;
      };

      useEffect(() => {
        // 订阅用户登录或退出变化（后端接口）
            const isLogin = true;  
            if(isLogin) {
                // setUser(user); // 设置状态
            } else {
                // setUser(false); // 清除状态
            }

          return () => {
              
          }
      }, [])

      // Return the user object and auth methods
    return {
        user,
        signin,
        signup,
        signout,
        sendPasswordResetEmail,
        confirmPasswordReset
    };


}

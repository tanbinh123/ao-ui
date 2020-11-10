import Config from '@/settings'

const TokenKey = Config.TokenKey

export function getToken() {
  if (!window.localStorage) {
    alert("浏览器不支持localstorage");
    return null;
  } else {
    return window.localStorage.getItem(TokenKey);
  }
}

export function setToken(token, rememberMe) {
  if (rememberMe) {
    return window.localStorage.setItem(TokenKey, token);
  } else {
    return window.localStorage.setItem(TokenKey, token);
  }
}

export function removeToken() {
  return window.localStorage.removeItem(TokenKey);
}
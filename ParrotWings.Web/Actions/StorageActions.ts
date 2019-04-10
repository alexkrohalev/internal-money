import * as Cookies from 'es-cookie';

export var token = null;

export function setToken(value: string) {
  if (value == null) {
    Cookies.remove('token');
  }
  else {
    Cookies.set('token', value, { expires: 7, path: '/' });
  }

  token = value;
}

export function getToken() {
  return token = Cookies.get('token');
}

export function setUserData(data: any) {
  window.localStorage.setItem('user', JSON.stringify(data));
}

export function getUserData() {
  return JSON.parse(window.localStorage.getItem('user'));
}

// import axios from 'axios'
import axios from 'axios'
import router from '../router/index'
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://127.0.0.1:9998/api'

let token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['token'] = token
}

axios.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(res => {
  let {
    data,
    code,
    msg
  } = res.data

  //当token过期的时候 删掉localStorage中的user 和 token
  if (code === -1 || code === -2 || code === -3) {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    ELEMENT.Message({
      message: msg,
      type: 'error'
    })
    router.push('/home')
  }
  return res;
}, err => {
  return Promise.reject(err);
});
export default axios
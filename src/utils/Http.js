// import axios from 'axios'
import axios from 'axios'
import moment from 'moment'

axios.defaults.baseURL = process.env.NODE_ENV==='production' ? '' : 'http://127.0.0.1:9999/api'

let token = localStorage.getItem('token');
if(token){
  axios.defaults.headers.common['token'] = JSON.parse(token)
}

axios.interceptors.request.use(config=> {
  return config;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(res => {
  let { data, code } = res.data
  
  if(Array.isArray(data)){
    data.map(item=>{
      item.createTime = item.createTime&&moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
    })
  }
  if(data&&data.pages){
    data.pages.map(item=>{
      item.createTime = item.createTime&&moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
      item.updateTime = item.updateTime&&moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')

    })
  }
  //当token过期的时候 删掉localStorage中的user 和 token
  if(code === -2){
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }
  return res;
}, err => {
  return Promise.reject(err);
});
export default axios
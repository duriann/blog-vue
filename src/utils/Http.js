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
  let {data, code, msg} = res.data
  
  if(Array.isArray(data)){
    data.map(item=>{
      item.createTime = item.createTime&&moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
    })
  }
  return res;
}, err => {
  return Promise.reject(err);
});
export default axios
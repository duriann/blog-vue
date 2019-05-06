/**
 * 树状结构扁平化
 * @param {*} tree 
 */
let treeToList = (tree) => {
  var queen = [];
  var out = [];
  queen = queen.concat(tree);
  while (queen.length) {
    var first = queen.shift();
    if (first.children) {
      queen = queen.concat(first.children);
      delete first["children"];
    }
    out.push(first);
  }
  return out;
}

/**
 * 根据路由中传递的英文名转换成中文名
 * @param {*} ename 
 */
let caseCategoryEnToCh = (ename) => {
  switch(ename){
    case 'backend':
      return '后台开发'
    case 'frontend':
      return '前端开发'
    case 'thinkabout':
      return '个人随想'
    default: return  ename  
  }
}

/**
 * 根据历史时间戳获取该时间到现在的 中文描述
 * ex: 
 * param: 1551716339000 res: 2个月前(03-05)
 * @param {*} time 
 */
let getCreateTime = (time) => {
  let now = Date.now()
  let ctime = new Date(time)
  let month = ctime.getMonth()+1
  if(month<10){
    month = '0' + month
  }
  let day = ctime.getDate()
  if(day<10){
    day = '0' + day
  }
  let days = (now-time)/1000/3600/24
  if(days>=365){
    return `${Math.floor(days/365)}年前(${month}-${day})`
  }
  if(days>=30){
    return `${Math.floor(days/30)}个月前(${month}-${day})`
  }
  if(days>=7){
    return `${Math.floor(days/7)}周前(${month}-${day})`
  }else{
    return `${Math.ceil(days)}天前(${month}-${day})`
  }
}

export {
  treeToList,
  caseCategoryEnToCh,
  getCreateTime
}
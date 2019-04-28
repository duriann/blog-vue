let data = [{"id":1,"name":"后端开发","level":0,"parentId":null,"createIme":1553769881000,"updateTime":1553769885000,"children":[{"id":2,"name":"java","level":1,"parentId":1,"createIme":1553769900000,"updateTime":1553769903000,"children":[]}]},{"id":3,"name":"前端开发","level":0,"parentId":null,"createIme":1553769936000,"updateTime":1553769940000,"children":[{"id":4,"name":"vue","level":1,"parentId":3,"createIme":1553769959000,"updateTime":1553769963000,"children":[]},{"id":5,"name":"react","level":1,"parentId":3,"createIme":1553769976000,"updateTime":1553769980000,"children":[]}]},{"id":6,"name":"个人随想","level":0,"parentId":null,"createIme":1553770021000,"updateTime":1553770024000,"children":[]}]
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

let caseCategoryEnToCh = (ename) => {
  switch(ename){
    case 'backend':
      return '后台开发'
    case 'frontend':
      return '前端开发'
    case 'suixiang':
      return '随想'
    default: return  ename  
  }
}
export {
  treeToList,
  caseCategoryEnToCh
}


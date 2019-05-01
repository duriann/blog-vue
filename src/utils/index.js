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
    case 'thinkabout':
      return '个人随想'
    default: return  ename  
  }
}
export {
  treeToList,
  caseCategoryEnToCh
}


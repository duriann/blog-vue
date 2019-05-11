# blog-vue
使用vue写的个人博客

## 打包上线说明
### 因为上线的时候使用了cdn的方式，所以需要更改以下一下几个文件中的内容
- 删除或者注释 main.js中的
 ```javascript
  import 'element-ui/lib/theme-chalk/index.css';
 ```
- 删除或者注释 .brbelrc中plugins的element-ui按需导入
```javascript
        "component",
        {
          "libraryName": "element-ui",
          "styleLibraryName": "theme-chalk"
        }
      ],
``` 
- 删除或者注释/src/pages/admin/article/ArticleAdd.vue中引入的quill样式
```javascript
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
```
### 20190430
- 抽离Common组件中的右侧代码带Index组件中 提升性能与用户体验
- 添加postcss给css加浏览器前缀

### 20190502
- 完成分页组件 但是感觉还有点问题 待解决

### 20190503
- 添加highlight代码高亮

### 20190505
- 改变路由模式为history  
- 修复pre标签不换行导致的主页出现横向滚动条


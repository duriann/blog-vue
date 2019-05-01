<template>
  <div class="pagination">
    <ul>
      <li class="prev" v-if="currentPage!==1" @click="handerChange(--currentPage)">
        <span>上一页</span>
      </li>

      <li v-for="num in totalPage" :key="num" :class="num === currentPage? 'current': ''">
        <span @click="handerChange(num)">{{num}}</span>
      </li>

      <li class="next" v-if="currentPage!==totalPage" @click="handerChange(++currentPage)">
        <span>下一页</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    totalCount: Number,
    pageSize: Number
  },
  data() {
    return {
      currentPage: 1
    }
  },
  methods: {
    handerChange(currentPage) {
      console.log('currentPage', currentPage)
      this.currentPage = currentPage
      //触发父组件事件 将currentPage传回去
      this.$emit('current-change', this.currentPage)
    }
  },
  computed: {
    totalPage() {
      let page = []
      let length = 0
      let totalPage = Math.ceil(this.totalCount / this.pageSize)

      return totalPage
    }
  }
}
</script>
<style lang="less" scoped>
.pagination {
  background-color: #fff;
  margin-top: 10px;
  padding: 10px;
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  li {
    margin: 0 3px;
    background-color: #eee;
    &.current {
      background-color: #00a67c;
      color: #fff;
    }
    span {
      display: block;
      cursor: pointer;
      padding: 4px 12px 3px;
      &:hover {
        background-color: #6fc299;
        color: #fff;
      }
    }
  }
}
</style>
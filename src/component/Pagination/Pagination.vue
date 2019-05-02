<template>
  <div class="pagination">
    <ul>
      <li class="prev" v-if="currentPage!==1" @click="handerChange(--currentPage)">
        <span>上一页</span>
      </li>
      <li :class="1 === currentPage? 'current': ''">
        <span @click="handerChange(1)">1</span>
      </li>
      <li v-if="leftellipsis">
        <span>...</span>
      </li>
      <li v-for="num in pages" :key="num" :class="num === currentPage? 'current': ''">
        <span @click="handerChange(num)">{{num}}</span>
      </li>
      <li v-if="rightellipsis">
        <span>...</span>
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
      currentPage: 1,
      totalShow: 4
    }
  },
  methods: {
    handerChange(currentPage) {
      this.currentPage = currentPage
      //触发父组件事件 将currentPage传回去
      this.$emit('current-change', this.currentPage)
    }
  },
  computed: {
    rightellipsis() {
      let totalPage = Math.ceil(this.totalCount / this.pageSize)

      let { currentPage, totalShow } = this
      if (totalPage > totalShow && currentPage + totalShow < totalPage) {
        return true
      }
      return false
    },
    leftellipsis() {
      if (this.currentPage > 2 && this.totalPage > this.totalShow + 1) {
        console.log(123)
        return true
      }

      return false
    },
    totalPage() {
      return Math.ceil(this.totalCount / this.pageSize)
    },
    pages() {
      let page = []
      let { totalShow, currentPage } = this
      let length = 0
      let totalPage = Math.ceil(this.totalCount / this.pageSize)

      if (totalPage <= totalShow) {
        length = totalPage
      } else {
        length = totalShow + currentPage
      }
      if (length > totalPage) {
        length = totalPage
      }
      if (length <= totalPage) {
        if (currentPage + totalShow >= totalPage) {
          currentPage = totalPage - totalShow < 1 ? 1 : totalPage - totalShow
        }
        for (let i = currentPage === 1 ? 2 : currentPage; i <= length; i++) {
          page.push(i)
        }
      }

      console.log(page)
      return page
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